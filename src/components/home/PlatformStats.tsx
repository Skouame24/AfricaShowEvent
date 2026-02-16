"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 850, suffix: "+", label: "Talents vérifiés" },
  { value: 120, suffix: "+", label: "Marques partenaires" },
  { value: 45, suffix: "", label: "Pays représentés" },
  { value: 200, suffix: "+", label: "Mises en relation réussies" },
];

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function PlatformStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      className="relative overflow-hidden border-y border-neutral-800/50 bg-neutral-950/80 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Décor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-amber-500/[0.03] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple-500/[0.03] to-transparent" />
      </div>

      <div ref={ref} className="relative mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 * i, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-4xl font-black tracking-tight text-white md:text-5xl">
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                inView={inView}
              />
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
