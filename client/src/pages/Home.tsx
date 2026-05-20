import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import AnimatedCard from "../components/AnimatedCard";
import GalleryCarousel from "../components/GalleryCarousel";
import FilterTabs, { type FilterType } from "../components/FilterTabs";
import FilteredGrid from "../components/FilteredGrid";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import Services from "../components/Services";
import Process from "../components/Process";
import LocalTimeCard from "../components/LocalTimeCard";
/* =========================
   EDUCATION STEP (Polished CV + subtle scroll animation)
   - Each item animates when it enters viewport
   ========================= */
function EducationStep({
  title,
  subtitle,
  years,
  status,
  current = false,
  children,
}: {
  title: string;
  subtitle?: string;
  years: string;
  status: string;
  current?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="relative pl-10"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dot */}
      <span
        className={[
          "absolute left-[4px] top-[12px] rounded-full transition-all",
          current
            ? "h-3 w-3 bg-zinc-950 dark:bg-white"
            : "h-2.5 w-2.5 bg-zinc-700 dark:bg-zinc-300",
        ].join(" ")}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Title */}
          <p
            className={[
              "edu-title text-sm font-semibold tracking-tight",
              current ? "edu-title-current" : "",
            ].join(" ")}
          >
            {title}
          </p>

          {/* Subtitle + Years */}
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            {subtitle && (
              <span className="edu-sub text-xs leading-tight">{subtitle}</span>
            )}

            <span className="edu-sep">•</span>

            <span className="edu-sub text-xs font-semibold whitespace-nowrap">
              {years}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={[
            "edu-badge shrink-0 text-[11px] px-2 py-1 rounded-md border flex items-center justify-center",
            current ? "edu-badge-current" : "",
          ].join(" ")}
        >
          {status}
        </span>
      </div>

      {/* Body */}
      <p className="mt-2 text-sm leading-relaxed edu-body">{children}</p>
    </motion.div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("projects");

  return (
    <motion.main
      className="max-w-6xl mx-auto px-4 py-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ScrollReveal>
        <div className="flex justify-center">
          <Hero />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <section className="grid md:grid-cols-3 gap-4">
          {/* LEFT COLUMN */}
          <div className="md:col-span-2 space-y-4">
            {/* ABOUT */}
            <AnimatedCard
              className="glass"
              title="ABOUT ME"
              icon="about"
              disableHover
            >
              <p className="text-sm text-muted leading-relaxed">
                Hi, I’m <strong>Daverick Ivan B. Tenorio</strong>, I help small businesses
                and individuals establish a strong digital presence by creating intuitive
                and cohesive visual branding, turning concepts into functional and
                visually striking digital realities. 

              </p>

              <p className="text-sm text-muted leading-relaxed mt-4">
                I turn products and services into clear visual experiences through strategic
                wireframing, logo design, and digital graphics. No unnecessary 
                complexity—just purposeful design that builds trust and drives action.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-4">
                As I continue to grow in the field of designing, I aim to
                not only improve how my outputs look—but how they function,
                support business goals, and create real value for the people who
                use them.
              </p>

            </AnimatedCard>

            {/* FOCUS */}
            <AnimatedCard
              className="glass"
              title="FOCUS"
              icon="focus"
              disableHover
            >
              <p className="text-sm text-muted leading-relaxed">
                For me, design is where context meets creativity. I am constantly 
                refining my skills in UI and graphic design, focusing on how deeply
                an idea integrates into the visual layout. My goal is simple:
                to ensure every project is not just visually stunning, but
                purposefully driven by its core concept.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-3">
                Beyond mastering design principles, I treat my technical toolkit as
                a living project. I am highly adaptable and always eager to acquire 
                new technical skills—whether that means picking up a new design tool,
                diving into emerging software, or learning frontend technologies—to 
                better bring my creative visions to life.
              </p>
            </AnimatedCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <LocalTimeCard disableHover />

            {/* EDUCATION */}
            <AnimatedCard
              className="glass"
              title="EDUCATION"
              icon="education"
              disableHover
            >
              <div className="relative education-muted pr-2">
                {/* Stronger visible rail */}

                <div className="space-y-2">
                  <EducationStep
                    title="University of Antique - Tario Lim Memorial Campus"
                    subtitle="Bachelor of Science in Information Technology"
                    years="2022 — Present"
                    status="In Progress"
                    current
                  >
                    College
                  </EducationStep>

                  <EducationStep
                    title="Pandan National Vocational High School"
                    subtitle="Humanities and Social Sciences Strand"
                    years="2016 — 2022"
                    status="Graduate"
                  >
                    Junior & Senior High School
                  </EducationStep>

                  <EducationStep
                    title="Fragante Elementary School"
                    subtitle="Completed"
                    years="2009 — 2016"
                    status="Graduate"
                  >
                    Elementary
                  </EducationStep>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </section>
      </ScrollReveal>

      <Services />
      <Process />

      <section className="glass rounded-2xl p-6">
        <FilterTabs active={activeFilter} setActive={setActiveFilter} />
        <FilteredGrid active={activeFilter} />
      </section>

      <section className="space-y-5">
        <h2 className="text-center font-extrabold text-xl">GALLERY</h2>
        <GalleryCarousel />
      </section>

      <Footer />
    </motion.main>
  );
}
