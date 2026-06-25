import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Eye, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";

import { projects, certificates, techStack } from "../data/projects";
import type { Project, Certificate } from "../data/projects";

type FilterType = "projects" | "certificates" | "tech";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

const cardBase = `
  relative overflow-hidden rounded-xl
  border border-black/10
  bg-white/80 backdrop-blur-md
  shadow-sm transition
  hover:shadow-md
  dark:border-white/15
  dark:bg-white/5
`;

const categories = [
  "Design",
  "Code",
  "Office",
] as const;

function ArrowButton({
  dir,
  onClick,
  disabled,
  variant = "default",
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "lightbox";
}) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;

  if (variant === "lightbox") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="
          flex h-12 w-12 items-center justify-center
          rounded-full border border-black/10 bg-white/80 text-black shadow-sm backdrop-blur-md
          dark:border-white/15 dark:bg-white/5 dark:text-white
          transition hover:bg-black/[0.04] dark:hover:bg-white/[0.04] active:scale-95
        "
        aria-label={dir === "left" ? "Previous certificate" : "Next certificate"}
      >
        <Icon size={24} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Scroll left" : "Scroll right"}
      className="
        inline-flex h-9 w-9 items-center justify-center
        rounded-lg border border-black/10
        bg-white/80 backdrop-blur-md
        shadow-sm transition
        hover:shadow-md
        disabled:opacity-30 disabled:cursor-not-allowed
        dark:border-white/15 dark:bg-white/5
      "
    >
      <Icon size={18} />
    </button>
  );
}

