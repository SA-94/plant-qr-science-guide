# دليل النباتات | Plant QR Science Guide

موقع ثنائي اللغة (عربي/إنجليزي) يعرض صفحة علمية لكل نبتة من سبع نباتات، مع رموز QR مخصصة تفتح صفحة كل نبتة مباشرة.

A bilingual Arabic/English guide with a scientific page for each of seven plants, plus custom QR codes that open each plant page directly.

عمل الطالب **فهد عبدالله فهيد القحطاني** — جامعة الملك فيصل.

## التشغيل محليًا | Local development

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run build
```

## الصفحات | Pages

| النبتة | الصفحة | رابط QR المختصر |
| --- | --- | --- |
| ونكا / Madagascar periwinkle | `/plant/catharanthus-roseus` | `/p/1` |
| البامبو المحظوظ / Lucky bamboo | `/plant/dracaena-sanderiana` | `/p/2` |
| دراسينا / Dracaena | `/plant/dracaena-fragrans` | `/p/3` |
| جلد النمر / Snake plant | `/plant/dracaena-trifasciata` | `/p/4` |
| زاميا / ZZ plant | `/plant/zamioculcas-zamiifolia` | `/p/5` |
| جلد النمر القزمي / Golden Hahnii | `/plant/dracaena-trifasciata-golden-hahnii` | `/p/6` |
| جلد النمر زيلانيكا / Zeylanica snake plant | `/plant/dracaena-trifasciata-zeylanica` | `/p/7` |

صفحة رموز QR للطباعة على `/qr`.

## رموز QR | QR codes

الرموز مرسومة يدويًا في [`src/qr.ts`](src/qr.ts) وفيها صورة النبتة في المنتصف. ثلاثة قيود مهمة للمسح — مشروحة في تعليقات الملف:

The codes are drawn by hand in [`src/qr.ts`](src/qr.ts) with the plant photo inset. Three constraints are load-bearing for scannability and are documented in that file:

- الوحدات مرسومة متصلة ببعضها، لأن النقاط المنفصلة تكسر المسح.
- حجم الخلية مقرّب لعدد صحيح من البكسلات لتفادي التنعيم على الحواف.
- الرابط المشفّر قصير (`/p/N`) ليبقى الرمز عند الإصدار 6؛ الإصدار 7 فما فوق يضع نمط محاذاة في منتصف الرمز تمامًا مكان الصورة، وأنماط المحاذاة لا تُصحَّح بالأخطاء.

## المصادر العلمية | Sources

Kew Plants of the World Online، NC State Extension Plant Toolbox، RHS، NCBI Bookshelf. الروابط ظاهرة داخل صفحة كل نبتة.

## النشر | Deployment

GitHub Pages عبر [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
