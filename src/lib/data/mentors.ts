/* -------------------------------------------------------
 * Données mock Networking & Mentorat (sera remplacé par l'API)
 * ----------------------------------------------------- */

export type MentorDomain =
  | "Musique"
  | "Mode"
  | "Cinéma"
  | "Digital"
  | "Business"
  | "Direction artistique"
  | "Production";

export type ConnectionStatus = "available" | "limited" | "full";

export interface Mentor {
  slug: string;
  name: string;
  title: string;
  avatar: string;
  coverImage: string;
  domain: MentorDomain;
  location: string;
  bio: string;
  expertise: string[];
  status: ConnectionStatus;
  spotsLeft: number;
  totalMentees: number;
  successStories: number;
  verified: boolean;
  curated: boolean;
  testimonial?: { text: string; author: string; role: string };
}

export const mentorDomains: { value: string; label: string }[] = [
  { value: "all", label: "Tous les domaines" },
  { value: "Musique", label: "Musique" },
  { value: "Mode", label: "Mode" },
  { value: "Cinéma", label: "Cinéma" },
  { value: "Digital", label: "Digital" },
  { value: "Business", label: "Business" },
  { value: "Direction artistique", label: "Direction artistique" },
  { value: "Production", label: "Production" },
];

export const connectionSteps = [
  {
    step: 1,
    title: "Identifiez votre mentor",
    description:
      "Parcourez les profils vérifiés et trouvez le mentor dont l'expertise correspond à vos ambitions.",
    icon: "search",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    step: 2,
    title: "Demandez la mise en relation",
    description:
      "Envoyez une demande qualifiée en décrivant votre projet et vos attentes. Pas de spam, que du concret.",
    icon: "send",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    step: 3,
    title: "Validation par l'équipe",
    description:
      "Notre équipe éditoriale valide chaque demande pour garantir des échanges pertinents et de qualité.",
    icon: "shield",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    step: 4,
    title: "Échangez en confiance",
    description:
      "Connectez-vous via notre messagerie sécurisée ou par email relay. Confidentialité garantie.",
    icon: "chat",
    gradient: "from-blue-500 to-indigo-600",
  },
];

