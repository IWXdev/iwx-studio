# IWX Studio — Official Website

موقع استوديو رسمي (multi-page، بلا framework) بستايل مستوحى من مواقع الاستوديوهات indie الحقيقية (بحال tarsier.se).

## هيكلة الموقع

```
iwx-studio/
├── index.html              الصفحة الرئيسية (ترحيب + آخر تحديث + الألعاب)
├── games.html                لائحة كاملة للألعاب
├── studio.html                صفحة الاستوديو (سردية، بلا تفاصيل تقنية)
├── contact.html                صفحة التواصل
├── press-kit.html              Fact sheet + شعارات + boilerplate للصحافيين
├── games/
│   ├── echoes-of-frost.html    صفحة مخصصة لكل لعبة (screenshots + platforms + رابط تحميل)
│   ├── in-the-air.html
│   └── falling-core.html
├── css/style.css                التصميم كامل
├── js/
│   ├── background.js            الخلفية التفاعلية (node graph)
│   ├── site.js                  مشترك بين كل الصفحات: الساعة، تمييز nav، قائمة الموبايل
│   ├── main.js                  خاص بـHome/Games: عرض بطاقات الألعاب + آخر التحديثات
│   ├── game-page.js              يبني صفحة اللعبة كاملة من projects.js
│   ├── gallery.js                lightbox قابل لإعادة الاستخدام لمعرض الصور
│   ├── press-kit.js              جدول الألعاب + زر نسخ الـboilerplate
│   ├── projects.js               بيانات الألعاب (المصدر الوحيد للحقيقة — عدّل هنا فقط)
│   └── devlogs.js                بيانات التحديثات (Devlog، تبان فـHome فقط)
├── assets/                        الصور + الشعارات (logo-mark.svg / logo-wordmark.svg)
├── robots.txt / sitemap.xml
└── README.md
```

## المصدر الوحيد للحقيقة: `js/projects.js`

كل لعبة عندها كائن واحد فـ`js/projects.js` كيغذي **بطاقتها فـHome/Games، صفحتها الخاصة، وجدولها فـPress Kit** فنفس الوقت. يعني تبدل بيانات اللعبة مرة وحدة، وكل حتة كتحدث روحها أوتوماتيكيا.

```js
{
  id: "proj-04",
  slug: "my-new-game",              // خاصو يطابق اسم ملف games/my-new-game.html
  title: "My New Game",
  tagline: "وصف قصير سطر وحد",
  status: "released",               // "released" | "in-dev" | "prototype"
  year: "2026",
  platforms: ["windows", "linux"],  // "windows" | "linux" | "mac" | "web"
  page: "games/my-new-game.html",
  thumbnail: "assets/my-new-game.jpg",
  screenshots: ["assets/my-new-game-1.jpg", "assets/my-new-game-2.jpg"],
  description: "وصف مفصل يبان فصفحة اللعبة.",
  tags: ["Platformer", "2D"],
  links: { play: "https://itch.io/...", source: null }
}
```

## فيديوهات Gameplay (YouTube)

كل لعبة عندها حقل `youtubeId` فـ`js/projects.js`. حاليا كلهم `null` (مافيهومش فيديو بعد). ملي تصيفط ليا الروابط ديال يوتيوب، غادي نبدلهم بهاد الشكل:

