export type Lang = 'ar' | 'en'

export type LocalizedText = {
  ar: string
  en: string
}

export type Fact = {
  label: LocalizedText
  value: LocalizedText
}

export type Source = {
  label: string
  url: string
  note: LocalizedText
}

export type Plant = {
  id: string
  index: number
  image: string
  accent: string
  commonName: LocalizedText
  scientificName: string
  subtitle: LocalizedText
  confidence: LocalizedText
  confidenceLevel: 'high' | 'qualified'
  summary: LocalizedText
  taxonomy: Fact[]
  care: Fact[]
  health: Fact[]
  uses: Fact[]
  sources: Source[]
}

const kew = 'Kew Plants of the World Online'
const ncState = 'NC State Extension Plant Toolbox'

export const plants: Plant[] = [
  {
    id: 'catharanthus-roseus',
    index: 1,
    image: '/plants/01-catharanthus-roseus.jpeg',
    accent: '#b04b67',
    commonName: {
      ar: 'ونكا / Madagascar Periwinkle',
      en: 'Madagascar periwinkle / Annual vinca',
    },
    scientificName: 'Catharanthus roseus (L.) G.Don',
    subtitle: {
      ar: 'نبات مزهر مداري من الفصيلة الدفلية، مهم كنبات زينة ومصدر لمركبات دوائية نقية.',
      en: 'A tropical flowering plant in Apocynaceae, grown ornamentally and known as a source of purified medicinal alkaloids.',
    },
    confidence: {
      ar: 'مطابقة عالية جدًا من الصورة، مع ملاحظة أن وجود الأزهار يرفع التأكيد أكثر.',
      en: 'Very high visual match; visible flowers would make the identification even stronger.',
    },
    confidenceLevel: 'high',
    summary: {
      ar: 'الاسم العلمي المقبول هو Catharanthus roseus. موطنه الأصلي مدغشقر، ويزرع عالميًا كنبات زينة يتحمل الحرارة نسبيًا إذا توفرت تربة جيدة التصريف. لا يؤكل؛ المركبات الدوائية منه تستخدم بعد عزل وتصنيع متخصص فقط.',
      en: 'The accepted scientific name is Catharanthus roseus. It is native to Madagascar and is widely cultivated as a heat-tolerant ornamental when drainage is good. It is not edible; medically useful compounds are isolated and manufactured professionally.',
    },
    taxonomy: [
      {
        label: { ar: 'العائلة', en: 'Family' },
        value: { ar: 'Apocynaceae - الفصيلة الدفلية', en: 'Apocynaceae - dogbane family' },
      },
      {
        label: { ar: 'الحالة التصنيفية', en: 'Taxonomic status' },
        value: { ar: 'اسم مقبول في Kew POWO؛ الاسم القديم الشائع Vinca rosea مرادف.', en: 'Accepted by Kew POWO; the older Vinca rosea is a synonym.' },
      },
      {
        label: { ar: 'الموطن الأصلي', en: 'Native range' },
        value: { ar: 'شرق وجنوب مدغشقر.', en: 'Eastern and southern Madagascar.' },
      },
      {
        label: { ar: 'النمط النباتي', en: 'Growth habit' },
        value: { ar: 'شجيرة صغيرة أو معمر غض، ويعامل غالبًا كنبات حولي خارج المناطق الدافئة.', en: 'Tender perennial/subshrub, often grown as an annual outside warm zones.' },
      },
    ],
    care: [
      {
        label: { ar: 'الضوء', en: 'Light' },
        value: { ar: 'شمس كاملة إلى ظل جزئي أو مرشح؛ الإضاءة القوية تحسن الإزهار.', en: 'Full sun to partial or dappled shade; stronger light supports better flowering.' },
      },
      {
        label: { ar: 'الري', en: 'Watering' },
        value: { ar: 'اسق عند جفاف السطح مع منع ركود الماء. البرودة والرطوبة الزائدة تزيد تعفن الجذور.', en: 'Water after the surface dries; avoid standing water. Cold, wet soil raises root-rot risk.' },
      },
      {
        label: { ar: 'التربة', en: 'Soil' },
        value: { ar: 'تربة رطبة جيدة التصريف؛ يفضل الحموضة الخفيفة ويتحمل الرمل أو الطمي أو المادة العضوية إذا كان الصرف جيدًا.', en: 'Moist, well-drained soil; slightly acidic is preferred, but sand, loam, or organic mixes work if drainage is good.' },
      },
      {
        label: { ar: 'الإكثار', en: 'Propagation' },
        value: { ar: 'غالبًا بالبذور في أجواء دافئة، ثم ينقل بعد اعتدال الحرارة.', en: 'Usually propagated by seed in warm conditions, then transplanted after temperatures are mild.' },
      },
    ],
    health: [
      {
        label: { ar: 'الأمراض', en: 'Diseases' },
        value: { ar: 'قد يصاب بالذبول البكتيري الجنوبي، لفحة/تعفن Phytophthora، التعفن الأسود للجذور، وتبقعات الأوراق.', en: 'Can develop southern bacterial wilt, Phytophthora blight/root rot, black root rot, and leaf spots.' },
      },
      {
        label: { ar: 'الوقاية', en: 'Prevention' },
        value: { ar: 'استخدم تربة دافئة جيدة التصريف، تجنب الري الزائد ورش الأوراق ليلًا، وأزل النباتات المصابة بشدة.', en: 'Use warm, well-drained soil, avoid overwatering and night leaf wetness, and remove badly diseased plants.' },
      },
      {
        label: { ar: 'السمية', en: 'Toxicity' },
        value: { ar: 'منخفضة الشدة عادة، لكن أكل كميات كبيرة خطر؛ يحتوي على قلويدات فينكا وقد يسبب قيئًا وإسهالًا وأعراضًا عصبية.', en: 'Usually low-severity, but large ingestion is dangerous; contains vinca alkaloids and may cause vomiting, diarrhea, and neurologic signs.' },
      },
    ],
    uses: [
      {
        label: { ar: 'استخدامات الزينة', en: 'Ornamental use' },
        value: { ar: 'مناسب للأحواض، الحدود، الأصص، والحدائق المتحملة للجفاف نسبيًا.', en: 'Useful in beds, borders, containers, and moderately drought-tolerant gardens.' },
      },
      {
        label: { ar: 'الاستخدام الدوائي', en: 'Medicinal relevance' },
        value: { ar: 'المركبات مثل vincristine وvinblastine مهمة طبيًا بعد العزل والتنقية؛ النبات نفسه ليس وصفة ولا يؤكل.', en: 'Compounds such as vincristine and vinblastine are medically important after isolation and purification; the plant itself is not a remedy and should not be eaten.' },
      },
    ],
    sources: [
      {
        label: `${kew} - Catharanthus roseus`,
        url: 'https://powo.science.kew.org/taxon/77880-1',
        note: { ar: 'الاسم المقبول، الموطن الأصلي، التصنيف.', en: 'Accepted name, native range, classification.' },
      },
      {
        label: `${ncState} - Catharanthus roseus`,
        url: 'https://plants.ces.ncsu.edu/plants/catharanthus-roseus/common-name/running-myrtle/',
        note: { ar: 'العناية، الأمراض، التربة، السمية.', en: 'Care, diseases, soil, toxicity.' },
      },
      {
        label: 'NCBI Bookshelf - Vinca alkaloids',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK12718/',
        note: { ar: 'خلفية دوائية عن قلويدات الفينكا.', en: 'Medical background on vinca alkaloids.' },
      },
    ],
  },
  {
    id: 'dracaena-sanderiana',
    index: 2,
    image: '/plants/02-dracaena-sanderiana.jpeg',
    accent: '#377f6a',
    commonName: {
      ar: 'البامبو المحظوظ / Lucky Bamboo',
      en: 'Lucky bamboo / Ribbon plant',
    },
    scientificName: 'Dracaena sanderiana Mast.',
    subtitle: {
      ar: 'ليس بامبو حقيقيًا؛ هو دراسينا مدارية تباع غالبًا بسيقان مائية أو ملتفة.',
      en: 'Not a true bamboo; it is a tropical Dracaena often sold as water-grown or trained canes.',
    },
    confidence: {
      ar: 'مطابقة عالية جدًا: السيقان الخضراء المفصلية والأوراق الشريطية توافق Dracaena sanderiana.',
      en: 'Very high match: the segmented green canes and strappy leaves fit Dracaena sanderiana.',
    },
    confidenceLevel: 'high',
    summary: {
      ar: 'Dracaena sanderiana اسم مقبول، موطنه غرب ووسط أفريقيا المدارية إلى شمال شرق أنغولا. ينجح في الضوء الساطع غير المباشر، ويمكن زراعته في ماء خال من الكلور أو في خليط تربة رطب جيد التهوية.',
      en: 'Dracaena sanderiana is an accepted name, native from west-central tropical Africa to northeastern Angola. It grows best in bright indirect light and can be kept in chlorine-free water or a moist, airy potting mix.',
    },
    taxonomy: [
      {
        label: { ar: 'العائلة', en: 'Family' },
        value: { ar: 'Asparagaceae - الهليونية', en: 'Asparagaceae - asparagus family' },
      },
      {
        label: { ar: 'الحالة التصنيفية', en: 'Taxonomic status' },
        value: { ar: 'اسم مقبول في Kew POWO؛ Dracaena braunii وPleomele sanderiana أسماء قديمة.', en: 'Accepted by Kew POWO; Dracaena braunii and Pleomele sanderiana are older names.' },
      },
      {
        label: { ar: 'الموطن الأصلي', en: 'Native range' },
        value: { ar: 'غرب ووسط أفريقيا المدارية إلى شمال شرق أنغولا.', en: 'West-central tropical Africa to northeastern Angola.' },
      },
      {
        label: { ar: 'النمط النباتي', en: 'Growth habit' },
        value: { ar: 'شجيرة مدارية معمرة ذات أوراق شريطية وسيقان لحمية.', en: 'Tropical perennial shrub with strappy leaves and fleshy canes.' },
      },
    ],
    care: [
      {
        label: { ar: 'الضوء', en: 'Light' },
        value: { ar: 'ضوء داخلي ساطع غير مباشر؛ يتحمل الظل، لكن الشمس المباشرة قد تحرق الأطراف.', en: 'Bright indirect indoor light; tolerates shade, but direct sun may scorch the tips.' },
      },
      {
        label: { ar: 'الماء', en: 'Water' },
        value: { ar: 'في الماء: استخدم ماء خاليًا من الكلور وغيّره أسبوعيًا. في التربة: حافظ على رطوبة خفيفة دون إغراق.', en: 'In water: use chlorine-free water and change it weekly. In soil: keep lightly moist without waterlogging.' },
      },
      {
        label: { ar: 'التربة', en: 'Soil' },
        value: { ar: 'خليط أصص رخو ورطب، أو حصى في إناء مائي لتثبيت الجذور والسيقان.', en: 'Loose, moist potting mix, or pebbles in a water vessel to anchor roots and canes.' },
      },
      {
        label: { ar: 'التسميد والإكثار', en: 'Feeding and propagation' },
        value: { ar: 'سماد سائل مخفف جدًا عند الحاجة. الإكثار بالعقل الساقية.', en: 'Use very weak liquid fertilizer when needed. Propagate from stem cuttings.' },
      },
    ],
    health: [
      {
        label: { ar: 'الآفات', en: 'Pests' },
        value: { ar: 'راقب البق الدقيقي، العناكب الحمراء، والحشرات القشرية.', en: 'Monitor for mealybugs, mites, and scale insects.' },
      },
      {
        label: { ar: 'مشكلات شائعة', en: 'Common problems' },
        value: { ar: 'الري الزائد يسبب اصفرار الأوراق وتعفن الساق؛ انخفاض الرطوبة يسبب احتراق أطراف الأوراق.', en: 'Overwatering causes yellow leaves and stem rot; low humidity causes brown leaf tips.' },
      },
      {
        label: { ar: 'السمية', en: 'Toxicity' },
        value: { ar: 'يحتوي سابونينات؛ غير مناسب للأكل وقد يسبب أعراضًا للحيوانات الأليفة.', en: 'Contains saponins; not edible and may cause symptoms in pets.' },
      },
    ],
    uses: [
      {
        label: { ar: 'الاستخدام', en: 'Use' },
        value: { ar: 'نبات مكاتب ومنازل قليل المتطلبات، مناسب للأواني المائية أو الأصص الداخلية.', en: 'Low-demand office and home plant, suitable for water vessels or indoor pots.' },
      },
      {
        label: { ar: 'ملاحظة علمية', en: 'Scientific note' },
        value: { ar: 'الاسم التجاري Lucky Bamboo شائع، لكنه ليس من فصيلة البامبو أو الأعشاب.', en: 'The trade name Lucky Bamboo is common, but it is not a bamboo or a grass.' },
      },
    ],
    sources: [
      {
        label: `${kew} - Dracaena sanderiana`,
        url: 'https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A60471006-2/general-information',
        note: { ar: 'الاسم المقبول والموطن الأصلي.', en: 'Accepted name and native range.' },
      },
      {
        label: `${ncState} - Dracaena sanderiana`,
        url: 'https://plants.ces.ncsu.edu/plants/dracaena-sanderiana/common-name/ribbon-plant/',
        note: { ar: 'العناية، النمو في الماء، الآفات، السمية.', en: 'Care, water culture, pests, toxicity.' },
      },
    ],
  },
  {
    id: 'dracaena-fragrans',
    index: 3,
    image: '/plants/03-dracaena-fragrans.jpeg',
    accent: '#5a7d3f',
    commonName: {
      ar: 'دراسينا / Janet Craig أو نوع قريب',
      en: 'Dracaena / Janet Craig type',
    },
    scientificName: 'Dracaena fragrans (L.) Ker Gawl.',
    subtitle: {
      ar: 'دراسينا داخلية خشبية الساق بأوراق عريضة شريطية؛ تحديد الصنف من الصورة وحدها يبقى مؤهلًا.',
      en: 'An indoor cane Dracaena with broad strap leaves; cultivar-level identification remains qualified from the photo alone.',
    },
    confidence: {
      ar: 'قريبة جدًا وليست نهائية: الصورة توافق Dracaena fragrans أو أحد أصنافها مثل Janet Craig.',
      en: 'Close but not final: the photo fits Dracaena fragrans or a cultivar such as Janet Craig.',
    },
    confidenceLevel: 'high',
    summary: {
      ar: 'Dracaena fragrans اسم مقبول وموطنه أفريقيا المدارية. يستخدم كنبات داخلي بطيء النمو، ويفضل الضوء المرشح والتربة جيدة الصرف. يلزم ذكر عدم اليقين لأن أصناف الدراسينا تتشابه كثيرًا في الصور.',
      en: 'Dracaena fragrans is an accepted name native to tropical Africa. It is a slow-growing interiorscape plant that prefers filtered light and well-drained soil. The uncertainty is stated because Dracaena cultivars can look very similar in photos.',
    },
    taxonomy: [
      {
        label: { ar: 'العائلة', en: 'Family' },
        value: { ar: 'Asparagaceae - الهليونية', en: 'Asparagaceae - asparagus family' },
      },
      {
        label: { ar: 'الحالة التصنيفية', en: 'Taxonomic status' },
        value: { ar: 'اسم مقبول في Kew POWO؛ من أسمائه القديمة Dracaena deremensis وDracaena massangeana.', en: 'Accepted by Kew POWO; older names include Dracaena deremensis and Dracaena massangeana.' },
      },
      {
        label: { ar: 'الموطن الأصلي', en: 'Native range' },
        value: { ar: 'أفريقيا المدارية.', en: 'Tropical Africa.' },
      },
      {
        label: { ar: 'النمط النباتي', en: 'Growth habit' },
        value: { ar: 'شجيرة أو شجرة دائمة الخضرة بطيئة النمو، ذات سيقان خشبية وأوراق عريضة.', en: 'Slow-growing evergreen shrub or tree with woody canes and broad leaves.' },
      },
    ],
    care: [
      {
        label: { ar: 'الضوء', en: 'Light' },
        value: { ar: 'ضوء ساطع إلى متوسط مرشح. الشمس المباشرة تحرق الأوراق، والظلام الشديد يضعف شكلها.', en: 'Bright to moderate filtered light. Direct sun scorches foliage, while very low light narrows and weakens leaves.' },
      },
      {
        label: { ar: 'الري', en: 'Watering' },
        value: { ar: 'حافظ على رطوبة معتدلة في موسم النمو، وخفف الري شتاءً. لا تترك الأصيص غارقًا.', en: 'Keep moderately moist in the growing season and reduce water in winter. Do not leave the pot saturated.' },
      },
      {
        label: { ar: 'التربة والحرارة', en: 'Soil and temperature' },
        value: { ar: 'خليط أصص تجاري مع فتحات تصريف. يفضل 21-27 م تقريبًا، ويحفظ فوق 10 م.', en: 'Commercial potting mix with drainage holes. Prefers about 21-27 C and should be kept above 10 C.' },
      },
      {
        label: { ar: 'الإكثار', en: 'Propagation' },
        value: { ar: 'بالعقل الساقية أو قطع القصب.', en: 'By stem or cane cuttings.' },
      },
    ],
    health: [
      {
        label: { ar: 'الآفات', en: 'Pests' },
        value: { ar: 'البق الدقيقي، التربس، والحشرات القشرية من الآفات المسجلة.', en: 'Mealybugs, thrips, and scale insects are recorded problems.' },
      },
      {
        label: { ar: 'أعراض بيئية', en: 'Environmental symptoms' },
        value: { ar: 'احتراق الأطراف يرتبط بانخفاض الرطوبة أو أملاح/فلورايد ماء الصنبور؛ التعفن يرتبط بالري الزائد.', en: 'Brown tips are linked to low humidity or tap-water salts/fluoride; rot is linked to overwatering.' },
      },
      {
        label: { ar: 'السمية', en: 'Toxicity' },
        value: { ar: 'منخفضة الشدة لكن غير صالحة للأكل؛ السابونينات قد تؤذي القطط والكلاب والأطفال عند الابتلاع.', en: 'Low-severity but not edible; saponins can affect cats, dogs, and children if ingested.' },
      },
    ],
    uses: [
      {
        label: { ar: 'الاستخدام الداخلي', en: 'Indoor use' },
        value: { ar: 'نبات داخلي ومكتبي طويل العمر، مناسب للمساحات الهادئة والإضاءة المرشحة.', en: 'Long-lived home and office foliage plant for calm spaces and filtered light.' },
      },
      {
        label: { ar: 'خارج المناطق المعتدلة', en: 'Warm-climate use' },
        value: { ar: 'في المناطق المدارية يستخدم كنبات منظر، حاجز، أو عينة منفردة.', en: 'In tropical climates it can be used as a landscape specimen, screen, or filler.' },
      },
    ],
    sources: [
      {
        label: `${kew} - Dracaena fragrans`,
        url: 'https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A534207-1',
        note: { ar: 'الاسم المقبول، المرادفات، الموطن.', en: 'Accepted name, synonyms, native range.' },
      },
      {
        label: `${ncState} - Dracaena fragrans`,
        url: 'https://plants.ces.ncsu.edu/plants/dracaena-fragrans/common-name/dragon-tree/',
        note: { ar: 'العناية، الآفات، السمية، الأصناف.', en: 'Care, pests, toxicity, cultivars.' },
      },
    ],
  },
  {
    id: 'dracaena-trifasciata',
    index: 4,
    image: '/plants/04-dracaena-trifasciata.jpeg',
    accent: '#2f6e52',
    commonName: {
      ar: 'جلد النمر / Snake Plant',
      en: 'Snake plant / Mother-in-law\'s tongue',
    },
    scientificName: 'Dracaena trifasciata (Prain) Mabb.',
    subtitle: {
      ar: 'اسمها القديم Sansevieria trifasciata ما زال شائعًا تجاريًا، لكن الاسم المقبول حديثًا ضمن Dracaena.',
      en: 'The old name Sansevieria trifasciata remains common in trade, but the accepted modern name is within Dracaena.',
    },
    confidence: {
      ar: 'مطابقة عالية: الأوراق العصارية القائمة ذات الأشرطة العرضية توافق Dracaena trifasciata.',
      en: 'High match: upright succulent leaves with transverse bands fit Dracaena trifasciata.',
    },
    confidenceLevel: 'high',
    summary: {
      ar: 'Dracaena trifasciata نبات جذموري عصاري من أفريقيا الاستوائية، شديد التحمل داخليًا إذا قل الري وتحسن الصرف. أهم خطأ في العناية هو الإغراق.',
      en: 'Dracaena trifasciata is a rhizomatous succulent from tropical Africa and is very durable indoors when watering is restrained and drainage is strong. Overwatering is the main care error.',
    },
    taxonomy: [
      {
        label: { ar: 'العائلة', en: 'Family' },
        value: { ar: 'Asparagaceae - الهليونية', en: 'Asparagaceae - asparagus family' },
      },
      {
        label: { ar: 'الحالة التصنيفية', en: 'Taxonomic status' },
        value: { ar: 'اسم مقبول في Kew POWO؛ Sansevieria trifasciata مرادف قديم.', en: 'Accepted by Kew POWO; Sansevieria trifasciata is an older synonym.' },
      },
      {
        label: { ar: 'الموطن الأصلي', en: 'Native range' },
        value: { ar: 'جنوب نيجيريا إلى غرب أفريقيا المدارية الوسطى وتنزانيا.', en: 'Southern Nigeria to west-central tropical Africa and Tanzania.' },
      },
      {
        label: { ar: 'النمط النباتي', en: 'Growth habit' },
        value: { ar: 'عشبي معمر عصاري جذموري، بأوراق قائمة جلدية.', en: 'Rhizomatous succulent herbaceous perennial with stiff upright leaves.' },
      },
    ],
    care: [
      {
        label: { ar: 'الضوء', en: 'Light' },
        value: { ar: 'يتحمل الضوء المنخفض، وينمو جيدًا في ضوء ساطع غير مباشر أو شمس جزئية.', en: 'Tolerates low light and grows well in bright indirect light or part sun.' },
      },
      {
        label: { ar: 'الري', en: 'Watering' },
        value: { ar: 'اترك التربة تجف بين الريات من الربيع للخريف؛ في الشتاء يكفي ري خفيف كل شهر إلى شهرين.', en: 'Let soil dry between waterings from spring to autumn; in winter, water lightly every one to two months.' },
      },
      {
        label: { ar: 'التربة', en: 'Soil' },
        value: { ar: 'خليط رملي أو طمي جيد التصريف، محايد إلى قلوي. لا يناسبه احتباس الماء.', en: 'Sandy or loamy, sharply drained mix, neutral to alkaline. It does not tolerate water retention.' },
      },
      {
        label: { ar: 'الإكثار', en: 'Propagation' },
        value: { ar: 'بالقسمة أو العقل الورقية. القسمة أفضل للحفاظ على الصفات المبرقشة.', en: 'By division or leaf cuttings. Division best preserves variegated traits.' },
      },
    ],
    health: [
      {
        label: { ar: 'الآفات', en: 'Pests' },
        value: { ar: 'راقب البق الدقيقي والعناكب الحمراء، وقد تظهر القشريات أو التربس في البيئات الداخلية.', en: 'Monitor for mealybugs and spider mites; scale or thrips may also appear indoors.' },
      },
      {
        label: { ar: 'الأمراض', en: 'Diseases' },
        value: { ar: 'المشكلة الأهم تعفن الجذور بسبب الري الزائد أو تربة ضعيفة التصريف.', en: 'The main disease problem is root rot from overwatering or poorly drained soil.' },
      },
      {
        label: { ar: 'السمية', en: 'Toxicity' },
        value: { ar: 'يحتوي سابونينات؛ الابتلاع قد يسبب قيئًا وغثيانًا وإسهالًا وتهيجًا.', en: 'Contains saponins; ingestion can cause vomiting, nausea, diarrhea, and irritation.' },
      },
    ],
    uses: [
      {
        label: { ar: 'الاستخدام', en: 'Use' },
        value: { ar: 'نبات داخلي قوي للأصص، ومناسب للزوايا قليلة الخدمة مع ضوء كافٍ وصرف جيد.', en: 'Durable indoor container plant for low-maintenance spaces with enough light and strong drainage.' },
      },
      {
        label: { ar: 'حدود علمية', en: 'Scientific caution' },
        value: { ar: 'لا يعتمد عليه كبديل للتهوية أو لتنقية الهواء طبيًا؛ قيمته الأساسية نبات زينة.', en: 'Do not treat it as a substitute for ventilation or medical air purification; its main value here is ornamental.' },
      },
    ],
    sources: [
      {
        label: `${kew} - Dracaena trifasciata`,
        url: 'https://powo.science.kew.org/taxon/77164235-1',
        note: { ar: 'الاسم المقبول، المرادف Sansevieria، الموطن.', en: 'Accepted name, Sansevieria synonym, native range.' },
      },
      {
        label: `${ncState} - Dracaena trifasciata`,
        url: 'https://plants.ces.ncsu.edu/plants/dracaena-trifasciata/common-name/snake-plant/',
        note: { ar: 'العناية، الري، الآفات، السمية.', en: 'Care, watering, pests, toxicity.' },
      },
    ],
  },
  {
    id: 'zamioculcas-zamiifolia',
    index: 5,
    image: '/plants/05-zamioculcas-zamiifolia.jpeg',
    accent: '#3c7d4e',
    commonName: {
      ar: 'زاميا / ZZ Plant',
      en: 'ZZ plant / Zanzibar gem',
    },
    scientificName: 'Zamioculcas zamiifolia (G.Lodd.) Engl.',
    subtitle: {
      ar: 'نبات جذموري لامع من الفصيلة القلقاسية، شديد التحمل لقلة الري.',
      en: 'A glossy rhizomatous aroid, highly tolerant of dry indoor intervals.',
    },
    confidence: {
      ar: 'مطابقة عالية جدًا: الأوراق اللامعة المركبة والسيقان اللحمية توافق ZZ Plant.',
      en: 'Very high match: glossy compound leaves and fleshy stems fit ZZ plant.',
    },
    confidenceLevel: 'high',
    summary: {
      ar: 'Zamioculcas zamiifolia اسم مقبول، موطنه من كينيا إلى كوازولو-ناتال. جذاميره تخزن الماء، لذلك يفضل الجفاف بين الريات ويتضرر من التربة المشبعة.',
      en: 'Zamioculcas zamiifolia is an accepted name, native from Kenya to KwaZulu-Natal. Its rhizomes store water, so it prefers drying between waterings and suffers in saturated soil.',
    },
    taxonomy: [
      {
        label: { ar: 'العائلة', en: 'Family' },
        value: { ar: 'Araceae - القلقاسية', en: 'Araceae - aroid family' },
      },
      {
        label: { ar: 'الحالة التصنيفية', en: 'Taxonomic status' },
        value: { ar: 'اسم مقبول في Kew POWO؛ من الأسماء القديمة Caladium zamiifolium وZamioculcas loddigesii.', en: 'Accepted by Kew POWO; older names include Caladium zamiifolium and Zamioculcas loddigesii.' },
      },
      {
        label: { ar: 'الموطن الأصلي', en: 'Native range' },
        value: { ar: 'كينيا إلى كوازولو-ناتال، ويشمل ملاوي وموزمبيق وتنزانيا وزيمبابوي.', en: 'Kenya to KwaZulu-Natal, including Malawi, Mozambique, Tanzania, and Zimbabwe.' },
      },
      {
        label: { ar: 'النمط النباتي', en: 'Growth habit' },
        value: { ar: 'معمر عشبي دائم الخضرة بجذامير سميكة وأوراق مركبة لامعة.', en: 'Evergreen herbaceous perennial with thick rhizomes and glossy compound leaves.' },
      },
    ],
    care: [
      {
        label: { ar: 'الضوء', en: 'Light' },
        value: { ar: 'يتحمل الظل العميق والضوء الفلوري، لكنه يكون أفضل في ضوء ساطع غير مباشر. تجنب الشمس المباشرة.', en: 'Tolerates deep shade and fluorescent light, but performs best in bright indirect light. Avoid direct sun.' },
      },
      {
        label: { ar: 'الري', en: 'Watering' },
        value: { ar: 'اترك التربة تجف تمامًا بين الريات؛ صيفًا قد تكفي مرتان شهريًا، وشتاءً غالبًا مرة شهريًا أو أقل.', en: 'Let soil dry completely between waterings; twice monthly may be enough in summer, and monthly or less in winter.' },
      },
      {
        label: { ar: 'التربة', en: 'Soil' },
        value: { ar: 'خليط عضوي أو رملي جيد التصريف. الجذامير لا تتحمل الأقدام المبللة.', en: 'Organic or sandy well-drained mix. Rhizomes do not tolerate wet feet.' },
      },
      {
        label: { ar: 'الإكثار', en: 'Propagation' },
        value: { ar: 'بالقسمة أو العقل الورقية، لكنه بطيء النمو.', en: 'By division or leaf cuttings, but growth is slow.' },
      },
    ],
    health: [
      {
        label: { ar: 'الآفات', en: 'Pests' },
        value: { ar: 'قد تظهر الحشرات القشرية؛ افحص السطح السفلي للأوراق والسيقان.', en: 'Scale insects can occur; inspect lower leaf surfaces and stems.' },
      },
      {
        label: { ar: 'الأمراض', en: 'Diseases' },
        value: { ar: 'التعفن الجذموري والجذري يحدث غالبًا من الري الزائد أو بقاء الصحن مملوءًا بالماء.', en: 'Rhizome and root rot usually come from overwatering or leaving the saucer filled with water.' },
      },
      {
        label: { ar: 'السمية', en: 'Toxicity' },
        value: { ar: 'متوسطة الشدة؛ أوراقه تحتوي أوكسالات الكالسيوم وقد تسبب قيئًا أو إسهالًا عند أكلها بكميات.', en: 'Medium-severity toxicity; leaves contain calcium oxalate and may cause vomiting or diarrhea if eaten in quantity.' },
      },
    ],
    uses: [
      {
        label: { ar: 'الاستخدام', en: 'Use' },
        value: { ar: 'نبات داخلي ممتاز للمكاتب والممرات لأنه يتحمل الإهمال النسبي وقلة الضوء.', en: 'Excellent indoor plant for offices and corridors because it tolerates relative neglect and low light.' },
      },
      {
        label: { ar: 'التحذير', en: 'Caution' },
        value: { ar: 'ضعه بعيدًا عن الأطفال والحيوانات الأليفة، واغسل اليدين بعد التقليم.', en: 'Keep away from children and pets, and wash hands after pruning.' },
      },
    ],
    sources: [
      {
        label: `${kew} - Zamioculcas zamiifolia`,
        url: 'https://powo.science.kew.org/taxon/89402-1',
        note: { ar: 'الاسم المقبول، الموطن، التصنيف.', en: 'Accepted name, native range, classification.' },
      },
      {
        label: `${ncState} - Zamioculcas zamiifolia`,
        url: 'https://plants.ces.ncsu.edu/plants/zamioculcas-zamiifolia/common-name/zz-plant/',
        note: { ar: 'العناية، الري، السمية، الآفات.', en: 'Care, watering, toxicity, pests.' },
      },
    ],
  },
  {
    id: 'dracaena-trifasciata-golden-hahnii',
    index: 6,
    image: '/plants/06-dracaena-golden-hahnii.jpeg',
    accent: '#b78b2d',
    commonName: {
      ar: 'جلد النمر القزمي المبرقش / Golden Hahnii',
      en: 'Golden Hahnii bird\'s nest snake plant',
    },
    scientificName: "Dracaena trifasciata 'Golden Hahnii'",
    subtitle: {
      ar: 'صنف بستاني قزمي مبرقش من جلد النمر، ويظهر تجاريًا كثيرًا باسم Sansevieria trifasciata Golden Hahnii.',
      en: 'A compact variegated horticultural cultivar of snake plant, still widely traded as Sansevieria trifasciata Golden Hahnii.',
    },
    confidence: {
      ar: 'مطابقة عالية: الوردة القصيرة والأطراف الصفراء توافق Golden Hahnii أو صنفًا قريبًا من مجموعة Hahnii.',
      en: 'High match: the short rosette and yellow margins fit Golden Hahnii or a closely related Hahnii-type cultivar.',
    },
    confidenceLevel: 'high',
    summary: {
      ar: 'هذا نبات صنفي لا بري؛ لذلك يكون اسمه العلمي/البستاني بصيغة صنف. للعناية يعامل مثل Dracaena trifasciata: صرف قوي، ري قليل، وحماية من البرودة والرطوبة الشتوية.',
      en: 'This is a cultivated selection rather than a wild species, so its name is written as a cultivar. Care is like Dracaena trifasciata: strong drainage, sparse watering, and protection from cold winter wet.',
    },
    taxonomy: [
      {
        label: { ar: 'العائلة', en: 'Family' },
        value: { ar: 'Asparagaceae - الهليونية', en: 'Asparagaceae - asparagus family' },
      },
      {
        label: { ar: 'الحالة التصنيفية', en: 'Taxonomic status' },
        value: { ar: "صنف بستاني من Dracaena trifasciata؛ RHS يدرجه باسم Sansevieria trifasciata 'Golden Hahnii'.", en: "Cultivar of Dracaena trifasciata; RHS lists it as Sansevieria trifasciata 'Golden Hahnii'." },
      },
      {
        label: { ar: 'الأصل', en: 'Origin' },
        value: { ar: 'صنف مزروع، لا يعامل كموطن بري مستقل.', en: 'Cultivated selection, not treated as a separate wild native range.' },
      },
      {
        label: { ar: 'الشكل', en: 'Habit' },
        value: { ar: 'وردة مدمجة بأوراق عريضة رمادية-خضراء وهوامش صفراء.', en: 'Compact rosette with broad grey-green leaves and yellow margins.' },
      },
    ],
    care: [
      {
        label: { ar: 'الضوء', en: 'Light' },
        value: { ar: 'ضوء ساطع غير مباشر، ويتحمل شمسًا خفيفة. التبرقش يحتاج إضاءة جيدة دون حرق.', en: 'Bright indirect light, with some gentle sun tolerated. Variegation needs good light without scorch.' },
      },
      {
        label: { ar: 'الري', en: 'Watering' },
        value: { ar: 'ري قليل جدًا بعد جفاف التربة. احمِه من الرطوبة الشتوية والبرودة.', en: 'Water sparingly after the soil dries. Protect from winter wet and cold.' },
      },
      {
        label: { ar: 'التربة', en: 'Soil' },
        value: { ar: 'خليط رملي أو طمي جيد التصريف؛ يفضل البقاء محصورًا قليلًا في الأصيص.', en: 'Sandy or loamy well-drained mix; it tolerates being slightly pot-bound.' },
      },
      {
        label: { ar: 'الإكثار', en: 'Propagation' },
        value: { ar: 'بالقسمة أو الخلفات للحفاظ على التبرقش. العقل الورقية قد لا تعطي نفس اللون.', en: 'By division or offsets to preserve variegation. Leaf cuttings may not keep the same color pattern.' },
      },
    ],
    health: [
      {
        label: { ar: 'الآفات', en: 'Pests' },
        value: { ar: 'نفس آفات جلد النمر: بق دقيقي، عناكب حمراء، قشريات أو تربس.', en: 'Same pest profile as snake plant: mealybugs, spider mites, scale, or thrips.' },
      },
      {
        label: { ar: 'الأمراض', en: 'Diseases' },
        value: { ar: 'تعفن الجذور أكثر مشكلة عند زيادة الري أو ضعف الصرف.', en: 'Root rot is the main problem when watering is excessive or drainage is poor.' },
      },
      {
        label: { ar: 'السمية', en: 'Toxicity' },
        value: { ar: 'ضار إذا أكل؛ يفضل ارتداء قفازات عند التقليم وإبعاده عن الأطفال والحيوانات.', en: 'Harmful if eaten; wear gloves when pruning and keep away from children and pets.' },
      },
    ],
    uses: [
      {
        label: { ar: 'الاستخدام', en: 'Use' },
        value: { ar: 'ممتاز للطاولات والأرفف والأصص الصغيرة بسبب شكله الوردي المدمج.', en: 'Excellent for desks, shelves, and small containers because of its compact rosette form.' },
      },
      {
        label: { ar: 'ملاحظة تسمية', en: 'Naming note' },
        value: { ar: 'للدقة العلمية اكتب الاسم الحديث Dracaena trifasciata مع ذكر الاسم التجاري القديم Sansevieria.', en: 'For scientific clarity, use modern Dracaena trifasciata while also noting the older trade name Sansevieria.' },
      },
    ],
    sources: [
      {
        label: `${kew} - Dracaena trifasciata`,
        url: 'https://powo.science.kew.org/taxon/77164235-1',
        note: { ar: 'الاسم المقبول للنوع الأم والمرادف Sansevieria.', en: 'Accepted name of the parent species and Sansevieria synonym.' },
      },
      {
        label: 'RHS - Sansevieria trifasciata Golden Hahnii',
        url: 'https://www.rhs.org.uk/plants/81378/sansevieria-trifasciata-golden-hahnii-%28v%29/details',
        note: { ar: 'وصف الصنف، النمو، الضرر عند الأكل، والإكثار.', en: 'Cultivar description, habit, harmful-if-eaten note, and propagation.' },
      },
      {
        label: `${ncState} - Dracaena trifasciata`,
        url: 'https://plants.ces.ncsu.edu/plants/dracaena-trifasciata/common-name/snake-plant/',
        note: { ar: 'عناية النوع الأم والسمية والآفات.', en: 'Parent species care, toxicity, and pests.' },
      },
    ],
  },
]

