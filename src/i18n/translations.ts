export type Lang = "en" | "ua"

export const translations = {
  en: {
    nav: {
      about: "ABOUT",
      works: "WORKS",
      contact: "CONTACT",
      downloadCv: "DOWNLOAD CV",
    },
    hero: {
      role: "UI/UX DESIGNER",
      location: "BASED IN RIGA",
      morphingTexts: ["PORTFOLIO WEBSITE", "ILLIA SKORYKH"],
    },
    about: {
      label: "ABOUT ME",
      statement: "My journey in UX/UI design started with HTML and CSS. I became curious about layouts, leading me to UX/UI design. Layout design experience helps me create thoughtful interfaces. Experience in content and front-end grounds my sense for layout, user flows, and visual detail.",
      col0Label: "[WHAT AM I INTERESTED]",
      col0Text: "I am always learning and experimenting with new programs. I enjoy challenging design problems — if you have an interesting project, reach out — we can bring your idea to life!",
      col1Label: "[WHAT I WORKED WITH]",
      col1Text: "In 2 years, I have worked on a variety of projects: landing pages, corporate websites, online stores, and e-commerce stores with UX research. I know how to create pleasant animated interfaces. I competed in design contests on 99designs and DesignCrowd, winning 4+ client projects. At Gazer in Kyiv, I retouched product photos and optimized visual assets.",
      col2Label: "[WHERE I WORKED]",
      jobs: [
        { period: "2025–NOW", role: "Freelance" },
        { period: "2024–2025", role: "Designer in Gazer" },
      ],
    },
    skills: {
      label: "SKILLS",
      items: [
        { name: "HTML/CSS",      label: "CODE",   subs: ["SEMANTIC MARKUP", "CSS ANIMATIONS", "FLEXBOX & GRID", "RESPONSIVE DESIGN"] },
        { name: "JAVASCRIPT",    label: "CODE",   subs: ["DOM MANIPULATION", "API INTEGRATION", "WEB ANIMATIONS", "ASYNC & FETCH"] },
        { name: "GITHUB",        label: "CODE",   subs: ["VERSION CONTROL", "GIT WORKFLOWS", "PULL REQUESTS", "REPO MANAGEMENT"] },
        { name: "FIGMA",         label: "DESIGN", subs: ["UI DESIGN", "PROTOTYPING", "AUTO LAYOUT", "COMPONENT SYSTEMS"] },
        { name: "WEBFLOW",       label: "DESIGN", subs: ["NO-CODE BUILDS", "CMS COLLECTIONS", "INTERACTIONS", "RESPONSIVE LAYOUTS"] },
        { name: "AFTER EFFECTS", label: "MOTION", subs: ["INTERFACE ANIMATIONS", "LOTTIE EXPORTS", "LOGO ANIMATIONS", "MOTION GRAPHICS"] },
        { name: "PHOTOSHOP",     label: "DESIGN", subs: ["PHOTO RETOUCHING", "COMPOSITING", "DIGITAL ILLUSTRATION", "TEXTURE DESIGN"] },
        { name: "PREMIERE PRO",  label: "MOTION", subs: ["VIDEO EDITING", "COLOR GRADING", "MOTION TITLES", "SOCIAL CONTENT"] },
        { name: "AI TOOLS",      label: "AI",     subs: ["NANOBANANA", "CLAUDE CODE", "LOVABLE"] },
      ],
    },
    works: {
      label: "WORKS",
      overview: "Overview",
      projectInfo: "Project Info",
      year: "Year",
      instruments: "Instruments",
      personalSkills: "Personal Skills",
      projectTitles: [
        ["NASCAR", "MARKETPLACE"],
        ["GUARDIAN", "GROUP"],
        ["DENTURO", "LOGISTE"],
      ],
      projectOverviews: [
        "A two-page marketplace for NASCAR diecast collectibles — a catalog landing page and a dedicated product detail page. Includes scroll-triggered animations throughout: staggered card entrances, parallax hero, and animated transitions between pages. Built for collectors with a focus on high-impact visual presentation and smooth interactive experience.",
        "A corporate website for Guardian Group Defense Services featuring a fully animated hero section — layered motion, entrance reveals, and a dynamic background that sets an authoritative tone on arrival. Includes a contact form with an animated submit button and smooth field transitions. Clean, tactical design built for enterprise trust.",
        "Animation-first website for a certified denturologiste clinic. Every section is choreographed: hero text reveals, scroll-triggered entrance animations on all elements, smooth section transitions, and subtle motion on hover states. Bilingual French/English content delivered through a warm, clinical visual language that builds patient trust and guides seamlessly to booking.",
      ],
    },
    workflow: {
      label: "WORKFLOW",
      steps: [
        {
          title: "BRIEF",
          subs: ["CLIENT INTERVIEW", "PROJECT SCOPE", "GOALS & KPIs", "TIMELINE PLANNING"],
          description: "I start every project by understanding your goals, audience, and constraints. Clear briefs lead to focused, intentional design decisions from day one.",
        },
        {
          title: "RESEARCH",
          subs: ["COMPETITOR ANALYSIS", "INFORMATION ARCHITECTURE", "JOBS TO BE DONE", "CUSTOMER JOURNEY MAP"],
          description: "I analyze the business, target audience, and competitors, formulate hypotheses and key messages. Have experience in product involving 300+ screens.",
        },
        {
          title: "PROTOTYPING",
          subs: ["WIREFRAMING", "USER FLOWS", "INTERACTIVE MOCKUPS", "USABILITY TESTING"],
          description: "Low and high-fidelity prototypes that validate ideas early, reduce revisions, and align stakeholders before committing to final visual design.",
        },
        {
          title: "VISUAL DESIGN",
          subs: ["UI COMPONENTS", "TYPOGRAPHY & COLOR", "ANIMATION & MOTION", "DESIGN SYSTEMS"],
          description: "Pixel-perfect visual design rooted in brand identity. Every detail — spacing, hierarchy, motion — is considered and intentional.",
        },
        {
          title: "DEVELOPMENT",
          subs: ["HTML / CSS / JS", "WEBFLOW BUILDS", "HANDOFF & SPECS", "RESPONSIVE TESTING"],
          description: "From design to working product. I bridge the gap between design and code, delivering clean, responsive implementations ready to ship.",
        },
      ],
    },
    contact: {
      line1: "Let's work together.",
      line2: "Reach out anytime.",
      email: "EMAIL",
      phone: "PHONE",
    },
  },

  ua: {
    nav: {
      about: "ПРО МЕНЕ",
      works: "РОБОТИ",
      contact: "КОНТАКТ",
      downloadCv: "ЗАВАНТАЖИТИ CV",
    },
    hero: {
      role: "UX/UI ДИЗАЙНЕР",
      location: "ЗНАХОЖУСЬ У РИЗІ",
      morphingTexts: ["САЙТ ПОРТФОЛІО", "ІЛЛЯ СКОРИХ"],
    },
    about: {
      label: "ПРО МЕНЕ",
      statement: "Мій шлях у UX/UI дизайні розпочався з HTML та CSS. Цікавість до макетів привела мене до UX/UI дизайну. Досвід у верстці допомагає створювати продумані інтерфейси. Досвід у контенті та фронтенді формує відчуття макету, користувацьких сценаріїв і візуальних деталей.",
      col0Label: "[ЧИМ Я ЦІКАВЛЮСЬ]",
      col0Text: "Я постійно навчаюсь і експериментую з новими програмами. Мені подобаються складні дизайн-задачі — якщо маєте цікавий проєкт, напишіть — разом втілимо вашу ідею в життя!",
      col1Label: "[З ЧИМ Я ПРАЦЮВАВ]",
      col1Text: "За 2 роки я попрацював над різними проєктами: лендинги, корпоративні сайти, інтернет-магазини та e-commerce з UX-дослідженнями. Вмію створювати приємні анімовані інтерфейси. Брав участь у конкурсах на 99designs і DesignCrowd, здобувши 4+ проєкти. У компанії Gazer у Києві ретушував фото продуктів та оптимізував візуальні матеріали.",
      col2Label: "[ДЕ Я ПРАЦЮВАВ]",
      jobs: [
        { period: "2025–ЗАРАЗ", role: "Фріланс" },
        { period: "2024–2025", role: "Дизайнер у Gazer" },
      ],
    },
    skills: {
      label: "НАВИЧКИ",
      items: [
        { name: "HTML/CSS",      label: "КОД",    subs: ["СЕМАНТИЧНА РОЗМІТКА", "CSS АНІМАЦІЇ", "FLEXBOX ТА GRID", "АДАПТИВНИЙ ДИЗАЙН"] },
        { name: "JAVASCRIPT",    label: "КОД",    subs: ["DOM МАНІПУЛЯЦІЇ", "ІНТЕГРАЦІЯ API", "WEB АНІМАЦІЇ", "ASYNC ТА FETCH"] },
        { name: "GITHUB",        label: "КОД",    subs: ["КОНТРОЛЬ ВЕРСІЙ", "GIT ПРОЦЕСИ", "PULL REQUESTS", "УПРАВЛІННЯ РЕПО"] },
        { name: "FIGMA",         label: "ДИЗАЙН", subs: ["UI ДИЗАЙН", "ПРОТОТИПУВАННЯ", "AUTO LAYOUT", "КОМПОНЕНТНІ СИСТЕМИ"] },
        { name: "WEBFLOW",       label: "ДИЗАЙН", subs: ["NO-CODE ЗБІРКИ", "CMS КОЛЕКЦІЇ", "ІНТЕРАКТИВНІСТЬ", "АДАПТИВНІ МАКЕТИ"] },
        { name: "AFTER EFFECTS", label: "МОУШН",  subs: ["АНІМАЦІЇ ІНТЕРФЕЙСУ", "LOTTIE ЕКСПОРТИ", "АНІМАЦІЇ ЛОГОТИПІВ", "МОУШН ГРАФІКА"] },
        { name: "PHOTOSHOP",     label: "ДИЗАЙН", subs: ["РЕТУШ ФОТО", "КОМПОЗИТИНГ", "ЦИФРОВА ІЛЮСТРАЦІЯ", "ДИЗАЙН ТЕКСТУР"] },
        { name: "PREMIERE PRO",  label: "МОУШН",  subs: ["ВІДЕОМОНТАЖ", "КОЛЬОРОКОРЕКЦІЯ", "МОУШН ТИТРИ", "КОНТЕНТ ДЛЯ СОЦМЕРЕЖ"] },
        { name: "AI ІНСТРУМЕНТИ", label: "AI",    subs: ["NANOBANANA", "CLAUDE CODE", "LOVABLE"] },
      ],
    },
    works: {
      label: "РОБОТИ",
      overview: "Огляд",
      projectInfo: "Про проєкт",
      year: "Рік",
      instruments: "Інструменти",
      personalSkills: "Навички",
      projectTitles: [
        ["NASCAR", "МАРКЕТПЛЕЙС"],
        ["GUARDIAN", "GROUP"],
        ["DENTURO", "LOGISTE"],
      ],
      projectOverviews: [
        "Двосторінковий маркетплейс для колекційних масштабних моделей NASCAR — сторінка каталогу та сторінка деталей продукту. Включає анімації при прокрутці: поступова поява карток, паралакс героя та анімовані переходи між сторінками. Розроблено для колекціонерів з акцентом на яскраве візуальне подання та плавну інтерактивність.",
        "Корпоративний сайт для Guardian Group Defense Services з повністю анімованим головним блоком — нашарована анімація, плавна поява елементів і динамічне тло, що створює авторитетне враження з першої секунди. Містить форму зворотного зв'язку з анімованою кнопкою та плавними переходами полів. Чистий, тактичний дизайн для корпоративної довіри.",
        "Сайт з акцентом на анімацію для сертифікованої клініки зубних протезистів. Кожна секція хореографована: появи тексту в герої, анімації при прокрутці, плавні переходи між секціями та hover-ефекти. Двомовний контент (французька/англійська) у теплій клінічній візуальній мові, що будує довіру пацієнтів і спрямовує до запису.",
      ],
    },
    workflow: {
      label: "ПРОЦЕС РОБОТИ",
      steps: [
        {
          title: "БРИФ",
          subs: ["ІНТЕРВ'Ю З КЛІЄНТОМ", "ОБСЯГ ПРОЄКТУ", "ЦІЛІ ТА KPIs", "ПЛАНУВАННЯ СТРОКІВ"],
          description: "Кожен проєкт починається з розуміння ваших цілей, аудиторії та обмежень. Чіткий бриф веде до сфокусованих та обдуманих рішень з першого дня.",
        },
        {
          title: "ДОСЛІДЖЕННЯ",
          subs: ["АНАЛІЗ КОНКУРЕНТІВ", "ІНФОРМАЦІЙНА АРХІТЕКТУРА", "JOBS TO BE DONE", "CUSTOMER JOURNEY MAP"],
          description: "Аналізую бізнес, цільову аудиторію та конкурентів, формулюю гіпотези та ключові меседжі. Маю досвід роботи над продуктами з 300+ екранами.",
        },
        {
          title: "ПРОТОТИПУВАННЯ",
          subs: ["ВАЙРФРЕЙМІНГ", "USER FLOWS", "ІНТЕРАКТИВНІ МАКЕТИ", "ТЕСТУВАННЯ ЗРУЧНОСТІ"],
          description: "Прототипи низької та високої точності підтверджують ідеї на ранньому етапі, зменшують кількість правок та узгоджують стейкхолдерів до фінального дизайну.",
        },
        {
          title: "ВІЗУАЛЬНИЙ ДИЗАЙН",
          subs: ["UI КОМПОНЕНТИ", "ТИПОГРАФІКА ТА КОЛІР", "АНІМАЦІЯ ТА РУХ", "ДИЗАЙН-СИСТЕМИ"],
          description: "Піксель-ідеальний візуальний дизайн на основі бренд-ідентичності. Кожна деталь — відступи, ієрархія, рух — продумана та навмисна.",
        },
        {
          title: "РОЗРОБКА",
          subs: ["HTML / CSS / JS", "WEBFLOW ЗБІРКИ", "HANDOFF ТА СПЕЦИФІКАЦІЇ", "ТЕСТУВАННЯ АДАПТИВНОСТІ"],
          description: "Від дизайну до працюючого продукту. З'єдную дизайн і код, доставляючи чисті адаптивні рішення, готові до запуску.",
        },
      ],
    },
    contact: {
      line1: "Давайте працювати разом.",
      line2: "Пишіть будь-коли.",
      email: "ПОШТА",
      phone: "ТЕЛЕФОН",
    },
  },
}

export type Translations = typeof translations.en
