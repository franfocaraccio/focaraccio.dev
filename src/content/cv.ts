import type { Locale } from "@/lib/i18n";

/** Shared, language-agnostic profile data. */
export const profile = {
  name: "Francisco Focaraccio",
  email: "francisco.focaraccio@gmail.com",
  phone: "+54 (11) 6796-6435",
  linkedin: "https://www.linkedin.com/in/ffocaraccio",
  github: "https://github.com/franfocaraccio",
  site: "https://focaraccio.dev",
  photo: "/profile.jpg",
} as const;

export type SkillGroup = {
  /** Stable key used to look up the translated group label. */
  key: string;
  items: string[];
};

/** Tech stack is intentionally not translated — tool names are proper nouns. */
export const skillGroups: SkillGroup[] = [
  {
    key: "backend",
    items: [
      "C#",
      ".NET 10",
      ".NET 8",
      ".NET Core",
      "ASP.NET",
      "Web API",
      "Microservices",
      "Entity Framework",
      "WinForms",
      "RabbitMQ",
      "Azure Service Bus",
      "Git",
    ],
  },
  { key: "frontend", items: ["Angular", "TypeScript", "HTML5", "CSS3"] },
  { key: "databases", items: ["SQL Server", "PostgreSQL", "MongoDB", "Redis"] },
  {
    key: "cloudAzure",
    items: [
      "Key Vault",
      "SQL Instance",
      "App Service",
      "Entra ID",
      "ACR",
      "Virtual Machine",
      "Azure Function",
      "Container App",
      "App Insights",
      "API Management",
    ],
  },
  { key: "cloudAws", items: ["EC2", "RDS", "S3", "VPC", "SES", "IAM"] },
  {
    key: "ai",
    items: ["Claude Code", "OpenClaw", "GitHub Copilot", "Gemini", "Cursor"],
  },
  { key: "automation", items: ["n8n", "Make"] },
  {
    key: "devops",
    items: [
      "CI/CD",
      "Boards",
      "Artifacts",
      "Build/Release Pipelines",
      "Git Repos",
      "Docker",
    ],
  },
];

export type Project = {
  /** Matches the key used in each dictionary's `projects.items`. */
  key: string;
  name: string;
  repo: string;
  stack: string[];
};

/**
 * Hand-picked repositories, newest work first. Kept as a curated list rather
 * than pulled from the GitHub API: the copy here is written for a recruiter,
 * not derived from repo metadata.
 */
export const projects: Project[] = [
  {
    key: "erp",
    name: "ERP PyME",
    repo: "https://github.com/franfocaraccio/ERPSoftware",
    stack: [
      "TypeScript",
      "tRPC",
      "Drizzle ORM",
      "PostgreSQL",
      "React 19",
      "Turborepo",
    ],
  },
  {
    key: "brabusfit",
    name: "Brabus Fit",
    repo: "https://github.com/franfocaraccio/brabusfit",
    stack: ["Next.js", "React 19", "TypeScript", "Supabase", "Tailwind CSS"],
  },
  {
    key: "casakira",
    name: "Casa Kira",
    repo: "https://github.com/franfocaraccio/CasaKira",
    stack: ["Astro", "React", "Tailwind CSS"],
  },
];

export type Experience = {
  company: string;
  role: string;
  /** Rendered as-is; already localized. */
  period: string;
  bullets: string[];
  stack: string[];
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  note?: string;
};

export type Dictionary = {
  nav: {
    about: string;
    experience: string;
    projects: string;
    stack: string;
    education: string;
  };
  hero: {
    role: string;
    tagline: string;
    location: string;
    resumeCta: string;
    resumeHref: string;
    scrollHint: string;
  };
  sections: {
    about: string;
    experience: string;
    projects: string;
    stack: string;
    education: string;
    contact: string;
  };
  about: { paragraphs: string[]; yearsLabel: string };
  experience: { items: Experience[]; currentLabel: string };
  projects: {
    /** Keyed by `Project.key`. */
    descriptions: Record<string, string>;
    viewAll: string;
    repoLabel: string;
  };
  stack: { groups: Record<string, string> };
  education: {
    items: Education[];
    languagesTitle: string;
    languages: { name: string; level: string }[];
  };
  contact: { title: string; body: string; cta: string };
  footer: { builtWith: string; rights: string };
  a11y: {
    switchToDark: string;
    switchToLight: string;
    languageSwitch: string;
    openMenu: string;
    skipToContent: string;
  };
};

