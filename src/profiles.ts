import type { Lang } from './data'

type ProfileIcon = 'use' | 'grow' | 'light' | 'water' | 'pests' | 'safety'

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
 * The numbers behind the care gauges. They are teaching approximations of the
 * prose in data.ts (and its sources), not lab measurements:
 * - light: 0 = deep shade, 100 = full direct sun all day.
 * - water: 0 = soil kept dry, 100 = roots always wet (water culture).
 * - temperature in C; humidity is relative humidity in %.
 */
export type PlantNeeds = {
  light: { ideal: number; min: number; max: number; label: Text }
  water: { level: number; label: Text; check: Text }
  schedule: { icon: ScheduleIcon; label: Text; value: Text }[]
  temperature: { min: number; max: number; lowest: number }
  humidity: { min: number; max: number }
  ease: 1 | 2 | 3
  growth: 'slow' | 'medium' | 'fast'
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

const practicalProfiles: Record<string, PracticalProfile> = {
  'catharanthus-roseus': {
    tagline: {
      ar: 'نبتة زينة مزهرة تحتاج ضوء قوي وصرف ممتاز. لا تناسب الظل الداخلي.',
      en: 'A flowering ornamental that needs strong light and excellent drainage.',
    },
    use: { ar: 'زينة مزهرة فقط', en: 'Flowering ornamental only' },
    caution: { ar: 'لا تؤكل — زينة فقط وليست علاجًا منزليًا.', en: 'Not edible — ornamental only, not a home remedy.' },
    needs: {
      light: { ideal: 90, min: 55, max: 100, label: { ar: 'شمس مباشرة أو ضوء قوي جدًا', en: 'Full sun or very bright light' } },
      water: {
        level: 50,
        label: { ar: 'معتدل — بعد جفاف السطح', en: 'Moderate — after the surface dries' },
        check: { ar: 'اسقِ عندما تجف أعلى 2–3 سم من التربة، ولا تترك ماء في الصحن.', en: 'Water when the top 2–3 cm of soil is dry, and never leave water in the saucer.' },
      },
      schedule: [
        { icon: 'summer', label: summer, value: { ar: 'كل 3–4 أيام تقريبًا', en: 'About every 3–4 days' } },
        { icon: 'winter', label: winter, value: { ar: 'مرة أسبوعيًا تقريبًا', en: 'About once a week' } },
      ],
      temperature: { min: 20, max: 30, lowest: 10 },
      humidity: { min: 40, max: 60 },
      ease: 3,
      growth: 'fast',
      toxicity: 'low',
    },
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
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'اسوداد قاعدة الساق أو ذبول مفاجئ.', en: 'Black stem base or sudden wilt.' } },
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
    use: { ar: 'زينة مكتبية', en: 'Desk ornamental' },
    caution: { ar: 'ليست بامبو حقيقي — والماء الراكد يعفّن الساق.', en: 'Not true bamboo — and stagnant water rots the cane.' },
    needs: {
      light: { ideal: 55, min: 30, max: 70, label: { ar: 'داخل مضيء بضوء غير مباشر', en: 'Bright indoor spot, indirect light' } },
      water: {
        level: 85,
        label: { ar: 'ماء نظيف دائمًا أو تربة رطبة', en: 'Clean water or lightly moist soil' },
        check: { ar: 'استخدم ماء خالي من الكلور، وأبقِ الماء فوق الجذور فقط.', en: 'Use chlorine-free water and keep it just above the roots.' },
      },
      schedule: [
        { icon: 'vase', label: { ar: 'في الماء', en: 'In water' }, value: { ar: 'غيّر الماء كل أسبوع', en: 'Change the water weekly' } },
        { icon: 'pot', label: { ar: 'في التربة', en: 'In soil' }, value: { ar: 'عند جفاف السطح قليلًا', en: 'When the surface just dries' } },
      ],
      temperature: { min: 18, max: 32, lowest: 10 },
      humidity: { min: 50, max: 70 },
      ease: 2,
      growth: 'medium',
      toxicity: 'low',
    },
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
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'ساق طرية أو رائحة ماء سيئة.', en: 'Soft cane or bad-smelling water.' } },
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
    use: { ar: 'زينة داخلية كبيرة', en: 'Large indoor ornamental' },
    caution: { ar: 'حساسة للإغراق — لا تترك الأصيص مشبعًا بالماء.', en: 'Sensitive to overwatering — never leave the pot saturated.' },
    needs: {
      light: { ideal: 50, min: 30, max: 70, label: { ar: 'ضوء متوسط مرشح', en: 'Medium filtered light' } },
      water: {
        level: 45,
        label: { ar: 'معتدل — بعد جفاف جزء من التربة', en: 'Moderate — after part of the soil dries' },
        check: { ar: 'اسقِ عندما يجف الثلث العلوي من التربة، وقلّل الري في الشتاء.', en: 'Water when the top third of the soil is dry; water less in winter.' },
      },
      schedule: [
        { icon: 'summer', label: summer, value: { ar: 'كل 7–10 أيام تقريبًا', en: 'About every 7–10 days' } },
        { icon: 'winter', label: winter, value: { ar: 'كل 2–3 أسابيع', en: 'Every 2–3 weeks' } },
      ],
      temperature: { min: 21, max: 27, lowest: 10 },
      humidity: { min: 40, max: 60 },
      ease: 2,
      growth: 'slow',
      toxicity: 'low',
    },
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
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'اصفرار مستمر أو أطراف بنية كثيرة.', en: 'Persistent yellowing or many brown tips.' } },
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
    use: { ar: 'زينة داخلية قوية', en: 'Tough indoor ornamental' },
    caution: { ar: 'الماء الزائد يقتلها — الجفاف أهون عليها من الإغراق.', en: 'Too much water kills it — drought is far safer than soaking.' },
    needs: {
      light: { ideal: 50, min: 15, max: 85, label: { ar: 'من ضوء منخفض إلى ساطع', en: 'Low to bright light' } },
      water: {
        level: 20,
        label: { ar: 'قليل — بعد جفاف التربة تمامًا', en: 'Low — after the soil fully dries' },
        check: { ar: 'أدخل عودًا خشبيًا للقاع؛ إذا خرج جافًا تمامًا فاسقِ.', en: 'Push a wooden stick to the bottom; water only if it comes out fully dry.' },
      },
      schedule: [
        { icon: 'summer', label: summer, value: { ar: 'كل 2–3 أسابيع', en: 'Every 2–3 weeks' } },
        { icon: 'winter', label: winter, value: { ar: 'كل 1–2 شهر', en: 'Every 1–2 months' } },
      ],
      temperature: { min: 18, max: 29, lowest: 10 },
      humidity: { min: 30, max: 50 },
      ease: 1,
      growth: 'slow',
      toxicity: 'low',
    },
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
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'ورقة طرية أو قاعدة سوداء.', en: 'Soft leaf or black base.' } },
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
    use: { ar: 'زينة داخلية راقية', en: 'Polished indoor ornamental' },
    caution: { ar: 'جذاميرها تتعفن بالماء الزائد — لا تترك الصحن ممتلئًا.', en: 'Rhizomes rot in excess water — never leave the saucer full.' },
    needs: {
      light: { ideal: 40, min: 10, max: 65, label: { ar: 'ضوء منخفض أو مرشح', en: 'Low or filtered light' } },
      water: {
        level: 20,
        label: { ar: 'قليل — بعد جفاف كامل', en: 'Low — after full dryness' },
        check: { ar: 'الجذامير تخزن الماء؛ اسقِ فقط بعد جفاف التربة بالكامل.', en: 'The rhizomes store water; water only once the soil is completely dry.' },
      },
      schedule: [
        { icon: 'summer', label: summer, value: { ar: 'مرتين في الشهر', en: 'Twice a month' } },
        { icon: 'winter', label: winter, value: { ar: 'مرة في الشهر أو أقل', en: 'Monthly or less' } },
      ],
      temperature: { min: 18, max: 26, lowest: 10 },
      humidity: { min: 30, max: 50 },
      ease: 1,
      growth: 'slow',
      toxicity: 'medium',
    },
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
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'اصفرار مع ساق طرية أو رائحة تربة.', en: 'Yellowing with soft stems or bad soil smell.' } },
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
    use: { ar: 'زينة صغيرة', en: 'Small ornamental' },
    caution: { ar: 'التبرقش الأصفر يحتاج ضوء — في الظل يبهت لونها.', en: 'The yellow variegation needs light — it fades in shade.' },
    needs: {
      light: { ideal: 65, min: 40, max: 85, label: { ar: 'ضوء ساطع غير مباشر', en: 'Bright indirect light' } },
      water: {
        level: 15,
        label: { ar: 'قليل جدًا', en: 'Very sparse' },
        check: { ar: 'اسقِ حول الوردة لا داخلها، وفقط بعد جفاف التربة.', en: 'Water around the rosette, never into it, and only once the soil is dry.' },
      },
      schedule: [
        { icon: 'summer', label: summer, value: { ar: 'كل 3 أسابيع تقريبًا', en: 'About every 3 weeks' } },
        { icon: 'winter', label: winter, value: { ar: 'مرة في الشهر أو أقل', en: 'Monthly or less' } },
      ],
      temperature: { min: 18, max: 29, lowest: 10 },
      humidity: { min: 30, max: 50 },
      ease: 1,
      growth: 'slow',
      toxicity: 'low',
    },
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
          { tone: 'danger', label: { ar: 'علامة خطر', en: 'Danger sign' }, value: { ar: 'ليونة الأوراق أو سواد القاعدة.', en: 'Soft leaves or black base.' } },
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

export const getProfile = (id: string): PracticalProfile => practicalProfiles[id]
