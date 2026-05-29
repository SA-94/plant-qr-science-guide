import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  Bug,
  Droplets,
  ExternalLink,
  Home,
  Languages,
  Leaf,
  Search,
  ShieldAlert,
  Sparkles,
  Sprout,
  Sun,
} from 'lucide-react'
import { getPlantById, labels, type Fact, type Lang, type Plant, plants } from './data'
import './App.css'

const otherLang = (lang: Lang): Lang => (lang === 'ar' ? 'en' : 'ar')
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const appPath = (path: string) => (basePath ? `${basePath}${path === '/' ? '/' : path}` : path)
const assetPath = (path: string) => (basePath && path.startsWith('/') ? `${basePath}${path}` : path)
const plantRoute = (plant: Plant) => `/plant/${plant.id}`
const plantPath = (plant: Plant) => appPath(plantRoute(plant))

const normalizePath = () => {
  let path = window.location.pathname
  if (basePath && path.startsWith(basePath)) {
    path = path.slice(basePath.length) || '/'
  }

  path = path.replace(/\/+$/, '')
  return path || '/'
}

type ProfileIcon = 'use' | 'grow' | 'light' | 'water' | 'pests' | 'safety'

type ProfileItem = {
  label: Record<Lang, string>
  value: Record<Lang, string>
}

type ProfileSection = {
  title: Record<Lang, string>
  icon: ProfileIcon
  items: ProfileItem[]
}

type PracticalProfile = {
  tagline: Record<Lang, string>
  stats: ProfileItem[]
  sections: ProfileSection[]
}

const profileIcons = {
  use: Sparkles,
  grow: Sprout,
  light: Sun,
  water: Droplets,
  pests: Bug,
  safety: ShieldAlert,
}

