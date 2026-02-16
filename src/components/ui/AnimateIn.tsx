"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* -------------------------------------------------------
 * Variantes prêtes à l'emploi
 * ----------------------------------------------------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

/* -------------------------------------------------------
 * Composant wrapper réutilisable
 * ----------------------------------------------------- */

interface AnimateInProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "article" | "li" | "span";
}

export function AnimateIn({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  as = "div",
}: AnimateInProps) {
  const Component = motion.create(as);

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

/* -------------------------------------------------------
 * Stagger container (pour groupes d'éléments)
 * ----------------------------------------------------- */

interface StaggerProps {
  children: ReactNode;
  className?: string;
  slow?: boolean;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "ul" | "ol";
}

export function Stagger({
  children,
  className,
  slow = false,
  once = true,
  amount = 0.15,
  as = "div",
}: StaggerProps) {
  const Component = motion.create(as);

  return (
    <Component
      variants={slow ? staggerContainerSlow : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </Component>
  );
}

/* -------------------------------------------------------
 * Enfant d'un Stagger (hérite la variante du parent)
 * ----------------------------------------------------- */

interface StaggerItemProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  duration?: number;
}

export function StaggerItem({
  children,
  variants = fadeUp,
  className,
  duration = 0.5,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={variants}
      transition={{ duration, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