export const getPlantById = (id: string) => plants.find((plant) => plant.id === id)

export const labels = {
  ar: {
    brand: 'دليل النباتات',
    brandEn: 'Plant QR Science Guide',
    home: 'الرئيسية',
    qr: 'رموز QR',
    searchPlaceholder: 'ابحث باسم عربي أو إنجليزي أو علمي',
    heroTitle: 'صفحات علمية واضحة لكل نبتة',
    heroBody: 'ست صفحات ثابتة، كل صفحة تجمع الاسم العلمي، العناية، التربة، الأمراض، الاستخدامات، والروابط العلمية.',
    browse: 'تصفح النباتات',
    printQr: 'طباعة QR',
    sourcePolicy: 'كل معلومة مهمة مرتبطة بمصدر ظاهر داخل صفحة النبتة.',
    confidence: 'درجة التطابق',
    scientificName: 'الاسم العلمي',
    quickFacts: 'الهوية العلمية',
    care: 'العناية والتربية',
    health: 'الأمراض والسمية',
    uses: 'الاستخدامات والملاحظات',
    sources: 'المصادر العلمية',
    openPlant: 'افتح صفحة النبتة',
    back: 'رجوع',
    notFound: 'لم يتم العثور على هذه النبتة.',
    qrTitle: 'صفحة QR للطباعة',
    qrBody: 'اطبع هذه الصفحة، قص كل رمز، وضعه بجانب النبتة. كل رمز يفتح صفحة النبتة مباشرة.',
    print: 'طباعة',
    scanToOpen: 'امسح الرمز لفتح صفحة النبتة',
    noResults: 'لا توجد نتائج مطابقة.',
    language: 'English',
    verified: 'موثق',
    qualified: 'موثق',
  },
  en: {
    brand: 'Plant QR Science Guide',
    brandEn: 'دليل النباتات',
    home: 'Home',
    qr: 'QR codes',
    searchPlaceholder: 'Search Arabic, English, or scientific name',
    heroTitle: 'Clear scientific pages for every plant',
    heroBody: 'Six stable pages covering scientific names, care, soil, diseases, uses, safety, and visible source links.',
    browse: 'Browse plants',
    printQr: 'Print QR',
    sourcePolicy: 'Every key claim is tied to a visible source on the plant page.',
    confidence: 'Identification confidence',
    scientificName: 'Scientific name',
    quickFacts: 'Scientific identity',
    care: 'Care and cultivation',
    health: 'Diseases and toxicity',
    uses: 'Uses and notes',
    sources: 'Scientific sources',
    openPlant: 'Open plant page',
    back: 'Back',
    notFound: 'This plant was not found.',
    qrTitle: 'Printable QR sheet',
    qrBody: 'Print this page, cut each code, and place it beside the plant. Each code opens the plant page directly.',
    print: 'Print',
    scanToOpen: 'Scan to open this plant page',
    noResults: 'No matching plants.',
    language: 'العربية',
    verified: 'Verified',
    qualified: 'Qualified',
  },
} as const