const practicalProfiles: Record<string, PracticalProfile> = {
  'catharanthus-roseus': {
    tagline: {
      ar: 'نبتة زينة مزهرة تحتاج ضوء قوي وصرف ممتاز. لا تناسب الظل الداخلي.',
      en: 'A flowering ornamental that needs strong light and excellent drainage.',
    },
    stats: [
      { label: { ar: 'الاستخدام', en: 'Use' }, value: { ar: 'زينة مزهرة فقط', en: 'Flowering ornamental only' } },
      { label: { ar: 'المكان', en: 'Place' }, value: { ar: 'شرفة أو نافذة قوية', en: 'Balcony or strong window light' } },
      { label: { ar: 'الري', en: 'Water' }, value: { ar: 'بعد جفاف السطح', en: 'After the surface dries' } },
      { label: { ar: 'تنبيه', en: 'Caution' }, value: { ar: 'لا تؤكل', en: 'Not edible' } },
    ],
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'شمس صباح أو ضوء قوي جدًا.', en: 'Morning sun or very bright light.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'خليط خفيف مع بيرلايت وتصريف سريع.', en: 'Light mix with perlite and fast drainage.' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'بذور أو عقل طرية في جو دافئ.', en: 'Seeds or soft cuttings in warm conditions.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن جذور، ذبول، وتبقعات أوراق.', en: 'Root rot, wilt, and leaf spots.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'من، عناكب حمراء، وبق دقيقي.', en: 'Aphids, spider mites, and mealybugs.' } },
          { label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'اسوداد قاعدة الساق أو ذبول مفاجئ.', en: 'Black stem base or sudden wilt.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'أحواض، مداخل، وشرفات مضيئة.', en: 'Beds, entries, and bright balconies.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'غالبًا موسمية، وتطول في الجو الدافئ.', en: 'Often seasonal; lasts longer in warmth.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'زينة فقط، وليست علاجًا منزليًا.', en: 'Ornamental only, not a home remedy.' } },
        ],
      },
    ],
  },
  'dracaena-sanderiana': {
    tagline: {
      ar: 'نبتة داخلية سهلة للماء أو التربة. المهم ماء نظيف وضوء غير مباشر.',
      en: 'An easy indoor plant for water or soil. Clean water and indirect light matter most.',
    },
    stats: [
      { label: { ar: 'الاستخدام', en: 'Use' }, value: { ar: 'زينة مكتبية', en: 'Desk ornamental' } },
      { label: { ar: 'المكان', en: 'Place' }, value: { ar: 'داخل مضيء', en: 'Bright indoor spot' } },
      { label: { ar: 'الري', en: 'Water' }, value: { ar: 'ماء نظيف أو تربة رطبة', en: 'Clean water or lightly moist soil' } },
      { label: { ar: 'تنبيه', en: 'Caution' }, value: { ar: 'ليست بامبو حقيقي', en: 'Not true bamboo' } },
    ],
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'water',
        items: [
          { label: { ar: 'في الماء', en: 'In water' }, value: { ar: 'غيّر الماء أسبوعيًا واستخدم ماء خالي من الكلور.', en: 'Change water weekly and use chlorine-free water.' } },
          { label: { ar: 'في التربة', en: 'In soil' }, value: { ar: 'خليط خفيف ورطب بدون إغراق.', en: 'Light, moist mix without soaking.' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'عقل ساقية من ساق صحي.', en: 'Stem cuttings from healthy canes.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن ساق أو جذور من الماء الراكد.', en: 'Stem or root rot from stagnant water.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'بق دقيقي، عناكب حمراء، وقشريات.', en: 'Mealybugs, spider mites, and scale.' } },
          { label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'ساق طرية أو رائحة ماء سيئة.', en: 'Soft cane or bad-smelling water.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'مكاتب، طاولات، وهدايا نباتية.', en: 'Offices, desks, and plant gifts.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'في التربة عادة أطول من بقائها في الماء.', en: 'Usually lasts longer in soil than in water.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'أبعدها عن الحيوانات التي تقضم النباتات.', en: 'Keep from pets that chew plants.' } },
        ],
      },
    ],
  },
  'dracaena-fragrans': {
    tagline: {
      ar: 'نبتة داخلية كبيرة وهادئة. نجاحها يعتمد على ضوء مرشح وري محسوب.',
      en: 'A calm large indoor plant. Filtered light and measured watering are key.',
    },
    stats: [
      { label: { ar: 'الاستخدام', en: 'Use' }, value: { ar: 'زينة داخلية كبيرة', en: 'Large indoor ornamental' } },
      { label: { ar: 'المكان', en: 'Place' }, value: { ar: 'ضوء متوسط مرشح', en: 'Medium filtered light' } },
      { label: { ar: 'الري', en: 'Water' }, value: { ar: 'بعد جفاف جزء من التربة', en: 'After part of the soil dries' } },
      { label: { ar: 'تنبيه', en: 'Caution' }, value: { ar: 'حساسة للإغراق', en: 'Sensitive to overwatering' } },
    ],
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'قوي غير مباشر أو متوسط قريب من نافذة.', en: 'Bright indirect or medium light near a window.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'تربة أصص عادية مع فتحات تصريف.', en: 'Standard potting mix with drainage holes.' } },
          { label: { ar: 'التقليم', en: 'Pruning' }, value: { ar: 'قص الساق الطويلة يشجع التفريع.', en: 'Cutting tall canes can encourage branching.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن جذور أو ساق من تربة مشبعة.', en: 'Root or cane rot from saturated soil.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'بق دقيقي، تربس، وقشريات.', en: 'Mealybugs, thrips, and scale.' } },
          { label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'اصفرار مستمر أو أطراف بنية كثيرة.', en: 'Persistent yellowing or many brown tips.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'زوايا، مكاتب، ومداخل داخلية.', en: 'Corners, offices, and indoor entries.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'تعيش سنوات طويلة إذا ثبت الضوء والري.', en: 'Long-lived when light and watering are stable.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'غير صالحة للأكل وقد تزعج الحيوانات.', en: 'Not edible and may bother pets.' } },
        ],
      },
    ],
  },
  'dracaena-trifasciata': {
    tagline: {
      ar: 'نبتة قوية جدًا للمبتدئين. قلل الماء وسيكون وضعها ممتاز.',
      en: 'A very tough beginner plant. Use less water and it usually thrives.',
    },
    stats: [
      { label: { ar: 'الاستخدام', en: 'Use' }, value: { ar: 'زينة داخلية قوية', en: 'Tough indoor ornamental' } },
      { label: { ar: 'المكان', en: 'Place' }, value: { ar: 'من ضوء منخفض إلى ساطع', en: 'Low to bright light' } },
      { label: { ar: 'الري', en: 'Water' }, value: { ar: 'بعد جفاف التربة تمامًا', en: 'After soil fully dries' } },
      { label: { ar: 'تنبيه', en: 'Caution' }, value: { ar: 'الماء الزائد يقتلها', en: 'Too much water kills it' } },
    ],
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'تتحمل القليل، وتتحسن في ضوء غير مباشر.', en: 'Tolerates low light; improves in indirect light.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'خليط صباريات أو تربة خفيفة جدًا.', en: 'Cactus mix or very light soil.' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'القسمة أفضل وأضمن من العقل الورقية.', en: 'Division is easier and safer than leaf cuttings.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن جذور من الري الزائد.', en: 'Root rot from overwatering.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'بق دقيقي، عناكب حمراء، وقشريات.', en: 'Mealybugs, spider mites, and scale.' } },
          { label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'ورقة طرية أو قاعدة سوداء.', en: 'Soft leaf or black base.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'غرف، مكاتب، وممرات.', en: 'Rooms, offices, and corridors.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'تعيش طويلًا لأنها بطيئة وقوية.', en: 'Long-lived because it grows slowly and strongly.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'أبعدها عن الأطفال والحيوانات التي تأكل النباتات.', en: 'Keep from children and pets that eat plants.' } },
        ],
      },
    ],
  },
  'zamioculcas-zamiifolia': {
    tagline: {
      ar: 'نبتة داخلية لامعة تتحمل الإهمال. لا تحب كثرة الماء.',
      en: 'A glossy indoor plant that tolerates neglect. It dislikes too much water.',
    },
    stats: [
      { label: { ar: 'الاستخدام', en: 'Use' }, value: { ar: 'زينة داخلية راقية', en: 'Polished indoor ornamental' } },
      { label: { ar: 'المكان', en: 'Place' }, value: { ar: 'ضوء منخفض أو مرشح', en: 'Low or filtered light' } },
      { label: { ar: 'الري', en: 'Water' }, value: { ar: 'بعد جفاف كامل', en: 'After full dryness' } },
      { label: { ar: 'تنبيه', en: 'Caution' }, value: { ar: 'جذاميرها تتعفن بالماء', en: 'Rhizomes rot in excess water' } },
    ],
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'تتحمل القليل، والأفضل ضوء غير مباشر.', en: 'Tolerates low light; indirect light is better.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'خليط جيد التصريف مع بيرلايت.', en: 'Well-drained mix with perlite.' } },
          { label: { ar: 'التنظيف', en: 'Cleaning' }, value: { ar: 'امسح الغبار عن الأوراق لتبقى لامعة.', en: 'Wipe leaf dust to keep the shine.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن جذامير وجذور من الري الزائد.', en: 'Rhizome and root rot from overwatering.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'حشرات قشرية غالبًا.', en: 'Scale insects are the common pest.' } },
          { label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'اصفرار مع ساق طرية أو رائحة تربة.', en: 'Yellowing with soft stems or bad soil smell.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'مكاتب، مداخل، وأماكن قليلة العناية.', en: 'Offices, entries, and low-care areas.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'تعيش طويلًا إذا قل الماء.', en: 'Long-lived when watering is sparse.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'لا تؤكل؛ عصارتها قد تهيج الفم.', en: 'Not edible; sap may irritate the mouth.' } },
        ],
      },
    ],
  },
  'dracaena-trifasciata-golden-hahnii': {
    tagline: {
      ar: 'جلد نمر قزمي ومبرقش. مناسب للأرفف والطاولات، ويحتاج ري قليل.',
      en: 'A compact variegated snake plant for shelves and desks. It needs little water.',
    },
    stats: [
      { label: { ar: 'الاستخدام', en: 'Use' }, value: { ar: 'زينة صغيرة', en: 'Small ornamental' } },
      { label: { ar: 'المكان', en: 'Place' }, value: { ar: 'ضوء ساطع غير مباشر', en: 'Bright indirect light' } },
      { label: { ar: 'الري', en: 'Water' }, value: { ar: 'قليل جدًا', en: 'Very sparse' } },
      { label: { ar: 'تنبيه', en: 'Caution' }, value: { ar: 'التبرقش يحتاج ضوء', en: 'Variegation needs light' } },
    ],
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'ضوء ساطع يحافظ على اللون الأصفر.', en: 'Bright light keeps the yellow color.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'خليط صباريات وتصريف ممتاز.', en: 'Cactus mix with excellent drainage.' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'بالخلفات أو القسمة للحفاظ على التبرقش.', en: 'Offsets or division preserve variegation.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن الجذور أو قلب الوردة.', en: 'Root or crown rot.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'بق دقيقي، عناكب حمراء، وقشريات.', en: 'Mealybugs, spider mites, and scale.' } },
          { label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'ليونة الأوراق أو سواد القاعدة.', en: 'Soft leaves or black base.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'طاولات، أرفف، وأصيص صغير.', en: 'Desks, shelves, and small pots.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'تعيش طويلًا إذا كان الري قليلًا.', en: 'Long-lived with sparse watering.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'ضارة إذا أكلت؛ أبعدها عن الحيوانات.', en: 'Harmful if eaten; keep away from pets.' } },
        ],
      },
    ],
  },
}

