/* -------------------------------------------------------
 * Données mock des talents (sera remplacé par l'API)
 * ----------------------------------------------------- */

export interface Talent {
  slug: string;
  name: string;
  role: string;
  location: string;
  country: string;
  category: string;
  image: string; // gradient placeholder
  avatar: string; // gradient placeholder
  bio: string;
  skills: string[];
  curated: boolean;
  verified: boolean;
  gallery: { type: "photo" | "video"; gradient: string; caption: string }[];
  social: { platform: string; url: string }[];
  stats: { label: string; value: string }[];
}

export const talentCategories = [
  "Tous",
  "Musique",
  "Mode & Mannequinat",
  "Cinéma & Réalisation",
  "Danse",
  "Influence & Digital",
  "Arts visuels",
  "Comédie",
  "Photographie",
];

export const talentLocations = [
  "Tous les pays",
  "Nigeria",
  "Sénégal",
  "Côte d'Ivoire",
  "Ghana",
  "Cameroun",
  "RDC",
  "Kenya",
  "Afrique du Sud",
  "Maroc",
];

export const talents: Talent[] = [
  {
    slug: "amara-diallo",
    name: "Amara Diallo",
    role: "Chanteuse & Auteure-Compositrice",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    category: "Musique",
    image: "from-purple-600 to-pink-500",
    avatar: "from-purple-500 to-pink-400",
    bio: "Amara Diallo est une artiste sénégalaise dont la voix puissante mêle soul, afrobeats et mbalax contemporain. Révélée par ses reprises sur les réseaux sociaux, elle a rapidement conquis une audience internationale. Son premier album 'Teranga Soul' a été salué par la critique et lui a valu une nomination aux AFRIMA Awards 2025. Elle collabore régulièrement avec des producteurs de Lagos, Londres et Paris.",
    skills: ["Afrobeats", "Soul", "Composition", "Écriture", "Live Performance"],
    curated: true,
    verified: true,
    gallery: [
      { type: "photo", gradient: "from-purple-700 to-pink-600", caption: "Concert Dakar Arena 2025" },
      { type: "photo", gradient: "from-amber-600 to-red-500", caption: "Shooting presse" },
      { type: "video", gradient: "from-blue-600 to-purple-600", caption: "Clip 'Teranga'" },
      { type: "photo", gradient: "from-emerald-600 to-teal-500", caption: "Festival MASA Abidjan" },
      { type: "photo", gradient: "from-pink-500 to-rose-600", caption: "Backstage studio" },
      { type: "video", gradient: "from-violet-600 to-indigo-600", caption: "Live acoustique" },
    ],
    social: [
      { platform: "Instagram", url: "#" },
      { platform: "YouTube", url: "#" },
      { platform: "Spotify", url: "#" },
    ],
    stats: [
      { label: "Followers", value: "245K" },
      { label: "Collaborations", value: "18" },
      { label: "Événements", value: "32" },
    ],
  },
  {
    slug: "kofi-mensah",
    name: "Kofi Mensah",
    role: "Réalisateur & Photographe",
    location: "Accra, Ghana",
    country: "Ghana",
    category: "Cinéma & Réalisation",
    image: "from-amber-600 to-red-500",
    avatar: "from-amber-500 to-red-400",
    bio: "Kofi Mensah est un réalisateur et photographe ghanéen spécialisé dans les clips musicaux, la mode et le documentaire. Son style cinématographique unique mêle esthétique afrofuturiste et réalisme social. Il a dirigé des clips pour plusieurs artistes majeurs du continent et ses documentaires ont été présentés dans des festivals internationaux.",
    skills: ["Clip vidéo", "Mode", "Documentaire", "Direction photo", "Post-production"],
    curated: true,
    verified: true,
    gallery: [
      { type: "photo", gradient: "from-amber-700 to-red-600", caption: "Tournage clip Lagos" },
      { type: "video", gradient: "from-purple-600 to-indigo-600", caption: "Showreel 2025" },
      { type: "photo", gradient: "from-teal-600 to-cyan-500", caption: "Portrait editorial" },
      { type: "photo", gradient: "from-rose-600 to-pink-500", caption: "Fashion Week Accra" },
    ],
    social: [
      { platform: "Instagram", url: "#" },
      { platform: "Vimeo", url: "#" },
      { platform: "Behance", url: "#" },
    ],
    stats: [
      { label: "Projets", value: "87" },
      { label: "Collaborations", value: "42" },
      { label: "Awards", value: "5" },
    ],
  },
  {
    slug: "fatou-keita",
    name: "Fatou Keita",
    role: "Mannequin & Influenceuse",
    location: "Abidjan, Côte d'Ivoire",
    country: "Côte d'Ivoire",
    category: "Mode & Mannequinat",
    image: "from-emerald-600 to-teal-500",
    avatar: "from-emerald-500 to-teal-400",
    bio: "Fatou Keita est une mannequin et influenceuse ivoirienne devenue l'un des visages les plus reconnaissables de la mode africaine contemporaine. Elle a défilé pour des maisons comme Pathé'O, Imane Ayissi et a participé à des campagnes internationales pour L'Oréal Africa et Orange. Ambassadrice de marques lifestyle, elle incarne une Afrique moderne, élégante et connectée.",
    skills: ["Haute couture", "Campagne digitale", "Lifestyle", "Brand ambassador", "Création de contenu"],
    curated: true,
    verified: true,
    gallery: [
      { type: "photo", gradient: "from-emerald-700 to-teal-600", caption: "Fashion Week Lagos" },
      { type: "photo", gradient: "from-amber-600 to-yellow-500", caption: "Campagne L'Oréal" },
      { type: "photo", gradient: "from-rose-600 to-pink-500", caption: "Cover Magazine" },
      { type: "video", gradient: "from-purple-600 to-violet-600", caption: "Behind the scenes" },
      { type: "photo", gradient: "from-blue-600 to-cyan-500", caption: "Shooting plage" },
    ],
    social: [
      { platform: "Instagram", url: "#" },
      { platform: "TikTok", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
    stats: [
      { label: "Followers", value: "1.2M" },
      { label: "Campagnes", value: "24" },
      { label: "Défilés", value: "45" },
    ],
  },
  {
    slug: "yemi-adebayo",
    name: "Yemi Adebayo",
    role: "Producteur Musical",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    category: "Musique",
    image: "from-blue-600 to-violet-500",
    avatar: "from-blue-500 to-violet-400",
    bio: "Yemi Adebayo est un producteur musical nigérian basé à Lagos, reconnu pour ses productions afrobeats et amapiano qui ont propulsé plusieurs artistes au sommet des charts africains. Son studio 'Lagoon Sounds' est devenu un lieu incontournable de la scène musicale ouest-africaine.",
    skills: ["Afrobeats", "Amapiano", "Mix & Master", "Beatmaking", "Sound design"],
    curated: false,
    verified: true,
    gallery: [
      { type: "photo", gradient: "from-blue-700 to-violet-600", caption: "Studio Lagoon Sounds" },
      { type: "video", gradient: "from-amber-600 to-orange-500", caption: "Making of 'Vibes'" },
      { type: "photo", gradient: "from-purple-600 to-pink-500", caption: "Session studio" },
    ],
    social: [
      { platform: "Instagram", url: "#" },
      { platform: "SoundCloud", url: "#" },
      { platform: "Spotify", url: "#" },
    ],
    stats: [
      { label: "Tracks produits", value: "340+" },
      { label: "Artistes", value: "56" },
      { label: "Streams", value: "85M" },
    ],
  },
  {
    slug: "nia-okafor",
    name: "Nia Okafor",
    role: "Danseuse & Chorégraphe",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    category: "Danse",
    image: "from-rose-600 to-red-500",
    avatar: "from-rose-500 to-red-400",
    bio: "Nia Okafor est une danseuse et chorégraphe nigériane dont le style fusionne les danses traditionnelles yoruba avec le contemporary et l'afro-dance. Elle a chorégraphié pour Wizkid, Tiwa Savage et a été invitée par le Alvin Ailey Dance Theater à New York.",
    skills: ["Afro-dance", "Contemporain", "Chorégraphie", "Direction artistique", "Formation"],
    curated: true,
    verified: true,
    gallery: [
      { type: "video", gradient: "from-rose-700 to-red-600", caption: "Performance live" },
      { type: "photo", gradient: "from-amber-600 to-orange-500", caption: "Répétition studio" },
      { type: "video", gradient: "from-purple-600 to-indigo-600", caption: "Clip Wizkid" },
      { type: "photo", gradient: "from-teal-600 to-emerald-500", caption: "Workshop Accra" },
    ],
    social: [
      { platform: "Instagram", url: "#" },
      { platform: "TikTok", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
    stats: [
      { label: "Followers", value: "520K" },
      { label: "Chorégraphies", value: "75" },
      { label: "Clips", value: "28" },
    ],
  },
  {
    slug: "omar-benali",
    name: "Omar Benali",
    role: "Influenceur & Créateur Digital",
    location: "Casablanca, Maroc",
    country: "Maroc",
    category: "Influence & Digital",
    image: "from-violet-600 to-purple-500",
    avatar: "from-violet-500 to-purple-400",
    bio: "Omar Benali est un créateur de contenu marocain spécialisé dans le lifestyle, la tech et la culture africaine. Avec plus de 800K abonnés sur ses plateformes, il est devenu une voix influente de la nouvelle génération africaine connectée. Il collabore avec des marques comme Samsung Africa, Jumia et Netflix Afrique.",
    skills: ["Création de contenu", "Brand partnerships", "Vidéo", "Podcast", "Community management"],
    curated: true,
    verified: true,
    gallery: [
      { type: "video", gradient: "from-violet-700 to-purple-600", caption: "YouTube Rewind Africa" },
      { type: "photo", gradient: "from-amber-600 to-yellow-500", caption: "Campagne Samsung" },
      { type: "photo", gradient: "from-blue-600 to-cyan-500", caption: "Event CES Africa" },
    ],
    social: [
      { platform: "Instagram", url: "#" },
      { platform: "YouTube", url: "#" },
      { platform: "TikTok", url: "#" },
    ],
    stats: [
      { label: "Followers", value: "820K" },
      { label: "Partenariats", value: "35" },
      { label: "Vidéos", value: "450+" },
    ],
  },
  {
    slug: "adama-traore",
    name: "Adama Traoré",
    role: "Artiste Visuel & Peintre",
    location: "Bamako, Mali",
    country: "Mali",
    category: "Arts visuels",
    image: "from-orange-600 to-amber-500",
    avatar: "from-orange-500 to-amber-400",
    bio: "Adama Traoré est un artiste visuel malien dont les œuvres explorent les thèmes de l'identité, de la migration et de la modernité africaine. Ses toiles ont été exposées à la Biennale de Dakar, à Art Basel et dans des galeries à Londres et New York.",
    skills: ["Peinture", "Art contemporain", "Installation", "Art digital", "Muralisme"],
    curated: true,
    verified: false,
    gallery: [
      { type: "photo", gradient: "from-orange-700 to-amber-600", caption: "Exposition Biennale Dakar" },
      { type: "photo", gradient: "from-purple-600 to-pink-500", caption: "Atelier Bamako" },
      { type: "photo", gradient: "from-teal-600 to-emerald-500", caption: "Murale Lagos" },
      { type: "photo", gradient: "from-blue-600 to-indigo-500", caption: "Art Basel Miami" },
    ],
    social: [
      { platform: "Instagram", url: "#" },
      { platform: "Behance", url: "#" },
    ],
    stats: [
      { label: "Expositions", value: "22" },
      { label: "Œuvres", value: "180+" },
      { label: "Collections", value: "8" },
    ],
  },
  {
    slug: "grace-mwangi",
    name: "Grace Mwangi",
    role: "Comédienne & Actrice",
    location: "Nairobi, Kenya",
    country: "Kenya",
    category: "Comédie",
    image: "from-yellow-500 to-orange-500",
    avatar: "from-yellow-400 to-orange-400",
    bio: "Grace Mwangi est une comédienne et actrice kenyane qui a explosé sur les réseaux sociaux grâce à ses sketches satiriques. Elle joue désormais dans des séries Showmax et Netflix. Son humour engagé et son énergie communicative en font l'une des personnalités les plus demandées pour les événements corporate en Afrique de l'Est.",
    skills: ["Stand-up", "Sketch", "Acting", "Voice-over", "MC / Animation"],
    curated: false,
    verified: true,
    gallery: [
      { type: "video", gradient: "from-yellow-600 to-orange-600", caption: "Stand-up Nairobi" },
      { type: "photo", gradient: "from-purple-600 to-pink-500", caption: "Tournage série Showmax" },
      { type: "photo", gradient: "from-teal-600 to-cyan-500", caption: "Event corporate" },
    ],
    social: [
      { platform: "Instagram", url: "#" },
      { platform: "TikTok", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
    stats: [
      { label: "Followers", value: "380K" },
      { label: "Shows", value: "95" },
      { label: "Séries", value: "4" },
    ],
  },
];
