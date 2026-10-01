import { useState, type ReactNode } from 'react'
import {
  Bug,
  Droplet,
  Droplets,
  GlassWater,
  ShieldCheck,
  Snowflake,
  Sprout,
  Sun,
  Thermometer,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import { labels, type Lang } from './data'
import type { PlantNeeds, ProfileSection, ScheduleIcon } from './profiles'

/** Temperatures are drawn on a 0-40 C ring, which covers every plant here. */
const TEMP_SCALE = 40

const sectionIcons: Record<ProfileSection['icon'], LucideIcon> = {
  use: Sprout,
  grow: Sprout,
  light: Sun,
  water: Droplets,
  pests: Bug,
  safety: ShieldCheck,
}

const scheduleIcons: Record<ScheduleIcon, LucideIcon> = {
  summer: Sun,
  winter: Snowflake,
  vase: GlassWater,
  pot: Sprout,
}

/** Keeps "18–26" and "40%" reading left to right inside Arabic text. */
const Num = ({ children }: { children: ReactNode }) => <bdi dir="ltr">{children}</bdi>

function Ring({ from = 0, to, icon: Icon }: { from?: number; to: number; icon: LucideIcon }) {
  return (
    <span className="ring">
      <svg className="ring-svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="ring-track" cx="50" cy="50" r="42" pathLength={100} />
        <circle
          className="ring-value"
          cx="50"
          cy="50"
          r="42"
          pathLength={100}
          strokeDasharray={`${Math.max(to - from, 0.01)} 100`}
          strokeDashoffset={-from}
        />
      </svg>
      <Icon className="ring-icon" size={28} strokeWidth={2.2} aria-hidden="true" />
    </span>
  )
}

function Gauge({
  tone,
  label,
  ring,
  value,
  caption,
  note,
}: {
  tone: 'light' | 'water' | 'temp' | 'humidity'
  label: string
  ring: ReactNode
  value: ReactNode
  caption: string
  note?: ReactNode
}) {
  return (
    <article className={`gauge gauge-${tone}`}>
      <h3>{label}</h3>
      {ring}
      <strong className="gauge-value">{value}</strong>
      <span className="gauge-caption">{caption}</span>
      {note ? <small className="gauge-note">{note}</small> : null}
    </article>
  )
}

export function NeedsPanel({ needs, lang }: { needs: PlantNeeds; lang: Lang }) {
  const t = labels[lang]
  const { light, water, temperature, humidity } = needs
  const humidityMid = (humidity.min + humidity.max) / 2
  const humidityLevel = humidityMid < 45 ? 'low' : humidityMid < 58 ? 'medium' : 'high'

  return (
    <section className="needs" aria-labelledby="needs-title">
      <h2 id="needs-title">{t.needs}</h2>

      <div className="gauge-grid">
        <Gauge
          tone="light"
          label={t.light}
          ring={<Ring to={light.ideal} icon={Sun} />}
          value={<Num>{light.ideal}%</Num>}
          caption={light.label[lang]}
          note={
            <>
              {t.tolerates} <Num>{light.min}–{light.max}%</Num>
            </>
          }
        />
        <Gauge
          tone="water"
          label={t.water}
          ring={<Ring to={water.level} icon={Droplet} />}
          value={<Num>{water.level}%</Num>}
          caption={water.label[lang]}
        />
        <Gauge
          tone="temp"
          label={t.temperature}
          ring={
            <Ring
              from={(temperature.min / TEMP_SCALE) * 100}
              to={(temperature.max / TEMP_SCALE) * 100}
              icon={Thermometer}
            />
          }
          value={
            <>
              <Num>
                {temperature.min}–{temperature.max}
              </Num>
              {t.degree}
            </>
          }
          caption={`${t.lowest} ${temperature.lowest}${t.degree}`}
        />
        <Gauge
          tone="humidity"
          label={t.humidity}
          ring={<Ring from={humidity.min} to={humidity.max} icon={Droplets} />}
          value={
            <Num>
              {humidity.min}–{humidity.max}%
            </Num>
          }
          caption={t.humidityLevels[humidityLevel]}
        />
      </div>

      <div className="schedule">
        <h3>{t.schedule}</h3>
        <ul>
          {needs.schedule.map((slot) => {
            const Icon = scheduleIcons[slot.icon]
            return (
              <li key={slot.icon} className={`slot slot-${slot.icon}`}>
                <Icon size={20} aria-hidden="true" />
                <span>
                  <small>{slot.label[lang]}</small>
                  <strong>{slot.value[lang]}</strong>
                </span>
              </li>
            )
          })}
        </ul>
        <p className="schedule-check">
          <strong>{t.howToCheck}</strong> {water.check[lang]}
        </p>
      </div>

      <p className="needs-note">{t.approxNote}</p>
    </section>
  )
}

export function TraitList({ needs, use, lang }: { needs: PlantNeeds; use: string; lang: Lang }) {
  const t = labels[lang]
  const traits = [
    { label: t.use, value: use },
    { label: t.ease, value: t.easeLevels[needs.ease - 1], dots: 4 - needs.ease },
    { label: t.growth, value: t.growthLevels[needs.growth] },
    { label: t.safety, value: t.toxicityLevels[needs.toxicity], warn: true },
  ]

  return (
    <dl className="traits">
      {traits.map((trait) => (
        <div className={trait.warn ? 'trait is-warn' : 'trait'} key={trait.label}>
          <dt>{trait.label}</dt>
          <dd>
            {trait.value}
            {trait.dots ? (
              <span className="ease-dots" aria-hidden="true">
                {[1, 2, 3].map((n) => (
                  <i key={n} className={n <= trait.dots ? 'on' : ''} />
                ))}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function CareGuide({ sections, lang }: { sections: ProfileSection[]; lang: Lang }) {
  const t = labels[lang]
  const [active, setActive] = useState(0)
  const section = sections[active]

  return (
    <section className="guide" aria-labelledby="guide-title">
      <h2 id="guide-title">{t.guide}</h2>
      <div className="tabs" role="tablist">
        {sections.map((item, index) => {
          const Icon = sectionIcons[item.icon]
          return (
            <button
              type="button"
              role="tab"
              id={`guide-tab-${index}`}
              aria-selected={index === active}
              aria-controls="guide-panel"
              key={item.title.en}
              onClick={() => setActive(index)}
            >
              <Icon size={16} aria-hidden="true" />
              {item.title[lang]}
            </button>
          )
        })}
      </div>
      <div className="guide-panel" role="tabpanel" id="guide-panel" aria-labelledby={`guide-tab-${active}`}>
        {section.items.map((item) => (
          <div className={item.tone === 'danger' ? 'guide-item is-danger' : 'guide-item'} key={item.label.en}>
            <strong>
              {item.tone === 'danger' ? <TriangleAlert size={15} aria-hidden="true" /> : null}
              {item.label[lang]}
            </strong>
            <p>{item.value[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/** The at-a-glance light and water readout on the home page cards. */
export function MiniNeeds({ needs, lang }: { needs: PlantNeeds; lang: Lang }) {
  const t = labels[lang]

  return (
    <span className="mini-needs">
      <span className="mini mini-light" title={t.light}>
        <Sun size={14} aria-hidden="true" />
        <span className="sr-only">{t.light}</span>
        <Num>{needs.light.ideal}%</Num>
      </span>
      <span className="mini mini-water" title={t.water}>
        <Droplet size={14} aria-hidden="true" />
        <span className="sr-only">{t.water}</span>
        <Num>{needs.water.level}%</Num>
      </span>
    </span>
  )
}