const getPracticalProfile = (plant: Plant) => practicalProfiles[plant.id]

function App() {
  const [lang, setLang] = useState<Lang>('ar')
  const [query, setQuery] = useState('')
  const path = normalizePath()
  const t = labels[lang]
  const alternate = otherLang(lang)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const plantId = path.startsWith('/plant/') ? decodeURIComponent(path.replace('/plant/', '')) : ''
  const selectedPlant = plantId ? getPlantById(plantId) : undefined

  const filteredPlants = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return plants

    return plants.filter((plant) => {
      const haystack = [
        plant.commonName.ar,
        plant.commonName.en,
        plant.scientificName,
        plant.subtitle.ar,
        plant.subtitle.en,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(needle)
    })
  }, [query])

  return (
    <div className="app" dir={dir}>
      <Header lang={lang} setLang={setLang} />

      {selectedPlant ? (
        <PlantPage plant={selectedPlant} lang={lang} />
      ) : path === '/' ? (
        <HomePage
          lang={lang}
          query={query}
          setQuery={setQuery}
          filteredPlants={filteredPlants}
        />
      ) : (
        <main className="not-found">
          <Leaf aria-hidden="true" />
          <h1>{t.notFound}</h1>
          <a href={appPath('/')} className="text-link">
            {t.back}
          </a>
        </main>
      )}

      <footer className="site-footer">
        <span>{t.brand}</span>
        <span>{labels[alternate].brand}</span>
      </footer>
    </div>
  )
}

