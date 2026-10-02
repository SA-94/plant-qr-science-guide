import { useEffect, type CSSProperties } from 'react'
import { labels, type Lang } from './data'

/** How long the intro holds before it starts to leave; the exit itself matches `.intro.is-leaving`. */
const HOLD_MS = 2400
const EXIT_MS = 800

const PARTICLES = Array.from({ length: 16 }, (_, i) => i)

/**
 * Plays once over the plant page when it is opened from a printed QR code:
 * a gold ring draws, the plant photo opens inside it, then its names rise in.
 * Tapping anywhere skips straight to the page.
 */
export function QrIntro({
  lang,
  name,
  scientificName,
  image,
  seal,
  leaving,
  onLeave,
  onDone,
}: {
  lang: Lang
  name: string
  scientificName: string
  image: string
  seal: string
  leaving: boolean
  onLeave: () => void
  onDone: () => void
}) {
  const t = labels[lang]

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(leaving ? onDone : onLeave, leaving ? EXIT_MS : reduced ? 900 : HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [leaving, onLeave, onDone])

  return (
    <div className={leaving ? 'intro is-leaving' : 'intro'} onClick={onLeave} aria-hidden="true">
      <span className="intro-glow" />
      <span className="intro-particles">
        {PARTICLES.map((i) => (
          <i key={i} style={{ '--i': i } as CSSProperties} />
        ))}
      </span>

      <img className="intro-seal" src={seal} alt="" />
      <span className="intro-stage">
        <svg className="intro-orbit" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="98" />
        </svg>
        <svg className="intro-ring" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="98" pathLength={100} />
        </svg>
        <span className="intro-photo">
          <img src={image} alt="" />
        </span>
      </span>
      <strong className="intro-name">{name}</strong>
      <em className="intro-sci">{scientificName}</em>
      <span className="intro-line" />
      <small className="intro-brand">
        {t.brand} · {t.university}
      </small>
    </div>
  )
}
