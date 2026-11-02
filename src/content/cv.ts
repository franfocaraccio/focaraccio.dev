import type { Locale } from "@/lib/i18n";

/** Shared, language-agnostic profile data. */
export const profile = {
  name: "Francisco Focaraccio",
  email: "francisco.focaraccio@gmail.com",
  phone: "+54 (11) 6796-6435",
  linkedin: "https://www.linkedin.com/in/ffocaraccio",
  github: "https://github.com/franfocaraccio",
  site: "https://focaraccio.dev",
  /** Google Calendar appointment page for booking a call. */
  booking: "https://calendar.app.google/ZZLYgx5BXjMepGpr8",
  photo: "/avatar.webp",
} as const;

export type SkillGroup = {
  /** Stable key used to look up the translated group label. */
  key: string;
  items: string[];
};

/**
 * Tool names are proper nouns and stay as-is; concepts are translated through
 * each dictionary's `stack.items`.
 */
export const skillGroups: SkillGroup[] = [
  {
    key: "backend",
    items: [
      "C#",
      ".NET 10",
      ".NET 8",
      ".NET Core",
      "ASP.NET Core",
      "Web API",
      "REST APIs",
      "JWT",
      "Entity Framework",
      "RabbitMQ",
    ],
  },
  {
    key: "architecture",
    items: [
      "Microservices",
      "Event-Driven Architecture",
      "Distributed Systems",
      "Software Architecture",
    ],
  },
  {
    key: "frontend",
    items: ["JavaScript", "TypeScript", "Angular", "React", "HTML5", "CSS3"],
  },
  { key: "databases", items: ["SQL Server", "PostgreSQL", "MongoDB", "Redis"] },
  {
    key: "ai",
    items: [
      "LLM Integration",
      "AI Agents",
      "Prompt Engineering",
      "Claude Code",
      "GitHub Copilot",
    ],
  },
  { key: "automation", items: ["n8n", "Make"] },
  {
    key: "cloudAzure",
    items: [
      "App Service",
      "Azure Functions",
      "Azure SQL Database",
      "Container Apps",
      "Container Registry",
      "Virtual Machines",
      "API Management",
      "Key Vault",
      "Application Insights",
    ],
  },
  { key: "cloudAws", items: ["EC2", "RDS", "S3", "VPC", "SES", "IAM"] },
  { key: "devops", items: ["Azure DevOps", "CI/CD", "Docker", "Git"] },
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
    home: string;
    about: string;
    experience: string;
    projects: string;
    stack: string;
    education: string;
    contact: string;
  };
  hero: {
    role: string;
    tagline: string;
    location: string;
    greeting: string;
    resumeCta: string;
    /** Null when no CV exists for that language. */
    resumeHref: string | null;
    secondaryCta: string;
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
  stack: {
    groups: Record<string, string>;
    /** Translations for skill items that are concepts, keyed by the English item. */
    items: Record<string, string>;
  };
  education: {
    items: Education[];
    languagesTitle: string;
    languages: { name: string; level: string }[];
  };
  contact: {
    title: string;
    body: string;
    cta: string;
    bookCall: string;
  };
  footer: { rights: string };
  a11y: {
    switchToDark: string;
    switchToLight: string;
    languageSwitch: string;
    openMenu: string;
    closeMenu: string;
    /** Accessible name of the navigation landmark itself. */
    mainNav: string;
    skipToContent: string;
  };
};

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    stack: "Tech Stack",
    education: "Education",
    contact: "Contact",
  },
  hero: {
    role: "Software Engineer",
    tagline:
      "Building software products end to end and designing the systems behind them.",
    location: "Buenos Aires, Argentina",
    greeting: "Hello,",
    resumeCta: "Download CV",
    resumeHref: "/cv/Francisco-Focaraccio-CV-EN.pdf",
    secondaryCta: "Know me better",
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
      "I'm a senior software engineer with 12 years of experience building software products end to end, from backend to frontend, across fintech, banking and IoT.",
      "My strongest area is the backend with .NET/C#: microservices, event-driven architectures and cloud infrastructure on Azure and AWS. On the frontend I work with TypeScript, Angular and React.",
      "I use AI coding agents across the development lifecycle, from code generation and refactoring to code review, and I integrate LLMs into the products I build.",
    ],
    yearsLabel: "years of experience",
  },
  experience: {
    currentLabel: "Present",
    items: [
      {
        company: "Mobi724",
        role: "Senior Software Engineer",
        period: "Jan 2022 — Present",
        bullets: [
          "Built a real-time payment processing service that receives and processes Visa card transactions.",
          "Develop .NET microservices for banking integrations, points-based payment systems and loyalty programs, using event-driven architecture with RabbitMQ on Azure.",
          "Manage SQL Server databases, Azure services (App Services, Azure Functions, Container Apps, Key Vault, API Management) and CI/CD pipelines in Azure DevOps.",
          "Integrated AI coding agents (Claude Code, GitHub Copilot) into the development workflow for code generation, refactoring, debugging and code review, with human validation on every change.",
          "Integrated LLMs into .NET applications: prompt engineering, tool/function calling, structured outputs and agent-based workflows.",
        ],
        stack: [
          "C#",
          ".NET",
          "Microservices",
          "Event-Driven",
          "RabbitMQ",
          "Azure",
          "SQL Server",
          "Azure DevOps",
        ],
      },
      {
        company: "Siblings Software",
        role: "Senior Full Stack Software Engineer",
        period: "Jul 2021 — Jan 2022",
        bullets: [
          "Developed and maintained the backend (.NET Core, ASP.NET) and frontend (TypeScript, React) of a web application merchants use to process customer payments and manage invoicing.",
          "Built and maintained REST APIs with ASP.NET and .NET Core on top of SQL Server and PostgreSQL.",
          "Contributed to the full migration of the frontend from AngularJS to Angular 12.",
        ],
        stack: [
          ".NET Core",
          "ASP.NET",
          "TypeScript",
          "React",
          "Angular 12",
          "SQL Server",
          "PostgreSQL",
        ],
      },
      {
        company: "Smartmation",
        role: "Full Stack Software Engineer",
        period: "Jun 2018 — Jul 2021",
        bullets: [
          "Built the backend (.NET, C#) and frontend (TypeScript, Angular) of an IoT platform for remote street lighting management, letting customers monitor, visualize and control public streetlights through an interactive map.",
          "Built a WinForms desktop application from scratch for the field installation and pairing of streetlights, communicating with IoT devices through MQTT (Mosquitto).",
          "Managed cloud infrastructure on Azure and AWS and containerized applications with Docker.",
        ],
        stack: [
          "C#",
          ".NET",
          "TypeScript",
          "Angular",
          "IoT",
          "MQTT",
          "Azure",
          "AWS",
          "Docker",
        ],
      },
      {
        company: "FPA Software",
        role: "Software Engineer",
        period: "Jan 2017 — Jun 2018",
        bullets: [
          "Developed and maintained .NET desktop applications (WinForms) used by banks and brokerage firms to run trading desks and back-office operations.",
          "Built the installers used to package and distribute the applications to clients.",
        ],
        stack: ["C#", ".NET", "WinForms", "SQL Server"],
      },
      {
        company: "Accenture",
        role: "Full Stack Software Engineer",
        period: "Dec 2014 — Jan 2017",
        bullets: [
          "Worked on a financial and project management application for cost tracking and invoicing: backend in C# and ASP.NET MVC, frontend in AngularJS, data layer in SQL Server.",
          "Worked in Scrum teams, tracking work in Jira and using Git for version control.",
        ],
        stack: ["C#", "ASP.NET MVC", "AngularJS", "SQL Server", "Scrum"],
      },
    ],
  },
  projects: {
    descriptions: {
      erp: "Multi-tenant SaaS ERP for Argentine small businesses, with electronic invoicing wired straight into ARCA (formerly AFIP). Monorepo with end-to-end type safety, row-level tenant isolation in Postgres, and money handled as a value object rather than floats.",
      brabusfit:
        "Training app for coaches and their clients. Coaches build routines and share them by email; clients log weight and reps so progress stays visible to both. Mobile-first, because it is used mid-workout.",
    },
    viewAll: "See all repositories",
    repoLabel: "View on GitHub",
  },
  stack: {
    groups: {
      backend: "Backend",
      architecture: "Architecture",
      frontend: "Frontend",
      databases: "Databases",
      ai: "AI / GenAI",
      automation: "Automation",
      cloudAzure: "Microsoft Azure",
      cloudAws: "AWS",
      devops: "DevOps",
    },
    items: {},
  },
  education: {
    items: [
      {
        degree: "Associate's Degree in Applied Computer Science",
        school: "Universidad Tecnológica Nacional (UTN)",
        period: "2009 — 2013",
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
    body: "Book a call in my calendar, or send me an email.",
    cta: "Send an email",
    bookCall: "Book a call",
  },
  footer: {
    rights: "All rights reserved.",
  },
  a11y: {
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
    languageSwitch: "Change language",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    mainNav: "Main navigation",
    skipToContent: "Skip to content",
  },
};

const es: Dictionary = {
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    stack: "Tecnologías",
    education: "Formación",
    contact: "Contacto",
  },
  hero: {
    role: "Ingeniero de Software",
    tagline:
      "Construyendo productos de software de punta a punta y diseñando los sistemas que los sostienen.",
    location: "Buenos Aires, Argentina",
    greeting: "Hola,",
    resumeCta: "Descargar CV",
    resumeHref: "/cv/Francisco-Focaraccio-CV-ES.pdf",
    secondaryCta: "Conocerme mejor",
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
      "Soy ingeniero de software senior con 12 años de experiencia construyendo productos de software de punta a punta, del backend al frontend, en fintech, banca e IoT.",
      "Mi terreno más sólido es el backend con .NET/C#: microservicios, arquitecturas orientadas a eventos e infraestructura cloud en Azure y AWS. En el frontend trabajo con TypeScript, Angular y React.",
      "Uso agentes de IA a lo largo del ciclo de desarrollo, desde generación y refactorización de código hasta code review, e integro LLMs en los productos que desarrollo.",
    ],
    yearsLabel: "años de experiencia",
  },
  experience: {
    currentLabel: "Actualidad",
    items: [
      {
        company: "Mobi724",
        role: "Ingeniero de Software Senior",
        period: "Ene 2022 — Actualidad",
        bullets: [
          "Desarrollo de un servicio de procesamiento de pagos en tiempo real, que recibe y procesa transacciones de tarjetas Visa.",
          "Desarrollo de microservicios .NET para integraciones bancarias, sistemas de pago por puntos y programas de loyalty, con arquitectura orientada a eventos sobre RabbitMQ en Azure.",
          "Administración de bases de datos SQL Server, servicios de Azure (App Services, Azure Functions, Container Apps, Key Vault, API Management) y pipelines de CI/CD en Azure DevOps.",
          "Incorporación de agentes de IA (Claude Code, GitHub Copilot) al flujo de desarrollo para generación, refactorización, debugging y code review, con validación humana en cada cambio.",
          "Integración de LLMs en aplicaciones .NET: prompt engineering, tool/function calling, structured outputs y workflows basados en agentes.",
        ],
        stack: [
          "C#",
          ".NET",
          "Microservicios",
          "Event-Driven",
          "RabbitMQ",
          "Azure",
          "SQL Server",
          "Azure DevOps",
        ],
      },
      {
        company: "Siblings Software",
        role: "Ingeniero de Software Full Stack Senior",
        period: "Jul 2021 — Ene 2022",
        bullets: [
          "Desarrollo y mantenimiento del backend (.NET Core, ASP.NET) y el frontend (TypeScript, React) de una aplicación web que los comercios usan para cobrar a sus clientes y gestionar la facturación.",
          "Desarrollo y mantenimiento de APIs REST con ASP.NET y .NET Core sobre SQL Server y PostgreSQL.",
          "Participación en la migración completa del frontend de AngularJS a Angular 12.",
        ],
        stack: [
          ".NET Core",
          "ASP.NET",
          "TypeScript",
          "React",
          "Angular 12",
          "SQL Server",
          "PostgreSQL",
        ],
      },
      {
        company: "Smartmation",
        role: "Ingeniero de Software Full Stack",
        period: "Jun 2018 — Jul 2021",
        bullets: [
          "Desarrollo del backend (.NET, C#) y el frontend (TypeScript, Angular) de una plataforma IoT de telegestión de alumbrado público, que permite a los usuarios monitorear, visualizar y controlar las luminarias sobre un mapa interactivo.",
          "Desarrollo desde cero de una aplicación de escritorio en WinForms para la instalación y el emparejamiento de luminarias en terreno, comunicándose con los dispositivos IoT mediante MQTT (Mosquitto).",
          "Gestión de la infraestructura cloud en Azure y AWS, y containerización de aplicaciones con Docker.",
        ],
        stack: [
          "C#",
          ".NET",
          "TypeScript",
          "Angular",
          "IoT",
          "MQTT",
          "Azure",
          "AWS",
          "Docker",
        ],
      },
      {
        company: "FPA Software",
        role: "Ingeniero de Software",
        period: "Ene 2017 — Jun 2018",
        bullets: [
          "Desarrollo y mantenimiento de aplicaciones de escritorio .NET (WinForms) utilizadas por bancos y sociedades de bolsa para operar mesas de dinero y back office.",
          "Desarrollo de los instaladores usados para empaquetar y distribuir las aplicaciones a los clientes.",
        ],
        stack: ["C#", ".NET", "WinForms", "SQL Server"],
      },
      {
        company: "Accenture",
        role: "Ingeniero de Software Full Stack",
        period: "Dic 2014 — Ene 2017",
        bullets: [
          "Desarrollo sobre una aplicación de gestión financiera y de proyectos para seguimiento de costos y facturación: backend en C# y ASP.NET MVC, frontend en AngularJS, capa de datos en SQL Server.",
          "Trabajo en equipos Scrum, con seguimiento en Jira y control de versiones con Git.",
        ],
        stack: ["C#", "ASP.NET MVC", "AngularJS", "SQL Server", "Scrum"],
      },
    ],
  },
  projects: {
    descriptions: {
      erp: "ERP SaaS multi-tenant para PyMEs argentinas, con facturación electrónica integrada contra ARCA (ex AFIP). Monorepo con tipado de punta a punta, aislamiento por tenant a nivel de fila en Postgres y montos modelados como value object en vez de floats.",
      brabusfit:
        "App de entrenamiento para coaches y alumnos. Los coaches arman rutinas y las comparten por email; los alumnos registran peso y repeticiones para que el progreso quede a la vista de ambos. Mobile-first, porque se usa entrenando.",
    },
    viewAll: "Ver todos los repositorios",
    repoLabel: "Ver en GitHub",
  },
  stack: {
    groups: {
      backend: "Backend",
      architecture: "Arquitectura",
      frontend: "Frontend",
      databases: "Bases de datos",
      ai: "IA / GenAI",
      automation: "Automatización",
      cloudAzure: "Microsoft Azure",
      cloudAws: "AWS",
      devops: "DevOps",
    },
    items: {
      Microservices: "Microservicios",
      "Event-Driven Architecture": "Arquitectura orientada a eventos",
      "Distributed Systems": "Sistemas distribuidos",
      "Software Architecture": "Arquitectura de software",
      "LLM Integration": "Integración de LLMs",
      "AI Agents": "Agentes de IA",
    },
  },
  education: {
    items: [
      {
        degree: "Técnico superior en informática aplicada",
        school: "Universidad Tecnológica Nacional (UTN)",
        period: "2009 — 2013",
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
    body: "Agendá una llamada en mi calendario, o escribime un mail.",
    cta: "Enviar un mail",
    bookCall: "Agendar una llamada",
  },
  footer: {
    rights: "Todos los derechos reservados.",
  },
  a11y: {
    switchToDark: "Cambiar a modo oscuro",
    switchToLight: "Cambiar a modo claro",
    languageSwitch: "Cambiar idioma",
    openMenu: "Abrir menú de navegación",
    closeMenu: "Cerrar menú de navegación",
    mainNav: "Navegación principal",
    skipToContent: "Ir al contenido",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