function Header({
  lang,
  setLang,
}: {
  lang: Lang
  setLang: (lang: Lang) => void
}) {
  const t = labels[lang]

  return (
    <header className="site-header">
      <a href={appPath('/')} className="brand" aria-label={t.home}>
        <span className="brand-mark">
          <Leaf size={18} aria-hidden="true" />
        </span>
        <span>
          <strong>{t.brand}</strong>
          <small>{t.brandEn}</small>
        </span>
      </a>
      <nav className="nav-actions" aria-label="Primary">
        <a href={appPath('/')} className="icon-link" title={t.home}>
          <Home size={18} aria-hidden="true" />
          <span>{t.home}</span>
        </a>
        <button
          type="button"
          className="icon-button"
          onClick={() => setLang(otherLang(lang))}
          title={t.language}
        >
          <Languages size={18} aria-hidden="true" />
          <span>{t.language}</span>
        </button>
      </nav>
    </header>
  )
}

function HomePage({
  lang,
  query,
  setQuery,
  filteredPlants,
}: {
  lang: Lang
  query: string
  setQuery: (query: string) => void
  filteredPlants: Plant[]
}) {
  const t = labels[lang]
  const alternate = otherLang(lang)

  return (
    <main>
      <section className="plant-index" id="plants">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.browse}</p>
            <h2>{t.brand}</h2>
          </div>
          <label className="search-box">
            <Search size={18} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              type="search"
            />
          </label>
        </div>

        {filteredPlants.length > 0 ? (
          <div className="plant-grid">
            {filteredPlants.map((plant) => (
              <a className="plant-card" href={plantPath(plant)} key={plant.id}>
                <img src={assetPath(plant.image)} alt={plant.commonName[lang]} />
                <div className="plant-card-copy">
                  <h3>{plant.commonName[lang]}</h3>
                  <p className="secondary-name">{plant.commonName[alternate]}</p>
                  <p className="scientific">{plant.scientificName}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="empty-state">{t.noResults}</p>
        )}
      </section>
    </main>
  )
}

function PlantPage({ plant, lang }: { plant: Plant; lang: Lang }) {
  const t = labels[lang]
  const alternate = otherLang(lang)
  const titleName = plant.commonName[lang].split(' / ')[0]
  const profile = getPracticalProfile(plant)

  return (
    <main className="plant-page">
      <section className="plant-showcase" style={{ '--plant-accent': plant.accent } as React.CSSProperties}>
        <div className="showcase-image">
          <img src={assetPath(plant.image)} alt={plant.commonName[lang]} />
        </div>
        <div className="showcase-copy">
          <a href={appPath('/')} className="back-link">
            <ArrowLeft size={17} aria-hidden="true" />
            {t.back}
          </a>
          <p className="eyebrow">{t.scientificName}</p>
          <h1>{titleName}</h1>
          <p className="secondary-name large">{plant.commonName[alternate]}</p>
          <p className="scientific large">{plant.scientificName}</p>
          <p className="profile-tagline">{profile.tagline[lang]}</p>
          <div className="profile-stats">
            {profile.stats.map((item) => (
              <article key={`${item.label.en}-${item.value.en}`}>
                <strong>{item.label[lang]}</strong>
                <span>{item.value[lang]}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-board">
        {profile.sections.map((section) => (
          <PracticalSection section={section} lang={lang} key={section.title.en} />
        ))}
      </section>

      <section className="science-panel">
        <details>
          <summary>
            <BookOpen size={18} aria-hidden="true" />
            {lang === 'ar' ? 'التفاصيل العلمية المختصرة' : 'Short scientific details'}
          </summary>
          <div className="science-flow">
            <InfoSection id="identity" title={t.quickFacts} facts={plant.taxonomy} lang={lang} />
            <InfoSection id="sources-facts" title={t.sources} facts={plant.uses} lang={lang} />
          </div>
        </details>
      </section>

      <section className="sources-section" id="sources">
        <div className="section-heading simple">
          <h2>{t.sources}</h2>
          <p className="scientific">{plant.scientificName}</p>
        </div>
        <div className="source-list">
          {plant.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
              <span>
                <strong>{source.label}</strong>
                <small>{source.note[lang]}</small>
              </span>
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

function PracticalSection({ section, lang }: { section: ProfileSection; lang: Lang }) {
  const Icon = profileIcons[section.icon]

  return (
    <article className={`practical-section ${section.icon}`}>
      <div className="practical-heading">
        <span>
          <Icon size={22} aria-hidden="true" />
        </span>
        <h2>{section.title[lang]}</h2>
      </div>
      <div className="practical-items">
        {section.items.map((item) => (
          <div className="practical-item" key={`${item.label.en}-${item.value.en}`}>
            <strong>{item.label[lang]}</strong>
            <p>{item.value[lang]}</p>
          </div>
        ))}
      </div>
    </article>
  )
}

function InfoSection({
  id,
  title,
  facts,
  lang,
}: {
  id: string
  title: string
  facts: Fact[]
  lang: Lang
}) {
  const alternate = otherLang(lang)

  return (
    <section className="info-section" id={id}>
      <div className="section-heading simple">
        <h2>{title}</h2>
      </div>
      <div className="fact-list">
        {facts.map((fact) => (
          <article className="fact-row" key={`${fact.label.en}-${fact.value.en}`}>
            <div className="fact-label">
              <h3>{fact.label[lang]}</h3>
              <small>{fact.label[alternate]}</small>
            </div>
            <div className="fact-copy">
              <p>{fact.value[lang]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default App
