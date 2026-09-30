import { useEffect, useState } from 'react'
import Particles from './components/Particles.jsx'
import { SCHOOL, NAV, SECTIONS } from './data.js'

function Block({ s }) {
  const cls = s.align === 'r' ? 'r' : s.align === 'c' ? 'c' : ''
  const lines = s.title.split('\n')
  const title = lines.map((t, i) => <span key={i}>{t}{i < lines.length - 1 && <br />}</span>)
  return (
    <section id={s.id} className={cls}>
      <div className={s.hero || s.align === 'c' ? 'wide' : 'box'}>
        {s.eyebrow && <div className="eyebrow">{s.eyebrow}</div>}
        {s.hero ? <h1>{title}</h1> : <h2 className={s.id === 'final' ? 'big' : ''}>{title}</h2>}
        <p className={s.align === 'c' ? 'lg' : ''}>{s.text}</p>
        {s.button && <a className="btn" href={'#' + s.button.to}>{s.button.label}</a>}
      </div>
    </section>
  )
}

export default function App() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      let best = 0, bd = 1e9
      SECTIONS.forEach((s, k) => {
        const r = document.getElementById(s.id).getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - innerHeight / 2)
        if (d < bd) { bd = d; best = k }
      })
      setActive(best)
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  const cur = SECTIONS[active]
  const idx = (id) => SECTIONS.findIndex((s) => s.id === id)
  const onNav = [...NAV].reverse().find((n) => idx(n.to) <= active)

  return (
    <div>
      <Particles shape={cur.shape} cx={cur.cx} scale={cur.scale} />

      <nav>
        <a className="logo" href="#hero"><i /><span>{SCHOOL}</span></a>
        <div className="links">
          {NAV.map((n) => (
            <a key={n.to} href={'#' + n.to} className={onNav && onNav.to === n.to ? 'on' : ''}>{n.label}</a>
          ))}
          <a className="btn" href="#admission">Enquire now</a>
        </div>
      </nav>

      {SECTIONS.map((s) => <Block key={s.id} s={s} />)}

      <footer>
        <strong>{SCHOOL}</strong>
        <span>Learning • Growing • Building Futures</span>
        <span>© 2026 {SCHOOL}. All Rights Reserved.</span>
        <span>Designed by SK Samimuddin Mondal</span>
      </footer>
    </div>
  )
}
