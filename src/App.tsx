import { useEffect, useRef, useState } from 'react'
import { Download, ExternalLink, Leaf, Printer, QrCode, TriangleAlert } from 'lucide-react'
import { getPlantById, labels, type Lang, type Plant, plants } from './data'
import { CareGuide, MiniNeeds, NeedsPanel, TraitList } from './needs'
import { getProfile } from './profiles'
import { drawPlantQr, loadImage } from './qr'
import './App.css'

const otherLang = (lang: Lang): Lang => (lang === 'ar' ? 'en' : 'ar')
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const appPath = (path: string) => {
  if (!basePath) return path
  return path === '/' ? `${basePath}/` : `${basePath}/#${path}`
}
const assetPath = (path: string) => (basePath && path.startsWith('/') ? `${basePath}${path}` : path)
const plantPath = (plant: Plant) => appPath(`/plant/${plant.id}`)

/**
 * Short alias used by the QR codes only. Keeping the encoded url this brief
 * holds the symbol at version 6, which leaves the centre free for the plant
 * photo — see the note in qr.ts. Humans still get the readable /plant/<id> url.
 */
const plantUrl = (plant: Plant) => `${window.location.origin}${appPath(`/p/${plant.index}`)}`

const normalizePath = () => {
  if (basePath && window.location.hash.startsWith('#/')) {
    return window.location.hash.slice(1).replace(/\/+$/, '') || '/'
  }

  let path = window.location.pathname
  if (basePath && path.startsWith(basePath)) {
    path = path.slice(basePath.length) || '/'
  }

  path = path.replace(/\/+$/, '')
  return path || '/'
}

const primaryName = (name: string) => name.split(' / ')[0]

