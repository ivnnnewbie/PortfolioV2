import { motion } from "framer-motion";
import { Component, PencilRuler, Newspaper } from "lucide-react";

const services = [
  {
    title: "Logo & Brand Identity Design",
    description:
      "Create a memorable brand identity with a custom logo and visual elements that represent your business values and resonate with your target audience.",
    icon: Component,
  },
  {
    title: "User Interface (UI) Design",
    description:
      "Create intuitive and visually appealing user interfaces for web and mobile applications, ensuring a seamless experience for your users.",
    icon: PencilRuler,
  },
  {
    title: "Publication Material Design",
    description:
      "Design compelling publication materials such as brochures, flyers, and newsletters that effectively communicate your message and engage your audience.",
    icon: Newspaper,
  },
];

export default function Services() {
  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-xl font-extrabold text-head">SERVICES</h2>
        <p className="text-sm text-muted mt-2 leading-relaxed">
          What I can do for you: I offer a range of design services to help you establish a strong digital presence and create visually stunning experiences for your audience.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="glass rounded-xl p-6 transition hover:shadow-lg"
            >
              <Icon size={22} className="icons mb-3" />

              <h3 className="text-base font-semibold text-head">
                {service.title}
              </h3>

              <p className="mt-2 text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
