import type { Lang } from './data'

type ProfileIcon = 'about' | 'use' | 'grow' | 'light' | 'water' | 'pests' | 'safety'

type Text = Record<Lang, string>

export type ProfileItem = {
  label: Text
  value: Text
  /** Rendered as a warning so the one symptom that means "act now" stands out. */
  tone?: 'danger'
}

export type ProfileSection = {
  title: Text
  icon: ProfileIcon
  items: ProfileItem[]
}

export type ScheduleIcon = 'summer' | 'winter' | 'vase' | 'pot'

/**
 * Light follows the UF/IFAS houseplant scale; each level is drawn as 25% of the ring:
 * 1 low (25-100 fc), 2 medium (100-500 fc), 3 high (500-1000 fc), 4 direct sun (>1000 fc, 4+ h).
 */
export type LightLevel = 1 | 2 | 3 | 4

/**
 * Watering uses the wording the sources use, again 25% per step:
 * 1 dry out completely, 2 top layer dries, 3 evenly moist, 4 roots in water.
 */
export type WaterLevel = 1 | 2 | 3 | 4

/**
 * Every value below is taken from the sources listed on the plant in data.ts
 * (NC State, UF/IFAS, Clemson HGIC, RHS, Costa Farms, ASPCA). Nothing is estimated:
 * where a source gives no number the field is left out and the page says so in words.
 */
export type PlantNeeds = {
  light: { ideal: LightLevel; min: LightLevel; max: LightLevel; label: Text }
  water: { level: WaterLevel; label: Text; check: Text }
  schedule: { icon: ScheduleIcon; label: Text; value: Text }[]
  /** Ideal range in C when a source gives one, and the lowest temperature it should see. */
  temperature: { min?: number; max?: number; lowest: number }
  /** 1 tolerates dry air, 2 average, 3 humid. `min` only when a source gives a percentage. */
  humidity: { level: 1 | 2 | 3; min?: number; label: Text }
  /** NC State "Maintenance" rating. */
  maintenance: 'low' | 'medium' | 'high'
  growth: 'slow' | 'medium' | 'mediumFast' | 'fast'
  /** NC State "Poison Severity". */
  toxicity: 'low' | 'medium'
}

export type PracticalProfile = {
  tagline: Text
  use: Text
  caution: Text
  needs: PlantNeeds
  sections: ProfileSection[]
}

const summer = { ar: 'الصيف', en: 'Summer' }
const winter = { ar: 'الشتاء', en: 'Winter' }
const growing = { ar: 'الربيع إلى الخريف', en: 'Spring to autumn' }