const en: Dictionary = {
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    stack: "Tech Stack",
    education: "Education",
  },
  hero: {
    role: "Backend Software Engineer",
    tagline:
      "I build APIs and microservices with distributed architectures on the cloud — mostly in .NET, for fintech and banking.",
    location: "Buenos Aires, Argentina",
    resumeCta: "Download CV",
    resumeHref: "/cv/Francisco-Focaraccio-CV-EN.pdf",
    scrollHint: "Scroll",
  },
  sections: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    stack: "Tech Stack",
    education: "Education",
    contact: "Get in touch",
  },
  about: {
    paragraphs: [
      "Backend engineer with 11+ years of experience building APIs and microservices with distributed architectures in cloud environments, across industries such as fintech, banking and IoT remote management.",
      "My strongest area is the .NET/C# ecosystem, with a focus on asynchronous messaging (RabbitMQ, Azure Service Bus) and on scalable, secure and maintainable solutions.",
      "I integrate AI tools into my workflow to speed up design and development without compromising code quality or control.",
    ],
    yearsLabel: "years of experience",
  },
  experience: {
    currentLabel: "Present",
    items: [
      {
        company: "Mobi724",
        role: ".NET Software Engineer",
        period: "Jan 2022 — Present",
        bullets: [
          "Develop and maintain .NET applications for banking integrations, points-based payment systems and loyalty programs, built on a microservices architecture with asynchronous messaging (RabbitMQ) on Azure.",
          "Built a payment processing microservice that receives and processes Visa card transactions in real time (Visa Offers Platform), using in-memory caching (Redis) to optimize response times.",
          "Manage SQL Server databases, Microsoft Azure services and Azure DevOps (CI/CD, Boards, Pull Requests).",
          "Integrate AI agents (Claude Code, GitHub Copilot, Cursor) into the development workflow, keeping human control and review over the generated code.",
        ],
        stack: [
          "C#",
          ".NET",
          "Microservices",
          "RabbitMQ",
          "Redis",
          "Azure",
          "SQL Server",
          "Azure DevOps",
        ],
      },
      {
        company: "Siblings Software",
        role: "Full Stack Software Engineer",
        period: "Jul 2021 — Jan 2022",
        bullets: [
          "Developed and maintained a system used by merchants to charge and invoice their customers, working on the backend (ASP.NET, .NET Core and .NET Framework), the frontend and the data layer with SQL Server.",
          "Contributed to the full migration of the frontend from AngularJS to Angular 12.",
        ],
        stack: [
          "ASP.NET",
          ".NET Core",
          "Angular 12",
          "AngularJS",
          "SQL Server",
        ],
      },
      {
        company: "Smartmation",
        role: ".NET Software Engineer",
        period: "Jun 2018 — Jul 2021",
        bullets: [
          "Developed the backend for the web application of an IoT platform for remote public street lighting management, used by customers to monitor, visualize and manage their streetlights on a map.",
          "Built a WinForms desktop application from scratch for the installation and pairing of streetlights in the field, integrated with MQTT brokers (Mosquitto) for communication with the IoT devices.",
          "Managed infrastructure on Azure and AWS, and containerized applications with Docker.",
        ],
        stack: ["C#", ".NET", "IoT", "MQTT", "WinForms", "Azure", "AWS", "Docker"],
      },
      {
        company: "FPA Software",
        role: ".NET Software Engineer",
        period: "Jan 2017 — Jun 2018",
        bullets: [
          "Developed and maintained .NET Framework desktop applications with WinForms for the financial sector, used by banks and brokerage firms to manage trading desks and back office operations, including the creation of installers for their distribution.",
        ],
        stack: ["C#", ".NET Framework", "WinForms", "SQL Server"],
      },
      {
        company: "Accenture",
        role: "Full Stack Software Engineer",
        period: "Dec 2014 — Jan 2017",
        bullets: [
          "Worked full stack on a financial and project management application used for cost tracking and invoicing, on the backend with C# and ASP.NET (MVC), on the frontend with AngularJS, jQuery, HTML5 and CSS3, and on the data layer with SQL Server.",
          "Applied Scrum methodology with task tracking in Jira and version control with Git.",
        ],
        stack: ["C#", "ASP.NET MVC", "AngularJS", "jQuery", "SQL Server", "Scrum"],
      },
    ],
  },
  projects: {
    descriptions: {
      erp: "Multi-tenant SaaS ERP for Argentine small businesses, with electronic invoicing wired straight into ARCA (formerly AFIP). Monorepo with end-to-end type safety, row-level tenant isolation in Postgres, and money handled as a value object rather than floats.",
      brabusfit:
        "Training app for coaches and their clients. Coaches build routines and share them by email; clients log weight and reps so progress stays visible to both. Mobile-first, because it is used mid-workout.",
      casakira:
        "Website redesign for an industrial sewing machine dealer in Buenos Aires. Static-first for SEO and speed, with React used only in the two interactive islands that actually need it.",
    },
    viewAll: "See all repositories",
    repoLabel: "View on GitHub",
  },
  stack: {
    groups: {
      backend: "Backend",
      frontend: "Frontend",
      databases: "Databases",
      cloudAzure: "Cloud — Azure",
      cloudAws: "Cloud — AWS",
      ai: "AI",
      automation: "Automation",
      devops: "DevOps",
    },
  },
  education: {
    items: [
      {
        degree: "Associate's Degree in Applied Computer Science",
        school: "Universidad Tecnológica Nacional (UTN)",
        period: "2009 — 2013",
      },
      {
        degree: "High School Diploma in Computer Science",
        school: "Instituto Parroquial San Roque",
        period: "2004 — 2008",
        note: "GPA: 8.24 / 10",
      },
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Upper Intermediate / B2" },
    ],
  },
  contact: {
    title: "Let's talk",
    body: "I'm open to backend and architecture roles. The fastest way to reach me is email — I read everything.",
    cta: "Send an email",
  },
  footer: {
    builtWith: "Built with Next.js and Tailwind CSS.",
    rights: "All rights reserved.",
  },
  a11y: {
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
    languageSwitch: "Change language",
    openMenu: "Open navigation menu",
    skipToContent: "Skip to content",
  },
};

