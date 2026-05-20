import { motion } from "framer-motion";
import { NotepadText, Sparkles, Brush, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Understand Your Needs",
    icon: NotepadText,
    desc: "We talk about your goals, target audience, and design preferences to make sure we're on the same page before starting the project.",
  },
  {
    step: "02",
    title: "Brainstorm & Conceptualize",
    icon: Sparkles,
    desc: "I gather ideas and references to create a visual direction that aligns with your brand and objectives.",
  },
  {
    step: "03",
    title: "Design",
    icon: Brush,
    desc: "I create wireframes, mockups, and prototypes to visualize the design and layout of your digital product.",
  },
  {
    step: "04",
    title: "Testing",
    icon: Rocket,
    desc: "I test the product through user's perspective to ensure that its intuitive and user-friendly.",
  },
];

export default function Process() {
  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-xl font-extrabold text-head">PROCESS</h2>
        <p className="text-sm text-muted">How I work</p>
      </div>

      {/* STEPS */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => {
          const Icon = s.icon;

          return (
            <motion.div
              key={s.step}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="glass rounded-xl p-5 transition hover:shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="icons" />
                <span className="text-xs font-medium text-muted">{s.step}</span>
              </div>

              <h3 className="font-semibold text-head">{s.title}</h3>

              <p className="mt-2 text-sm text-muted leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