const practicalProfiles: Record<string, PracticalProfile> = {
  'catharanthus-roseus': {
    tagline: {
      ar: 'نبتة زينة مزهرة تحتاج ضوء قوي وصرف ممتاز. لا تناسب الظل الداخلي.',
      en: 'A flowering ornamental that needs strong light and excellent drainage.',
    },
    use: { ar: 'زينة مزهرة فقط', en: 'Flowering ornamental only' },
    caution: { ar: 'لا تؤكل — زينة فقط وليست علاجًا منزليًا.', en: 'Not edible — ornamental only, not a home remedy.' },
    needs: {
      light: { ideal: 4, min: 3, max: 4, label: { ar: 'شمس كاملة — 6 ساعات فأكثر تزيد الإزهار', en: 'Full sun — 6+ hours boosts flowering' } },
      water: {
        level: 2,
        label: { ar: 'معتدل — تتحمل الجفاف', en: 'Moderate — drought tolerant' },
        check: { ar: 'اسقِ ريًّا عميقًا ثم اتركها تجف؛ الري المتكرر يسبب تعفن الجذور والساق.', en: 'Water deeply, then let it dry; frequent watering causes root and stem rot.' },
      },
      schedule: [
        { icon: 'summer', label: summer, value: { ar: 'ري عميق مرة أسبوعيًا تقريبًا', en: 'Deep watering about once a week' } },
        { icon: 'winter', label: winter, value: { ar: 'قلّل الري', en: 'Water less' } },
      ],
      temperature: { lowest: 10 },
      humidity: { level: 1, label: { ar: 'لا تحتاج رطوبة خاصة — المهم التهوية', en: 'No special humidity — airflow matters' } },
      maintenance: 'low',
      growth: 'mediumFast',
      toxicity: 'low',
    },
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'الشمس الكاملة تزيد الإزهار، وتتحمل الظل الجزئي.', en: 'Full sun increases blooms; partial shade is tolerated.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'جيدة التصريف، وتفضل الحموضة الخفيفة (pH 5.5–6.0).', en: 'Well drained, slightly acidic preferred (pH 5.5–6.0).' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'بذور تنبت خلال أسبوع عند 21–24°م، أو عقل طرية صيفًا.', en: 'Seed germinates in a week at 21–24 C, or softwood cuttings in summer.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن الجذور والساق (فايتوفثورا)، ذبول فيوزاريوم، وتبقعات أوراق — أغلبها من الري الزائد.', en: 'Phytophthora root and stem rot, Fusarium wilt, leaf spots — mostly from overwatering.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'لا آفات رئيسية؛ تحت البيوت المحمية: ذبابة بيضاء وعناكب حمراء.', en: 'No major pests; under glass: whitefly and spider mites.' } },
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'بقع بنية إلى سوداء على الساق مع ذبول مفاجئ.', en: 'Dark brown to black stem lesions with sudden wilting.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'أحواض، أصص، وسلال معلقة في مكان مشمس.', en: 'Beds, containers, and hanging baskets in sun.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'معمّرة في المناطق الدافئة، وتُزرع غالبًا كحولية موسمية.', en: 'Perennial in warm zones; usually grown as a seasonal annual.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'سامة للحيوانات الأليفة، وليست علاجًا منزليًا.', en: 'Toxic to pets, and not a home remedy.' } },
        ],
      },
    ],
  },
  'dracaena-sanderiana': {
    tagline: {
      ar: 'نبتة داخلية سهلة للماء أو التربة. المهم ماء نظيف وضوء غير مباشر.',
      en: 'An easy indoor plant for water or soil. Clean water and indirect light matter most.',
    },
    use: { ar: 'زينة مكتبية', en: 'Desk ornamental' },
    caution: { ar: 'ليست بامبو حقيقي — والماء الزائد يعفّن الساق.', en: 'Not true bamboo — and too much water rots the cane.' },
    needs: {
      light: { ideal: 3, min: 1, max: 3, label: { ar: 'ساطع غير مباشر — الشمس المباشرة تحرق الأوراق', en: 'Bright indirect — direct sun burns the leaves' } },
      water: {
        level: 4,
        label: { ar: 'في الماء، أو تربة تُسقى عند جفاف سطحها', en: 'In water, or soil watered when the top dries' },
        check: { ar: 'في الماء: يغطي الجذور و2.5 سم من الساق، واستخدم ماء خاليًا من الكلور.', en: 'In water: cover the roots and 2.5 cm of stem, using chlorine-free water.' },
      },
      schedule: [
        { icon: 'vase', label: { ar: 'في الماء', en: 'In water' }, value: { ar: 'غيّر الماء كل أسبوع', en: 'Change the water weekly' } },
        { icon: 'pot', label: { ar: 'في التربة', en: 'In soil' }, value: { ar: 'عند جفاف أول 2.5 سم', en: 'When the top 2.5 cm is dry' } },
      ],
      temperature: { min: 18, max: 30, lowest: 18 },
      humidity: { level: 2, label: { ar: 'متوسطة — الجو الجاف يُسمّر أطراف الأوراق', en: 'Average — dry air browns leaf tips' } },
      maintenance: 'medium',
      growth: 'slow',
      toxicity: 'low',
    },
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'water',
        items: [
          { label: { ar: 'في الماء', en: 'In water' }, value: { ar: 'غيّر الماء أسبوعيًا واستخدم ماء خاليًا من الكلور.', en: 'Change water weekly and use chlorine-free water.' } },
          { label: { ar: 'في التربة', en: 'In soil' }, value: { ar: 'تربة أصص جيدة التصريف، ولا تترك ماء في الصحن.', en: 'Well-drained potting mix; never leave water in the saucer.' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'عقل من النمو الجديد تُجذَّر في الماء خلال 2–3 أسابيع.', en: 'New-growth cuttings root in water within 2–3 weeks.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'الري الزائد يسبب اصفرار الأوراق وتعفن الساق.', en: 'Overwatering causes yellow leaves and stem rot.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'عناكب حمراء، بق دقيقي، منّ، وتربس.', en: 'Spider mites, mealybugs, aphids, and thrips.' } },
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'ساق تصفرّ أو تلين — علامة ماء زائد.', en: 'A cane turning yellow or soft — a sign of excess water.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'مكاتب وطاولات في ضوء ساطع غير مباشر.', en: 'Offices and desks in bright indirect light.' } },
          { label: { ar: 'النمو', en: 'Growth' }, value: { ar: 'بطيئة النمو، وتنمو في الماء أو التربة.', en: 'Slow growing, in water or in soil.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'سامة للحيوانات الأليفة، وقد تهيّج الجلد.', en: 'Toxic to pets and can irritate skin.' } },
        ],
      },
    ],
  },
  'dracaena-fragrans': {
    tagline: {
      ar: 'نبتة داخلية كبيرة وهادئة. نجاحها يعتمد على ضوء مرشح وري محسوب.',
      en: 'A calm large indoor plant. Filtered light and measured watering are key.',
    },
    use: { ar: 'زينة داخلية كبيرة', en: 'Large indoor ornamental' },
    caution: { ar: 'حساسة للإغراق والفلورايد — لا تترك الأصيص مشبعًا بالماء.', en: 'Sensitive to soggy soil and fluoride — never leave the pot saturated.' },
    needs: {
      light: { ideal: 3, min: 1, max: 3, label: { ar: 'ساطع إلى متوسط مرشّح — الشمس المباشرة تحرق الأوراق', en: 'Bright to moderate filtered — direct sun burns leaves' } },
      water: {
        level: 2,
        label: { ar: 'معتدل — بعد جفاف أول 2.5–5 سم', en: 'Moderate — once the top 2.5–5 cm dries' },
        check: { ar: 'حساسة للفلورايد؛ استخدم ماء المطر أو ماءً مفلترًا، ولا تتركها مشبعة.', en: 'Fluoride-sensitive: use rain or filtered water, and never leave it soggy.' },
      },
      schedule: [
        { icon: 'summer', label: summer, value: { ar: 'غالبًا مرة أسبوعيًا تقريبًا', en: 'Often about once a week' } },
        { icon: 'winter', label: winter, value: { ar: 'أقل من الصيف', en: 'Less than in summer' } },
      ],
      temperature: { min: 21, max: 27, lowest: 10 },
      humidity: { level: 2, min: 40, label: { ar: 'تستفيد من الرذاذ إذا قلّت الرطوبة عن 30–40%', en: 'Mist if humidity drops below 30–40%' } },
      maintenance: 'low',
      growth: 'slow',
      toxicity: 'low',
    },
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'ساطع إلى متوسط مرشّح؛ الإضاءة الضعيفة جدًا تُضيّق الأوراق.', en: 'Bright to moderate filtered light; very low light narrows the leaves.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'تربة أصص تجارية في أصيص بفتحات تصريف.', en: 'Commercial potting mix in a pot with drainage holes.' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'عقل ساقية أو قمية، أو تطويق هوائي.', en: 'Stem or tip cuttings, or air layering.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن الجذور من الري الزائد أو ضعف التصريف.', en: 'Root rot from overwatering or poor drainage.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'بق دقيقي، تربس، حشرات قشرية، وعناكب.', en: 'Mealybugs, thrips, scale, and mites.' } },
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'اصفرار أو احتراق أطراف الأوراق — غالبًا من الفلورايد أو الأملاح أو جفاف الهواء.', en: 'Yellow or scorched leaf tips — usually fluoride, salts, or dry air.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'زوايا ومكاتب بإضاءة مرشّحة.', en: 'Corners and offices with filtered light.' } },
          { label: { ar: 'النمو', en: 'Growth' }, value: { ar: 'بطيئة النمو.', en: 'Slow growing.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'سامة للقطط والكلاب، وعصارتها قد تهيّج الجلد.', en: 'Toxic to cats and dogs; the sap can irritate skin.' } },
        ],
      },
    ],
  },
  'dracaena-trifasciata': {
    tagline: {
      ar: 'نبتة قوية جدًا للمبتدئين. قلل الماء وسيكون وضعها ممتاز.',
      en: 'A very tough beginner plant. Use less water and it usually thrives.',
    },
    use: { ar: 'زينة داخلية قوية', en: 'Tough indoor ornamental' },
    caution: { ar: 'الماء الزائد يقتلها — الجفاف أهون عليها من الإغراق.', en: 'Too much water kills it — drought is far safer than soaking.' },
    needs: {
      light: { ideal: 3, min: 1, max: 4, label: { ar: 'ساطع مع 2–6 ساعات شمس، وتتحمل الضوء المنخفض', en: 'Bright with 2–6 h of sun; tolerates low light' } },
      water: {
        level: 1,
        label: { ar: 'قليل — بعد جفاف التربة تمامًا', en: 'Low — after the soil fully dries' },
        check: { ar: 'لا تصب الماء في وسط الوردة؛ الري الزائد يعفّن الجذور.', en: 'Never pour water into the centre of the rosette; overwatering rots the roots.' },
      },
      schedule: [
        { icon: 'summer', label: growing, value: { ar: 'بعد جفاف التربة بين كل رية', en: 'Let the soil dry between waterings' } },
        { icon: 'winter', label: winter, value: { ar: 'كل 1–2 شهر', en: 'Every 1–2 months' } },
      ],
      temperature: { min: 13, max: 29, lowest: 10 },
      humidity: { level: 1, label: { ar: 'تتحمل الجو الجاف', en: 'Tolerates dry air' } },
      maintenance: 'low',
      growth: 'medium',
      toxicity: 'low',
    },
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'تتحمل الضوء المنخفض جدًا، وأفضلها ساطع مع شمس جزئية؛ احمها من شمس العصر الحارقة.', en: 'Tolerates very low light; best bright with part sun, shielded from hot afternoon sun.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'خليط صبار أو تربة رملية جيدة التصريف، متعادلة إلى قلوية.', en: 'Cactus mix or sandy, well-drained soil, neutral to alkaline.' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'القسمة أو العقل؛ العقل الورقية من الأصناف المبرقشة تفقد الحواف الصفراء.', en: 'Division or cuttings; leaf cuttings of variegated types lose the yellow edge.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن الجذور من الري الزائد هو المشكلة الرئيسية.', en: 'Root rot from overwatering is the main problem.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'بق دقيقي، عناكب حمراء، حشرات قشرية، وتربس.', en: 'Mealybugs, spider mites, scale, and thrips.' } },
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'أوراق طرية أو بنية عند القاعدة مع رائحة كريهة للتربة.', en: 'Soft or brown leaf bases with a foul-smelling soil.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'غرف، مكاتب، وممرات.', en: 'Rooms, offices, and corridors.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'متينة وسهلة النمو ويصعب أن تموت.', en: 'Durable, easily grown, and difficult to kill.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'سامة للقطط والكلاب، وعصارتها قد تهيّج الجلد.', en: 'Toxic to cats and dogs; the sap can irritate skin.' } },
        ],
      },
    ],
  },
  'zamioculcas-zamiifolia': {
    tagline: {
      ar: 'نبتة داخلية لامعة تتحمل الإهمال. لا تحب كثرة الماء.',
      en: 'A glossy indoor plant that tolerates neglect. It dislikes too much water.',
    },
    use: { ar: 'زينة داخلية راقية', en: 'Polished indoor ornamental' },
    caution: { ar: 'جذاميرها تتعفن بالماء الزائد — لا تترك الصحن ممتلئًا.', en: 'Rhizomes rot in excess water — never leave the saucer full.' },
    needs: {
      light: { ideal: 3, min: 1, max: 3, label: { ar: 'ساطع غير مباشر — تتحمل الإضاءة المنخفضة جدًا', en: 'Bright indirect — tolerates very low light' } },
      water: {
        level: 1,
        label: { ar: 'قليل — بعد جفاف التربة كاملًا', en: 'Low — after the soil fully dries' },
        check: { ar: 'الجذامير تخزن الماء، وقد تعيش 3–4 أشهر دون ري؛ لا تترك الصحن ممتلئًا.', en: 'The rhizomes store water and can last 3–4 months unwatered; never leave the saucer full.' },
      },
      schedule: [
        { icon: 'summer', label: summer, value: { ar: 'مرتين في الشهر بعد الجفاف الكامل', en: 'Twice a month, once fully dry' } },
        { icon: 'winter', label: winter, value: { ar: 'مرة في الشهر', en: 'Once a month' } },
      ],
      temperature: { min: 20, max: 24, lowest: 16 },
      humidity: { level: 1, min: 40, label: { ar: 'تتحمل الجفاف، والأفضل فوق 40%', en: 'Tolerates dry air; above 40% is best' } },
      maintenance: 'low',
      growth: 'slow',
      toxicity: 'medium',
    },
    sections: [
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'تنمو حتى تحت الإضاءة الفلورية، وأفضلها ساطع غير مباشر؛ الشمس المباشرة تحرق الأوراق.', en: 'Grows even under fluorescent light, best in bright indirect light; direct sun scalds the leaves.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'تربة عضوية أو رملية جيدة التصريف، وتُعامل مثل العصاريات.', en: 'Organic or sandy well-drained mix; treat it like a succulent.' } },
          { label: { ar: 'التسميد', en: 'Feeding' }, value: { ar: 'سماد سائل متوازن مرة أو مرتين في السنة.', en: 'Balanced liquid fertilizer once or twice a year.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن الجذامير والجذور من الري الزائد.', en: 'Rhizome and root rot from overwatering.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'قليلة الآفات؛ راقب الحشرات القشرية.', en: 'Few pests; watch for scale insects.' } },
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'اصفرار مع سيقان طرية ورائحة كريهة من التربة.', en: 'Yellowing with mushy stems and a foul soil smell.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'الصغيرة للطاولات، والكبيرة للأرض والزوايا المعتمة.', en: 'Small pots for desks, large ones for floors and dim corners.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'بطيئة النمو وتتحمل الإهمال.', en: 'Slow growing and tolerant of neglect.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'سمية متوسطة (أوكسالات الكالسيوم) إذا أُكلت أوراقها.', en: 'Moderately toxic (calcium oxalate) if leaves are eaten.' } },
        ],
      },
    ],
  },
  'dracaena-trifasciata-golden-hahnii': {
    tagline: {
      ar: 'جلد نمر قزمي ومبرقش. مناسب للأرفف والطاولات، ويحتاج ري قليل.',
      en: 'A compact variegated snake plant for shelves and desks. It needs little water.',
    },
    use: { ar: 'زينة صغيرة', en: 'Small ornamental' },
    caution: { ar: 'التبرقش الأصفر يحتاج ضوء — في الظل يبهت لونها.', en: 'The yellow variegation needs light — it fades in shade.' },
    needs: {
      light: { ideal: 3, min: 1, max: 4, label: { ar: 'ساطع مع شمس لطيفة — الضوء يحافظ على اللون الأصفر', en: 'Bright with gentle sun — light keeps the yellow' } },
      water: {
        level: 1,
        label: { ar: 'قليل جدًا — بعد جفاف التربة', en: 'Very sparse — after the soil dries' },
        check: { ar: 'اسقِ حول الوردة لا داخلها، واحمها من رطوبة الشتاء.', en: 'Water around the rosette, never into it, and keep it dry in winter.' },
      },
      schedule: [
        { icon: 'summer', label: growing, value: { ar: 'بعد جفاف التربة تمامًا', en: 'Once the soil is fully dry' } },
        { icon: 'winter', label: winter, value: { ar: 'كل 1–2 شهر', en: 'Every 1–2 months' } },
      ],
      temperature: { min: 13, max: 29, lowest: 10 },
      humidity: { level: 1, label: { ar: 'تتحمل الجو الجاف', en: 'Tolerates dry air' } },
      maintenance: 'low',
      growth: 'slow',
      toxicity: 'low',
    },
    sections: [
      {
        title: { ar: 'الوصف', en: 'About' },
        icon: 'about',
        items: [
          { label: { ar: 'الشكل', en: 'Form' }, value: { ar: 'وردة قزمية كثيفة تشبه عش الطائر، أوراقها خضراء رمادية بأشرطة صفراء على الحواف وداخل الورقة.', en: "A dense dwarf rosette like a bird's nest; grey-green leaves with yellow bands along the edges and inside the leaf." } },
          { label: { ar: 'الحجم', en: 'Size' }, value: { ar: 'نحو 15–20 سم ارتفاعًا.', en: 'About 15–20 cm tall.' } },
          { label: { ar: 'أصل الصنف', en: 'Origin' }, value: { ar: 'اكتشفه Sylvan Hahn، وسُجّل ببراءة نباتية رقم 1224 عام 1953، من سلالة «Hahnii» التي ظهرت عام 1939.', en: "Found by Sylvan Hahn and patented in 1953 (Plant Patent 1224), from the 'Hahnii' line that appeared in 1939." } },
          { label: { ar: 'الإزهار', en: 'Flowers' }, value: { ar: 'أزهار صغيرة بيضاء مخضرة عطرية في الربيع، ونادرًا ما تظهر داخل المنزل.', en: 'Small fragrant greenish-white flowers in spring, rarely seen indoors.' } },
        ],
      },
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'ساطع مع شمس لطيفة؛ في الظل يبطؤ النمو ويبهت التبرقش.', en: 'Bright with gentle sun; in shade growth slows and variegation fades.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'طميية أو رملية جيدة التصريف، متعادلة إلى قلوية.', en: 'Loam or sand, well drained, neutral to alkaline.' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'بالخلفات أو القسمة للحفاظ على التبرقش.', en: 'Offsets or division preserve variegation.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن الجذور أو قلب الوردة من الماء الزائد.', en: 'Root or crown rot from excess water.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'بق دقيقي وعناكب حمراء، وقد يصيبها سوس الكرمة.', en: 'Mealybugs and spider mites; may get vine weevil.' } },
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'ليونة الأوراق أو سواد القاعدة.', en: 'Soft leaves or black base.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'طاولات وأرفف؛ لا تُنقل لأصيص أكبر إلا عند امتلاء الجذور.', en: 'Desks and shelves; repot only when pot-bound.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'بطيئة النمو وتتحمل الإهمال.', en: 'Slow growing and tolerant of neglect.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'ضارة إذا أُكلت؛ ارتدِ قفازات عند التقليم وأبعدها عن الحيوانات.', en: 'Harmful if eaten; wear gloves and keep away from pets.' } },
        ],
      },
    ],
  },
  'dracaena-trifasciata-zeylanica': {
    tagline: {
      ar: 'جلد نمر طويل بأوراق فاتحة وأشرطة داكنة. قوي جدًا ويحتاج ري قليل.',
      en: 'A tall snake plant with pale, dark-banded leaves. Very tough and needs little water.',
    },
    use: { ar: 'زينة أرضية طويلة', en: 'Tall floor ornamental' },
    caution: { ar: 'الماء الزائد يقتلها — لا تتركها واقفة في الماء.', en: 'Too much water kills it — never let it stand in water.' },
    needs: {
      light: { ideal: 3, min: 1, max: 4, label: { ar: 'ساطع مع شمس جزئية، وتتحمل الضوء المنخفض', en: 'Bright with part sun; tolerates low light' } },
      water: {
        level: 1,
        label: { ar: 'قليل — بعد جفاف التربة تمامًا', en: 'Low — after the soil fully dries' },
        check: { ar: 'اسقِ ريًّا كاملًا بعد الجفاف التام، ولا تتركها في صحن ماء.', en: 'Water thoroughly once fully dry, and never leave it sitting in water.' },
      },
      schedule: [
        { icon: 'summer', label: growing, value: { ar: 'بعد جفاف التربة بين كل رية', en: 'Let the soil dry between waterings' } },
        { icon: 'winter', label: winter, value: { ar: 'كل 1–2 شهر', en: 'Every 1–2 months' } },
      ],
      temperature: { min: 13, max: 29, lowest: 10 },
      humidity: { level: 1, label: { ar: 'تتحمل الجو الجاف', en: 'Tolerates dry air' } },
      maintenance: 'low',
      growth: 'medium',
      toxicity: 'low',
    },
    sections: [
      {
        title: { ar: 'الوصف', en: 'About' },
        icon: 'about',
        items: [
          { label: { ar: 'الشكل', en: 'Form' }, value: { ar: 'أوراق قائمة سيفية فاتحة اللون تعبرها أشرطة خضراء داكنة متعرجة، بدون حواف صفراء.', en: 'Upright sword-like pale leaves crossed by dark green zigzag bands, with no yellow edge.' } },
          { label: { ar: 'الحجم', en: 'Size' }, value: { ar: 'نحو 75 سم إلى متر.', en: 'About 75 cm to 1 m.' } },
          { label: { ar: 'الاسم', en: 'Name' }, value: { ar: 'يُباع باسم Sansevieria zeylanica، والنوع الحقيقي بهذا الاسم من سريلانكا وجنوب الهند ونادر في الزراعة.', en: 'Sold as Sansevieria zeylanica; the true species of that name is from Sri Lanka and southern India and rare in cultivation.' } },
          { label: { ar: 'الإزهار', en: 'Flowers' }, value: { ar: 'أزهار صغيرة بيضاء مخضرة عطرية في الربيع، ونادرًا ما تظهر داخل المنزل.', en: 'Small fragrant greenish-white flowers in spring, rarely seen indoors.' } },
        ],
      },
      {
        title: { ar: 'التربية', en: 'Care' },
        icon: 'grow',
        items: [
          { label: { ar: 'الضوء', en: 'Light' }, value: { ar: 'تتحمل من الضوء المنخفض إلى الشمس الكاملة، وأفضلها ساطع مع شمس جزئية.', en: 'Handles low light to full sun; best bright with part sun.' } },
          { label: { ar: 'التربة', en: 'Soil' }, value: { ar: 'خليط صبار أو تربة رملية جيدة التصريف.', en: 'Cactus mix or sandy, well-drained soil.' } },
          { label: { ar: 'الإكثار', en: 'Propagation' }, value: { ar: 'القسمة أو العقل الورقية.', en: 'Division or leaf cuttings.' } },
        ],
      },
      {
        title: { ar: 'الأمراض والآفات', en: 'Problems' },
        icon: 'pests',
        items: [
          { label: { ar: 'أمراض', en: 'Diseases' }, value: { ar: 'تعفن الجذور من الري الزائد هو المشكلة الرئيسية.', en: 'Root rot from overwatering is the main problem.' } },
          { label: { ar: 'آفات', en: 'Pests' }, value: { ar: 'بق دقيقي، عناكب حمراء، حشرات قشرية، وتربس.', en: 'Mealybugs, spider mites, scale, and thrips.' } },
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'أوراق طرية أو بنية عند القاعدة مع رائحة كريهة للتربة.', en: 'Soft or brown leaf bases with a foul-smelling soil.' } },
        ],
      },
      {
        title: { ar: 'الاستخدام والسلامة', en: 'Use and safety' },
        icon: 'safety',
        items: [
          { label: { ar: 'استخدامها', en: 'Use' }, value: { ar: 'نبات أرضي طويل للزوايا والمداخل.', en: 'A tall floor plant for corners and entries.' } },
          { label: { ar: 'العمر', en: 'Life' }, value: { ar: 'متينة وسهلة النمو ويصعب أن تموت.', en: 'Durable, easily grown, and difficult to kill.' } },
          { label: { ar: 'السلامة', en: 'Safety' }, value: { ar: 'سامة للقطط والكلاب، وعصارتها قد تهيّج الجلد.', en: 'Toxic to cats and dogs; the sap can irritate skin.' } },
        ],
      },
    ],
  },
}

export const getProfile = (id: string): PracticalProfile => practicalProfiles[id]