function App() {
  const [lang, setLang] = useState<Lang>('ar')
  const [path, setPath] = useState(normalizePath)
  const t = labels[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const plantId = path.startsWith('/plant/') ? decodeURIComponent(path.replace('/plant/', '')) : ''
  const shortIndex = path.startsWith('/p/') ? Number(path.slice(3)) : NaN
  const selectedPlant = plantId
    ? getPlantById(plantId)
    : plants.find((plant) => plant.index === shortIndex)

  useEffect(() => {
    const syncPath = () => setPath(normalizePath())

    window.addEventListener('hashchange', syncPath)
    window.addEventListener('popstate', syncPath)
    return () => {
      window.removeEventListener('hashchange', syncPath)
      window.removeEventListener('popstate', syncPath)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  return (
    <div className="app" dir={dir}>
      <SiteHeader lang={lang} setLang={setLang} showQrLink={!selectedPlant} />

      {selectedPlant ? (
        <PlantPage plant={selectedPlant} lang={lang} />
      ) : path === '/' ? (
        <HomePage lang={lang} />
      ) : path === '/qr' ? (
        <QrPage lang={lang} />
      ) : (
        <main className="not-found">
          <Leaf size={34} aria-hidden="true" />
          <h1>{t.notFound}</h1>
          <a href={appPath('/')} className="button-link">
            {t.back}
          </a>
        </main>
      )}

      <SiteFooter lang={lang} />
    </div>
  )
}

function SiteHeader({
  lang,
  setLang,
  showQrLink,
}: {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Hidden on plant pages: someone arriving by QR is there for that one plant. */
  showQrLink: boolean
}) {
  const t = labels[lang]

  return (
    <header className="site-header">
      <a href={appPath('/')} className="brand" aria-label={t.home}>
        <img className="brand-seal" src={assetPath('/kfu-logo.svg')} alt={t.university} />
        <span className="brand-text">
          <strong>{t.university}</strong>
          <small>{t.brand}</small>
        </span>
      </a>
      <div className="header-actions">
        {showQrLink ? (
          <a href={appPath('/qr')} className="qr-nav-link">
            <QrCode size={16} aria-hidden="true" />
            {t.qr}
          </a>
        ) : null}
        <button type="button" className="lang-button" onClick={() => setLang(otherLang(lang))}>
          {t.language}
        </button>
      </div>
    </header>
  )
}

function HomePage({ lang }: { lang: Lang }) {
  const t = labels[lang]

  return (
    <main className="home">
      <section className="home-intro">
        <h1>{t.brand}</h1>
        <p>{t.heroTitle}</p>
      </section>

      <section className="plant-grid" aria-label={t.browse}>
        {plants.map((plant) => (
          <a className="plant-card" href={plantPath(plant)} key={plant.id}>
            <span className="plant-card-media">
              <img src={assetPath(plant.image)} alt={plant.commonName[lang]} loading="lazy" />
            </span>
            <span className="plant-card-copy">
              <strong>{primaryName(plant.commonName[lang])}</strong>
              <em>{plant.scientificName}</em>
              <MiniNeeds needs={getProfile(plant.id).needs} lang={lang} />
            </span>
          </a>
        ))}
      </section>
    </main>
  )
}

function QrPage({ lang }: { lang: Lang }) {
  const t = labels[lang]

  return (
    <main className="qr-page">
      <section className="qr-intro">
        <h1>{t.qrTitle}</h1>
        <p>{t.qrBody}</p>
        <button type="button" className="print-button" onClick={() => window.print()}>
          <Printer size={16} aria-hidden="true" />
          {t.print}
        </button>
      </section>

      <section className="qr-grid" aria-label={t.qrTitle}>
        {plants.map((plant) => (
          <PlantQrCard plant={plant} lang={lang} key={plant.id} />
        ))}
      </section>
    </main>
  )
}

function PlantQrCard({ plant, lang }: { plant: Plant; lang: Lang }) {
  const t = labels[lang]
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false

    loadImage(assetPath(plant.image)).then((photo) => {
      if (cancelled || !canvasRef.current) return
      drawPlantQr(canvasRef.current, {
        url: plantUrl(plant),
        photo,
        accent: plant.accent,
      })
    })

    return () => {
      cancelled = true
    }
  }, [plant])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `qr-${plant.id}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <article className="qr-card">
      <canvas
        ref={canvasRef}
        className="qr-canvas"
        role="img"
        aria-label={`${plant.commonName[lang]} QR`}
      />
      <strong>{primaryName(plant.commonName[lang])}</strong>
      <em>{plant.scientificName}</em>
      <span>{t.scanToOpen}</span>
      <button type="button" className="qr-download" onClick={download}>
        <Download size={15} aria-hidden="true" />
        {t.download}
      </button>
    </article>
  )
}

function PlantPage({ plant, lang }: { plant: Plant; lang: Lang }) {
  const t = labels[lang]
  const profile = getProfile(plant.id)
  const family = plant.taxonomy[0]?.value[lang] ?? ''

  return (
    <main className="plant-page">
      <section className="plant-hero">
        <figure className="plant-photo">
          <img src={assetPath(plant.image)} alt={plant.commonName[lang]} />
        </figure>
        <div className="plant-identity">
          <h1>{primaryName(plant.commonName[lang])}</h1>
          <p className="scientific">{plant.scientificName}</p>
          <p className="family">
            <span>{t.family}</span>
            {family}
          </p>
          <p className="tagline">{profile.tagline[lang]}</p>
          <TraitList needs={profile.needs} use={profile.use[lang]} lang={lang} />
          <p className="caution">
            <TriangleAlert size={18} aria-hidden="true" />
            {profile.caution[lang]}
          </p>
        </div>
      </section>

      <NeedsPanel needs={profile.needs} lang={lang} />

      <CareGuide sections={profile.sections} lang={lang} key={plant.id} />

      <section className="references">
        <h2>{t.references}</h2>
        <ul>
          {plant.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                <span>
                  <strong>{source.label}</strong>
                  <small>{source.note[lang]}</small>
                </span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

function SiteFooter({ lang }: { lang: Lang }) {
  const t = labels[lang]
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <img className="footer-seal" src={assetPath('/kfu-logo.svg')} alt={t.university} />
      <div className="footer-credits">
        <p className="credit">
          <span>{t.preparedBy}</span>
          <strong>{t.studentName}</strong>
        </p>
        <p className="credit">
          <span>{t.supervisedBy}</span>
          <strong>{t.supervisorName}</strong>
        </p>
      </div>
      <p className="footer-rights">
        © {year} {t.university} — {t.rights}
      </p>
    </footer>
  )
}

export default App
