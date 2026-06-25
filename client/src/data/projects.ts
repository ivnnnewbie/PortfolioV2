// ================= TYPES =================
export type Project = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
};

export type Booking = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
};

// ✅ Added Programming Languages category
export type TechCategory =
  | "Design"
  | "Code"
  | "Office";

export type TechItem = {
  title: string;
  description: string;
  logo: string;
  category: TechCategory;
};

export type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
};

// ================= PROJECTS =================
export const projects: Project[] = [
  {
    id: 1,
    title: "Photographer Portfolio Website",
    description:
      "A clean and elegant photography portfolio website designed to showcase creative works and services with a modern responsive layout.",
    thumbnail: "/projects/photographer-portfolio.png",
    liveUrl: "https://photographer-portfolio-jet-three.vercel.app",
    githubUrl: "https://github.com/rrlWakai/photographer-portfolio",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 2,
    title: "SmileCare Booking App",
    description:
      "A modern dental clinic website with responsive UI and structured consultation booking flow.",
    thumbnail: "/projects/smilecare.png",
    liveUrl: "https://smilecarebookingapp.vercel.app/",
    githubUrl: "https://github.com/rrlWakai/dental-appointment-app",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    id: 3,
    title: "Saling Cafe",
    description:
      "A warm and welcoming café website designed to showcase menu and brand story while working smoothly across devices.",
    thumbnail: "/projects/SalingCafe.png",
    liveUrl: "https://sailingcafe.vercel.app/",
    githubUrl: "https://github.com/rrlWakai/CoffeWebsite.git",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    id: 4,
    title: "Timeless Resort",
    description:
      "A luxury resort landing page with smooth animations and structured sections guiding users toward booking and inquiries.",
    thumbnail: "/projects/timelessresort.png",
    liveUrl: "https://timelessresort.vercel.app/",
    githubUrl: "https://github.com/rrlWakai/TimelessProject.git",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
  },
];

// ================= OPTIONAL BOOKING =================
export const booking: Booking[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio showcasing projects and skills.",
    thumbnail: "/projects/portfolio.png",
    liveUrl: "https://your-portfolio.vercel.app",
    githubUrl: "https://github.com/yourname/portfolio",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
];

// ================= TECH STACK =================
export const techStack: TechItem[] = [
  // -------- Design --------
  {
    title: "Canva",
    description: "Making quick marketing graphics and social media posts",
    logo: "/icons/Canva.png",
    category: "Design",
  },
  {
    title: "Affinity",
    description: "Creating crisp graphics, logos, and digital art.",
    logo: "/icons/Affinity.png",
    category: "Design",
  },
  {
    title: "Figma",
    description: "Designing user interfaces and interactive app previews.",
    logo: "/icons/Figma.png",
    category: "Design",
  },
  {
    title: "Adobe XD",
    description: "Planning and designing digital screen experiences.",
    logo: "/icons/AdobeXD.png",
    category: "Design",
  },

  // -------- Code --------
  {
    title: "VS Code",
    description: "Writing clean code for websites and web apps.",
    logo: "/icons/VScode.png",
    category: "Code",
  },
  {
    title: "Android Studio",
    description: "Building and testing mobile apps for Android.",
    logo: "/icons/androidstudio.png",
    category: "Code",
  },
  {
    title: "HTML",
    description: "Semantic structure for accessible layouts.",
    logo: "/icons/html.png",
    category: "Code",
  },
  {
    title: "CSS",
    description: "Styling and layout for web pages.",
    logo: "/icons/css-3.png",
    category: "Code",
  },
  {
    title: "Git",
    description: "Version control system.",
    logo: "/icons/socials.png",
    category: "Code",
  },
  {
    title: "GitHub",
    description: "Code hosting and collaboration platform.",
    logo: "/icons/github.png",
    category: "Code",
  },
  {
    title: "MySQL",
    description: "Storing and organizing website data safely.",
    logo: "/icons/mysql.png",
    category: "Code",
  },

  // -------- Office --------
  {
    title: "Google Docs",
    description: "Writing and sharing project notes and text content",
    logo: "/icons/Googledocs.png",
    category: "Office",
  },
  {
    title: "Google Sheets",
    description: "Organizing project data and website lists.",
    logo: "/icons/GoogleSheets.png",
    category: "Office",
  },
  {
    title: "Google Sites",
    description: "Setting up quick web pages for internal feedback.",
    logo: "/icons/GoogleSites.png",
    category: "Office",
  },
  {
    title: "MS Word",
    description: "Writing formal project proposals and documents.",
    logo: "/icons/MSword.png",
    category: "Office",
  },
];

// ================= CERTIFICATES =================
export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Certificate of Appearance in CHED RAISE 2026",
    issuer: "Commission on Higher Education",
    date: "2026",
    image: "/certificates/ched.png",
  },
  {
    id: 2,
    title: "Certificate of Participation in CHED RAISE 2026",
    issuer: "Commission on Higher Education",
    date: "2026",
    image: "/certificates/ched2.png",
  },
  {
    id: 3,
    title: "Statement of Achievement",
    issuer: "Cisco Networking Academy",
    date: "2026",
    image: "/certificates/cisco.png",
  },
  {
    id: 4,
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    date: "2026",
    image: "/certificates/cisco1.png",
  },
  {
    id: 5,
    title: "Introduction to AI",
    issuer: "IBM SkillsBuild",
    date: "2026",
    image: "/certificates/IBM2.png",
  },
  {
    id: 6,
    title: "AI Forms and Functions",
    issuer: "IBM SkillsBuild",
    date: "2026",
    image: "/certificates/IBM3.png",
  },
  {
    id: 7,
    title: "Machine Learning",
    issuer: "IBM SkillsBuild",
    date: "2026",
    image: "/certificates/IBM4.png",
  },
  {
    id: 8,
    title: "Neural Networks and Deep Learning",
    issuer: "IBM SkillsBuild",
    date: "2026",
    image: "/certificates/IBM5.png",
  },
  {
    id: 9,
    title: "Intelligence Behind AI",
    issuer: "IBM SkillsBuild",
    date: "2026",
    image: "/certificates/IBM6.png",
  },
  {
    id: 10,
    title: "Certificate of Participation",
    issuer: "University of Antique-TLMC",
    date: "2026",
    image: "/certificates/ua2.png",
  },
  {
    id: 11,
    title: "Certificate of Recognition in Editorial Writing",
    issuer: "The SeaBreeze Publication",
    date: "2023",
    image: "/certificates/ua1.png",
  },
];