const es: Dictionary = {
  nav: {
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    stack: "Tecnologías",
    education: "Formación",
  },
  hero: {
    role: "Ingeniero de Software Backend",
    tagline:
      "Construyo APIs y microservicios con arquitecturas distribuidas en la nube — principalmente en .NET, para fintech y banca.",
    location: "Buenos Aires, Argentina",
    resumeCta: "Descargar CV",
    resumeHref: "/cv/Francisco-Focaraccio-CV-ES.pdf",
    scrollHint: "Scroll",
  },
  sections: {
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    stack: "Tecnologías",
    education: "Formación",
    contact: "Contacto",
  },
  about: {
    paragraphs: [
      "Ingeniero en software backend con 11 años de experiencia construyendo APIs y microservicios con arquitecturas distribuidas en entornos cloud, en rubros como fintech, banca y telegestión de sistemas.",
      "Mi terreno más sólido es el ecosistema .NET/C#, con foco en mensajería asíncrona (RabbitMQ, Azure Service Bus) y en soluciones escalables, seguras y mantenibles.",
      "Incorporo herramientas de IA en mi flujo de trabajo para acelerar el diseño y el desarrollo sin resignar calidad ni control del código.",
    ],
    yearsLabel: "años de experiencia",
  },
  experience: {
    currentLabel: "Actualidad",
    items: [
      {
        company: "Mobi724",
        role: "Ingeniero de Software .NET",
        period: "Ene 2022 — Actualidad",
        bullets: [
          "Desarrollo y mantenimiento de aplicaciones en .NET para integraciones bancarias, sistemas de pago por puntos y programas de loyalty, mediante una arquitectura de microservicios con mensajería asíncrona (RabbitMQ) sobre Azure.",
          "Desarrollo de un microservicio de procesamiento de pagos que recibe y procesa en tiempo real transacciones de tarjetas Visa (Visa Offers Platform), utilizando caché en memoria (Redis) para optimizar tiempos de respuesta.",
          "Administración de bases de datos SQL Server, servicios de Microsoft Azure y Azure DevOps (CI/CD, Boards, Pull Requests).",
          "Incorporación de agentes de IA (Claude Code, GitHub Copilot, Cursor) al flujo de desarrollo, manteniendo control y revisión humana sobre el código generado.",
        ],
        stack: [
          "C#",
          ".NET",
          "Microservicios",
          "RabbitMQ",
          "Redis",
          "Azure",
          "SQL Server",
          "Azure DevOps",
        ],
      },
      {
        company: "Siblings Software",
        role: "Ingeniero de Software Full Stack",
        period: "Jul 2021 — Ene 2022",
        bullets: [
          "Desarrollo full stack de un sistema utilizado por comercios para el cobro y la facturación a sus clientes, trabajando en el backend (ASP.NET, .NET Core y .NET Framework), en el frontend y en la capa de datos con SQL Server.",
          "Participación en la migración completa del frontend de AngularJS a Angular 12.",
        ],
        stack: [
          "ASP.NET",
          ".NET Core",
          "Angular 12",
          "AngularJS",
          "SQL Server",
        ],
      },
      {
        company: "Smartmation",
        role: "Ingeniero de Software .NET",
        period: "Jun 2018 — Jul 2021",
        bullets: [
          "Desarrollo del backend de la aplicación web de una plataforma de telegestión de alumbrado público (IoT), utilizada por los usuarios para monitorear, visualizar y administrar sus luminarias sobre un mapa.",
          "Desarrollo desde cero de una aplicación de escritorio en WinForms para la instalación y el emparejamiento de luminarias en terreno, con integración a brokers MQTT (Mosquitto) para la comunicación con los dispositivos IoT.",
          "Gestión de la infraestructura en Azure y AWS, containerización con Docker.",
        ],
        stack: ["C#", ".NET", "IoT", "MQTT", "WinForms", "Azure", "AWS", "Docker"],
      },
      {
        company: "FPA Software",
        role: "Ingeniero de Software .NET",
        period: "Ene 2017 — Jun 2018",
        bullets: [
          "Desarrollo y mantenimiento de aplicaciones de escritorio en .NET Framework con WinForms para el sector financiero, utilizadas por entidades bancarias y sociedades de bolsa para la gestión de mesas de dinero y back office, incluyendo la creación de instaladores para su distribución.",
        ],
        stack: ["C#", ".NET Framework", "WinForms", "SQL Server"],
      },
      {
        company: "Accenture",
        role: "Ingeniero de Software Full Stack",
        period: "Dic 2014 — Ene 2017",
        bullets: [
          "Desarrollo full stack sobre una aplicación para la gestión financiera y de proyectos utilizada para seguimiento de costos y facturación, trabajando en el backend con C# y ASP.NET (MVC), en el frontend con AngularJS, jQuery, HTML5 y CSS3, y en la capa de datos con SQL Server.",
          "Utilización de metodología Scrum con seguimiento en Jira y control de versiones con Git.",
        ],
        stack: ["C#", "ASP.NET MVC", "AngularJS", "jQuery", "SQL Server", "Scrum"],
      },
    ],
  },
  projects: {
    descriptions: {
      erp: "ERP SaaS multi-tenant para PyMEs argentinas, con facturación electrónica integrada contra ARCA (ex AFIP). Monorepo con tipado de punta a punta, aislamiento por tenant a nivel de fila en Postgres y montos modelados como value object en vez de floats.",
      brabusfit:
        "App de entrenamiento para coaches y alumnos. Los coaches arman rutinas y las comparten por email; los alumnos registran peso y repeticiones para que el progreso quede a la vista de ambos. Mobile-first, porque se usa entrenando.",
      casakira:
        "Rediseño del sitio de un distribuidor de máquinas de coser industriales en Buenos Aires. Estático para SEO y velocidad, con React sólo en las dos islas interactivas que realmente lo necesitan.",
    },
    viewAll: "Ver todos los repositorios",
    repoLabel: "Ver en GitHub",
  },
  stack: {
    groups: {
      backend: "Backend",
      frontend: "Frontend",
      databases: "Bases de datos",
      cloudAzure: "Cloud — Azure",
      cloudAws: "Cloud — AWS",
      ai: "IA",
      automation: "Automatizaciones",
      devops: "DevOps",
    },
  },
  education: {
    items: [
      {
        degree: "Técnico superior en informática aplicada",
        school: "Universidad Tecnológica Nacional (UTN)",
        period: "2009 — 2013",
      },
      {
        degree: "Bachillerato en informática",
        school: "Instituto Parroquial San Roque",
        period: "2004 — 2008",
        note: "Promedio: 8,24 / 10",
      },
    ],
    languagesTitle: "Idiomas",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Upper Intermediate / B2" },
    ],
  },
  contact: {
    title: "Hablemos",
    body: "Estoy abierto a posiciones de backend y arquitectura. La vía más rápida es el mail — leo todo.",
    cta: "Enviar un mail",
  },
  footer: {
    builtWith: "Hecho con Next.js y Tailwind CSS.",
    rights: "Todos los derechos reservados.",
  },
  a11y: {
    switchToDark: "Cambiar a modo oscuro",
    switchToLight: "Cambiar a modo claro",
    languageSwitch: "Cambiar idioma",
    openMenu: "Abrir menú de navegación",
    skipToContent: "Ir al contenido",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