export const mentors: Mentor[] = [
  {
    slug: "yemi-adebayo",
    name: "Yemi Adebayo",
    title: "Producteur Musical — 340+ tracks, 85M streams",
    avatar: "from-blue-500 to-violet-400",
    coverImage: "from-blue-600 via-violet-500 to-indigo-700",
    domain: "Musique",
    location: "Lagos, Nigeria",
    bio: "Producteur musical reconnu avec plus de 15 ans d'expérience dans l'afrobeats et l'amapiano. Accompagne les artistes émergents dans la production, le mix et la stratégie de sortie.",
    expertise: ["Production musicale", "Mix & Master", "Stratégie de sortie", "Branding artiste"],
    status: "available",
    spotsLeft: 3,
    totalMentees: 12,
    successStories: 8,
    verified: true,
    curated: true,
    testimonial: {
      text: "Yemi m'a aidé à structurer mon premier EP. Grâce à ses conseils, j'ai signé avec un label en 6 mois.",
      author: "Kemi Olatunji",
      role: "Artiste afrobeats",
    },
  },
  {
    slug: "fatou-keita",
    name: "Fatou Keita",
    title: "Mannequin & Ambassadrice — 1.2M followers",
    avatar: "from-emerald-500 to-teal-400",
    coverImage: "from-emerald-600 via-teal-500 to-cyan-600",
    domain: "Mode",
    location: "Abidjan, Côte d'Ivoire",
    bio: "Figure incontournable de la mode africaine, Fatou accompagne les mannequins et créateurs émergents dans leur positionnement, la négociation de contrats et la construction de leur image de marque.",
    expertise: ["Mannequinat", "Personal branding", "Négociation contrats", "Réseaux sociaux"],
    status: "limited",
    spotsLeft: 1,
    totalMentees: 18,
    successStories: 14,
    verified: true,
    curated: true,
    testimonial: {
      text: "Fatou m'a ouvert les portes de la Fashion Week Lagos. Son réseau et ses conseils sont inestimables.",
      author: "Aisata Coulibaly",
      role: "Mannequin émergente",
    },
  },
  {
    slug: "kofi-mensah",
    name: "Kofi Mensah",
    title: "Réalisateur & Photographe — 87 projets",
    avatar: "from-amber-500 to-red-400",
    coverImage: "from-amber-600 via-orange-500 to-red-600",
    domain: "Cinéma",
    location: "Accra, Ghana",
    bio: "Réalisateur primé spécialisé dans le clip vidéo et le documentaire. Forme les vidéastes émergents aux techniques de narration visuelle, à la direction photo et à la post-production.",
    expertise: ["Réalisation", "Direction photo", "Post-production", "Narration visuelle"],
    status: "available",
    spotsLeft: 4,
    totalMentees: 9,
    successStories: 6,
    verified: true,
    curated: true,
  },
  {
    slug: "omar-benali",
    name: "Omar Benali",
    title: "Créateur Digital — 820K abonnés",
    avatar: "from-violet-500 to-purple-400",
    coverImage: "from-violet-600 via-purple-500 to-fuchsia-600",
    domain: "Digital",
    location: "Casablanca, Maroc",
    bio: "Expert en stratégie de contenu digital et monétisation. Accompagne les créateurs dans la construction de leur audience, les partenariats marques et la diversification de revenus.",
    expertise: ["Stratégie contenu", "Monétisation", "Partenariats marques", "YouTube / TikTok"],
    status: "available",
    spotsLeft: 5,
    totalMentees: 22,
    successStories: 15,
    verified: true,
    curated: true,
    testimonial: {
      text: "Omar m'a appris à transformer mes vidéos en business. En 3 mois, j'ai signé mon premier partenariat.",
      author: "Yasmine El Idrissi",
      role: "Créatrice lifestyle",
    },
  },
  {
    slug: "david-oyelowo",
    name: "David Oyelowo",
    title: "Directeur artistique & Consultant marques",
    avatar: "from-amber-500 to-orange-400",
    coverImage: "from-amber-600 via-yellow-500 to-orange-600",
    domain: "Direction artistique",
    location: "Lagos, Nigeria",
    bio: "20 ans d'expérience en direction artistique pour des marques internationales en Afrique. Conseille les créatifs sur le positionnement, l'identité visuelle et les collaborations marques premium.",
    expertise: ["Direction artistique", "Identité visuelle", "Brand strategy", "Collaborations premium"],
    status: "limited",
    spotsLeft: 2,
    totalMentees: 15,
    successStories: 11,
    verified: true,
    curated: false,
  },
  {
    slug: "aida-ndiaye",
    name: "Aïda Ndiaye",
    title: "Productrice cinéma & TV — Dakar Films",
    avatar: "from-rose-500 to-pink-400",
    coverImage: "from-rose-600 via-pink-500 to-fuchsia-600",
    domain: "Production",
    location: "Dakar, Sénégal",
    bio: "Productrice primée spécialisée dans le cinéma et les séries TV africains. Accompagne les jeunes producteurs dans le financement, la distribution et les coproductions internationales.",
    expertise: ["Production audiovisuelle", "Financement", "Distribution", "Coproductions"],
    status: "available",
    spotsLeft: 3,
    totalMentees: 7,
    successStories: 5,
    verified: true,
    curated: true,
    testimonial: {
      text: "Aïda m'a guidé dans le montage financier de mon premier court-métrage. Il a été sélectionné au FESPACO.",
      author: "Mamadou Sow",
      role: "Réalisateur émergent",
    },
  },
  {
    slug: "grace-mwangi",
    name: "Grace Mwangi",
    title: "Comédienne & Entrepreneuse — 380K followers",
    avatar: "from-yellow-400 to-orange-400",
    coverImage: "from-yellow-500 via-orange-400 to-red-500",
    domain: "Business",
    location: "Nairobi, Kenya",
    bio: "Comédienne devenue entrepreneuse, Grace conseille les talents du divertissement sur la diversification de carrière, le personal branding et la transition vers l'entrepreneuriat créatif.",
    expertise: ["Personal branding", "Entrepreneuriat créatif", "MC & Events", "Monétisation talent"],
    status: "full",
    spotsLeft: 0,
    totalMentees: 20,
    successStories: 16,
    verified: true,
    curated: true,
  },
];