/* ================= COMPONENT ================= */
export default function FilteredGrid({ active }: { active: FilterType }) {
  const projectCards = useMemo(() => projects, []);
  const certCards = useMemo(() => certificates, []);

  const [projectIndex, setProjectIndex] = useState(0);
  const [certIndex, setCertIndex] = useState(0);

  const [showcaseIndex, setShowcaseIndex] = useState<number | null>(null);

  const handleOriginalView = () => {
    setShowcaseIndex(null);
  };

  const handlePrevCert = () => {
    setShowcaseIndex((prev) => (prev !== null ? (prev === 0 ? certCards.length - 1 : prev - 1) : null));
  };

  const handleNextCert = () => {
    setShowcaseIndex((prev) => (prev !== null ? (prev === certCards.length - 1 ? 0 : prev + 1) : null));
  };

  /* ================= SEPARATE SHOWCASE PAGE VIEW ================= */
  if (showcaseIndex !== null) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="min-h-[80vh] py-6 flex flex-col bg-transparent select-none"
      >
        {/* Navigation / Header Bar */}
        <div className="mb-8 flex items-center justify-between border-b border-black/5 pb-4 dark:border-white/5">
          {/* Back Button - Forced to solid black, dark mode variants removed */}
          <button
            type="button"
            onClick={handleOriginalView}
            className="
              inline-flex items-center gap-2 text-sm font-medium
              text-black hover:text-black/70
              transition-colors duration-200 group
            "
          >
            <ArrowLeft 
              size={16} 
              className="text-black transition-transform group-hover:-translate-x-1" 
            />
            Back
          </button>

          {/* Indicator label - Forced to solid black, dark mode variants removed */}
          <span className="text-xs font-semibold uppercase tracking-wider text-black">
             ({showcaseIndex + 1} / {certCards.length})
          </span>
        </div>

        {/* Dedicated Window Container */}
        <div className="relative flex-1 flex items-center justify-between gap-6 my-auto">
          <div className="hidden md:block shrink-0">
            <ArrowButton dir="left" variant="default" onClick={handlePrevCert} />
          </div>

          <motion.div
            key={showcaseIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto"
          >
            <div className="rounded-2xl border border-black/10 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-black/40 backdrop-blur-md">
              <img
                src={certCards[showcaseIndex].image}
                alt={certCards[showcaseIndex].title}
                className="w-full h-auto max-h-[55vh] object-contain rounded-lg"
              />
            </div>

            <div className="mt-6 text-center max-w-xl px-4">
              <h2 className="text-xl font-bold text-black dark:text-white tracking-tight">
                {certCards[showcaseIndex].title}
              </h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1.5">
                Issued by {certCards[showcaseIndex].issuer} — {certCards[showcaseIndex].date}
              </p>
            </div>
          </motion.div>

          <div className="hidden md:block shrink-0">
            <ArrowButton dir="right" variant="default" onClick={handleNextCert} />
          </div>
        </div>

        <div className="flex md:hidden items-center justify-center gap-8 mt-8">
          <ArrowButton dir="left" variant="default" onClick={handlePrevCert} />
          <ArrowButton dir="right" variant="default" onClick={handleNextCert} />
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {certCards.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setShowcaseIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === showcaseIndex
                  ? "bg-black w-6 dark:bg-white"
                  : "bg-black/10 w-1.5 hover:bg-black/30 dark:bg-white/10 dark:hover:bg-white/30"
              }`}
              aria-label={`Showcase element ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  /* ================= MAIN GRID LAYOUT VIEW ================= */
  return (
    <div className="mt-4 overflow-hidden">
      {/* ================= PROJECTS ================= */}
      {active === "projects" && (
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black dark:text-white">Projects</h3>
            <div className="flex items-center gap-2">
              <ArrowButton
                dir="left"
                disabled={projectIndex === 0}
                onClick={() => setProjectIndex((p) => Math.max(0, p - 1))}
              />
              <ArrowButton
                dir="right"
                disabled={projectIndex >= projectCards.length - 1}
                onClick={() => setProjectIndex((p) => Math.min(projectCards.length - 1, p + 1))}
              />
            </div>
          </div>

          <div className="w-full overflow-hidden raw-carousel-container">
            <motion.ul
              animate={{ 
                x: window.innerWidth < 640 
                  ? `calc(-${projectIndex * 85}% - ${projectIndex * 16}px)`
                  : `-${projectIndex * (420 + 16)}px`
              }}
              transition={{ type: "spring", stiffness: 190, damping: 24 }}
              className="flex gap-4 pb-2"
            >
              {projectCards.map((project: Project) => (
                <motion.li
                  key={project.id}
                  variants={item}
                  className="w-[85%] sm:w-[420px] shrink-0"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={`${cardBase} group h-full flex flex-col`}
                  >
                    <img src={project.thumbnail} alt={project.title} className="h-44 w-full object-cover" loading="lazy" />
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg text-black dark:text-white">{project.title}</h3>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">{project.description}</p>
                      <div className="mt-auto flex gap-4 pt-4">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-black-600 dark:hover:text-white/800 transition-colors">
                            <ExternalLink size={16} /> Live
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-black-600 dark:hover:text-white transition-colors">
                            <Github size={16} /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      )}

      {/* ================= CERTIFICATES ================= */}
      {active === "certificates" && (
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black dark:text-white">Certificates</h3>
            <div className="flex items-center gap-2">
              <ArrowButton
                dir="left"
                disabled={certIndex === 0}
                onClick={() => setCertIndex((c) => Math.max(0, c - 1))}
              />
              <ArrowButton
                dir="right"
                disabled={certIndex >= certCards.length - 1}
                onClick={() => setCertIndex((c) => Math.min(certCards.length - 1, c + 1))}
              />
            </div>
          </div>

          <div className="w-full overflow-hidden raw-carousel-container">
            <motion.ul
              animate={{ 
                x: window.innerWidth < 640 
                  ? `calc(-${certIndex * 85}% - ${certIndex * 16}px)`
                  : `-${certIndex * (360 + 16)}px`
              }}
              transition={{ type: "spring", stiffness: 190, damping: 24 }}
              className="flex gap-4 pb-2"
            >
              {certCards.map((cert: Certificate, index: number) => (
                <motion.li
                  key={cert.id}
                  variants={item}
                  className="w-[85%] sm:w-[360px] shrink-0"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={`${cardBase} group h-full flex flex-col`}
                  >
                    <div className="relative overflow-hidden">
                      <img src={cert.image} alt={cert.title} className="h-40 w-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-black dark:text-white line-clamp-1">{cert.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer} • {cert.date}</p>
                      <div className="mt-auto pt-4">
                        <button
                          type="button"
                          onClick={() => setShowcaseIndex(index)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-black-600 dark:hover:text-white/800 transition-colors"
                        >
                          <Eye size={16} /> View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      )}

      {/* ================= TECH STACK ================= */}
      {active === "tech" && (
        <motion.div variants={container} initial="hidden" whileInView="show" className="space-y-6">
          {categories.map((category) => {
            const items = techStack.filter((t) => t.category === category);
            if (!items.length) return null;

            return (
              <div key={category}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">{category}</h3>
                <motion.ul variants={container} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tech) => (
                    <motion.li
                      key={tech.title}
                      variants={item}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black/10 bg-white/80 backdrop-blur-md shadow-sm dark:border-white/15 dark:bg-white/5"
                    >
                      <img src={tech.logo} alt={tech.title} className="h-6 w-6 object-contain shrink-0" loading="lazy" />
                      <span className="text-sm font-medium text-muted">{tech.title}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}