```js
youtubeId: "dQw4w9WgXcQ",  // من https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**كيفاش كيخدم:**
- **صفحة اللعبة** (`games/*.html`): البانر فالأعلى كيولي فيديو autoplay+muted+loop بدل الصورة الثابتة. إلا مازال `youtubeId: null`، كيبقى يستعمل الصورة الثابتة أوتوماتيكيا — بلا ما تبدل شي حاجة أخرى.
- **بطاقات الألعاب** (Home + Games): الفيديو كيتشغل غير `hover` بالماوس (خفيف على الأداء، وماكاينش تأثير على الموبايل — البطاقة كتبقى صورة ثابتة والضغط عليها كيوديك للصفحة).
- كتحترم `prefers-reduced-motion` وحالة "توفير البيانات" (Data Saver) فالمتصفح — إلا مفعلين، كيرجع للصورة الثابتة أوتوماتيكيا.

## ملاحظة على أسماء المجلدات

فـ`js/projects.js`، مجلد الصور ديال "In The Air" مكتوب `assets/int-the-air/` — كاين احتمال يكون خطأ كتابة (typo) وقصدك `in-the-air`. خليتها كيفما كتبتيها باش ماندخلش على الملفات الحقيقية ديالك، ولكن تأكد منها قبل ما تزيد الصور.



1. زيد الكائن ديالها فـ`js/projects.js` (الشكل فوق).
2. حط الصور (thumbnail + screenshots) فـ`assets/` بأسماء kebab-case بلا مسافات.
3. نسخ أي ملف من `games/*.html` وسميه `games/my-new-game.html` — ماخصكش تبدل شي حاجة جواه، غادي يبني روحه أوتوماتيكيا من `js/projects.js` عبر الـ`slug`.
4. راه غادي يبان أوتوماتيكيا فـHome، Games، وPress Kit.

## Devlog

`js/devlogs.js` — زيد entry جديد **فأول اللائحة**. ماشي مربوط بصفحة، كيبان غير فـHome.

## صفحة Studio

مبنية بشكل سردي مقصود، بلا ذكر المحرك أو لغات البرمجة (بناء على طلب صاحب الموقع). إلا بغيتي تبدل النص، دوز مباشرة على `studio.html` (المحتوى مكتوب يدويا، ماشي data-driven).

## Press Kit

- الـFact sheet وboilerplate مكتوبين يدويا فـ`press-kit.html`.
- جدول "Games At A Glance" كيتبنى أوتوماتيكيا من `js/projects.js`.
- زر "copy" كينسخ نص الـboilerplate للـclipboard.

## تشغيل محلي: `python3 -m http.server` مقابل الضغط المزدوج

الضغط المزدوج كيفتح الملف عبر `file://` — بروتوكول عندو قيود أمنية فالمتصفحات (خصوصا Chrome): بعض الـAPIs كتبقى معطلة أو كتخدم بشكل مختلف (مثلا `navigator.clipboard` المستعملة فزر "copy" فـPress Kit كتخصها صفحة آمنة HTTPS أو localhost — ماشي `file://`). زر النسخ عندنا فيه fallback باش مايهبطش الموقع، لكن هادشي مثال على نوع المشاكل اللي كتبان غير فوضعية `file://`.

```bash
python3 -m http.server 8000
```
من بعد افتح `http://localhost:8000` — هادشي كيقلد بالضبط كيفاش غادي يخدم الموقع ملي يكون منشور، يعني أي حاجة خدامة زوين محليا بهاد الطريقة غادي تخدم زوين فالإنترنت. الأفضل: ديما تجرب بـhttp.server قبل ما تعتبر شي حاجة "نهائية".

## النشر (GitHub Pages) بلا Domain Name

ماخصكش domain باش تنشر الموقع. GitHub Pages كيعطيك رابط مجاني تلقائي: `https://IWXdev.github.io/اسم-الريبو/`

1. دير repository جديد فـGitHub (مثلا `iwx-studio`).
2. push كل ملفات الموقع ليه (كامل الهيكلة كيفما هي).
3. Settings → Pages → "Source" اختار branch `main` والمجلد `/ (root)` → Save.
4. بعد دقيقة ولا جوج، الموقع حي على `https://IWXdev.github.io/iwx-studio/`.

كل الروابط فالموقع relative (ماشي absolute) — غادي تخدم زوين حتى ولو الموقع ساكن تحت `/iwx-studio/`، بلا ما تبدل حتى حاجة. إلا بغيتي domain حقيقي مستقبلا، تزيدو فأي وقت من Settings → Pages → Custom domain بلا ما تبدل شي حاجة فالكود.

## قبل النشر

- بدل `https://your-domain.example/` بـ`https://IWXdev.github.io/iwx-studio/` فـ`robots.txt` و`sitemap.xml`.
- بدل placeholders السوداء (SVG) بـscreenshots حقيقية، وحافظ على نفس أسماء الملفات ولا بدلهم فـ`js/projects.js`.
- زيد روابط الفيديوهات (`youtubeId`) ملي تكون جاهزة.

## ملاحظة تقنية

الصفحات مبنية بأسلوب "shared header/footer" مكرر يدويا فكل ملف HTML (بلا build tool)، باش يبقى الموقع بسيط وقابل للفهم لمطور مبتدئ فالويب. هادشي كيعني: تبديل نص الهيدر أو الفوتر خاصك تديره فكل صفحة على حدة، أو تخبرني ونديرها مركزي دفعة وحدة.
