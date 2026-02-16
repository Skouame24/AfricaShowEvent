/* -------------------------------------------------------
 * Données mock des événements (sera remplacé par l'API)
 * ----------------------------------------------------- */

export type EventStatus = "upcoming" | "ongoing" | "past";
export type EventType = "showcase" | "diner" | "workshop" | "premiere" | "networking" | "festival";

export interface EventHeadliner {
  name: string;
  title: string;       // ex : "Chanteuse Afrobeats"
  avatar: string;      // gradient placeholder
  coverImage: string;  // gradient placeholder
  talentSlug?: string; // lien vers profil talent si existant
  socials?: string;    // ex : "@amaradiallo"
}

export interface EventParticipant {
  name: string;
  role: string;
  avatar: string; // gradient placeholder
  confirmed: boolean;
}

export interface EventGalleryItem {
  gradient: string;
  caption: string;
}

export interface AppEvent {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  type: EventType;
  status: EventStatus;
  date: string;        // ex : "15 Mars 2026"
  time: string;        // ex : "19:00 – 23:00"
  location: string;
  venue: string;
  city: string;
  country: string;
  image: string;       // gradient placeholder
  capacity: number;
  spotsLeft: number;
  invitationOnly: boolean;
  dresscode?: string;
  organizer: string;
  highlights: string[];
  headliners: EventHeadliner[];
  participants: EventParticipant[];
  gallery: EventGalleryItem[];
  tags: string[];
}

export const eventTypes: { value: string; label: string }[] = [
  { value: "all", label: "Tous les types" },
  { value: "showcase", label: "Showcase" },
  { value: "diner", label: "Dîner privé" },
  { value: "workshop", label: "Workshop" },
  { value: "premiere", label: "Première" },
  { value: "networking", label: "Networking" },
  { value: "festival", label: "Festival" },
];

export const eventStatuses: { value: string; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "upcoming", label: "À venir" },
  { value: "ongoing", label: "En cours" },
  { value: "past", label: "Passés" },
];

export const eventTypeConfig: Record<EventType, { label: string; color: string; icon: string }> = {
  showcase: { label: "Showcase", color: "from-purple-500 to-violet-600", icon: "🎤" },
  diner: { label: "Dîner privé", color: "from-amber-500 to-orange-600", icon: "🍽️" },
  workshop: { label: "Workshop", color: "from-emerald-500 to-teal-600", icon: "🎓" },
  premiere: { label: "Première", color: "from-rose-500 to-red-600", icon: "🎬" },
  networking: { label: "Networking", color: "from-blue-500 to-indigo-600", icon: "🤝" },
  festival: { label: "Festival", color: "from-pink-500 to-fuchsia-600", icon: "🎶" },
};

export const events: AppEvent[] = [
  {
    slug: "afrobeats-night-lagos",
    title: "Afrobeats Night Lagos",
    subtitle: "Une soirée exclusive réunissant les plus grands producteurs afrobeats",
    description:
      "AfricaShowbizRoom vous invite à une soirée immersive au cœur de la scène afrobeats de Lagos. Rencontrez les producteurs, artistes et décideurs qui façonnent le son du continent. Performance live, DJ set et networking dans un cadre premium. Un événement sur invitation uniquement, limité à 120 personnes pour garantir des échanges de qualité.",
    type: "showcase",
    status: "upcoming",
    date: "22 Mars 2026",
    time: "20:00 – 02:00",
    location: "The Wheatbaker, Ikoyi",
    venue: "The Wheatbaker Hotel",
    city: "Lagos",
    country: "Nigeria",
    image: "from-purple-700 via-violet-600 to-indigo-800",
    capacity: 120,
    spotsLeft: 23,
    invitationOnly: true,
    dresscode: "Smart Casual / Afro-chic",
    organizer: "AfricaShowbizRoom × Lagoon Sounds",
    highlights: [
      "3 performances live exclusives",
      "DJ set par DJ Neptune",
      "Networking B2B talents-marques",
      "Open bar premium & catering",
      "Photographe professionnel",
    ],
    headliners: [
      { name: "Amara Diallo", title: "Chanteuse & Auteure-Compositrice", avatar: "from-purple-500 to-pink-400", coverImage: "from-purple-600 to-pink-500", talentSlug: "amara-diallo", socials: "@amaradiallo" },
      { name: "Yemi Adebayo", title: "Producteur Musical", avatar: "from-blue-500 to-violet-400", coverImage: "from-blue-600 to-violet-500", talentSlug: "yemi-adebayo", socials: "@yemiadebayo" },
      { name: "Nia Okafor", title: "Danseuse & Chorégraphe", avatar: "from-rose-500 to-red-400", coverImage: "from-rose-600 to-red-500", talentSlug: "nia-okafor", socials: "@niaokafor" },
    ],
    participants: [
      { name: "Yemi Adebayo", role: "Producteur", avatar: "from-blue-500 to-violet-400", confirmed: true },
      { name: "Amara Diallo", role: "Chanteuse", avatar: "from-purple-500 to-pink-400", confirmed: true },
      { name: "Nia Okafor", role: "Danseuse", avatar: "from-rose-500 to-red-400", confirmed: true },
      { name: "David Oyelowo", role: "Directeur artistique", avatar: "from-amber-500 to-orange-400", confirmed: true },
      { name: "Simi Adewale", role: "Brand Manager", avatar: "from-emerald-500 to-teal-400", confirmed: false },
      { name: "Tunde Kelani", role: "Réalisateur", avatar: "from-cyan-500 to-blue-400", confirmed: true },
    ],
    gallery: [],
    tags: ["Musique", "Afrobeats", "Networking", "Lagos"],
  },
  {
    slug: "fashion-forward-abidjan",
    title: "Fashion Forward Abidjan",
    subtitle: "Le rendez-vous mode qui connecte créateurs africains et maisons internationales",
    description:
      "Fashion Forward Abidjan est un événement intimiste mêlant défilé, tables rondes et rencontres B2B entre créateurs de mode africains et représentants de maisons internationales. L'objectif : créer des ponts durables entre le talent créatif africain et l'industrie mondiale de la mode. Cocktail, exposition et networking dans le cadre exceptionnel de l'Hôtel Ivoire.",
    type: "networking",
    status: "upcoming",
    date: "05 Avril 2026",
    time: "18:00 – 23:00",
    location: "Hôtel Ivoire, Cocody",
    venue: "Hôtel Ivoire Sofitel",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    image: "from-amber-600 via-orange-500 to-rose-600",
    capacity: 80,
    spotsLeft: 12,
    invitationOnly: true,
    dresscode: "Tenue de soirée / Créateurs africains",
    organizer: "AfricaShowbizRoom × FIMA",
    highlights: [
      "Mini défilé de 5 créateurs émergents",
      "Table ronde : L'Afrique dans la mode mondiale",
      "Speed networking marques-créateurs",
      "Exposition pièces exclusives",
      "Cocktail gastronomique",
    ],
    headliners: [
      { name: "Fatou Keita", title: "Mannequin & Influenceuse", avatar: "from-emerald-500 to-teal-400", coverImage: "from-emerald-600 to-teal-500", talentSlug: "fatou-keita", socials: "@fatoukeita" },
      { name: "Imane Ayissi", title: "Créateur de mode", avatar: "from-amber-500 to-red-400", coverImage: "from-amber-600 to-red-500", socials: "@imaneayissi" },
    ],
    participants: [
      { name: "Fatou Keita", role: "Mannequin", avatar: "from-emerald-500 to-teal-400", confirmed: true },
      { name: "Imane Ayissi", role: "Designer", avatar: "from-amber-500 to-red-400", confirmed: true },
      { name: "Nana Mensah", role: "Styliste", avatar: "from-pink-500 to-rose-400", confirmed: true },
      { name: "Kofi Mensah", role: "Photographe", avatar: "from-amber-500 to-red-400", confirmed: false },
    ],
    gallery: [],
    tags: ["Mode", "Networking", "Abidjan", "Luxe"],
  },
  {
    slug: "cinema-premiere-dakar",
    title: "Première — 'Teranga Rising'",
    subtitle: "Avant-première exclusive du documentaire sur la scène créative sénégalaise",
    description:
      "Assistez en avant-première à 'Teranga Rising', un documentaire immersif qui suit cinq créatifs sénégalais sur leur parcours artistique. Projection suivie d'un Q&A avec le réalisateur et les protagonistes du film. Une soirée qui célèbre la richesse et la diversité de la création sénégalaise contemporaine.",
    type: "premiere",
    status: "upcoming",
    date: "18 Avril 2026",
    time: "19:30 – 22:30",
    location: "Cinéma Pathé, Plateau",
    venue: "Cinéma Pathé Dakar",
    city: "Dakar",
    country: "Sénégal",
    image: "from-rose-700 via-red-600 to-orange-700",
    capacity: 200,
    spotsLeft: 67,
    invitationOnly: false,
    organizer: "AfricaShowbizRoom × Dakar Films",
    highlights: [
      "Projection en avant-première",
      "Q&A avec le réalisateur",
      "Rencontre avec les artistes du film",
      "Cocktail post-projection",
      "Exposition photographique",
    ],
    headliners: [
      { name: "Amara Diallo", title: "Protagoniste & Chanteuse", avatar: "from-purple-500 to-pink-400", coverImage: "from-purple-600 to-pink-500", talentSlug: "amara-diallo", socials: "@amaradiallo" },
      { name: "Ousmane Diop", title: "Réalisateur du film", avatar: "from-teal-500 to-cyan-400", coverImage: "from-teal-600 to-cyan-500", socials: "@ousmanediop" },
    ],
    participants: [
      { name: "Amara Diallo", role: "Protagoniste", avatar: "from-purple-500 to-pink-400", confirmed: true },
      { name: "Ousmane Diop", role: "Réalisateur", avatar: "from-teal-500 to-cyan-400", confirmed: true },
      { name: "Aïda Ndiaye", role: "Productrice", avatar: "from-violet-500 to-purple-400", confirmed: true },
    ],
    gallery: [],
    tags: ["Cinéma", "Documentaire", "Dakar", "Première"],
  },
  {
    slug: "creative-workshop-accra",
    title: "Creative Masterclass Accra",
    subtitle: "Workshop intensif : Direction photo & narration visuelle africaine",
    description:
      "Un workshop d'une journée animé par Kofi Mensah et deux directeurs photo internationaux. Apprenez les techniques de narration visuelle qui définissent l'esthétique africaine contemporaine. Théorie le matin, pratique l'après-midi avec du matériel professionnel fourni. Limité à 30 participants pour un encadrement personnalisé.",
    type: "workshop",
    status: "upcoming",
    date: "25 Avril 2026",
    time: "09:00 – 18:00",
    location: "Alliance Française, Accra",
    venue: "Alliance Française d'Accra",
    city: "Accra",
    country: "Ghana",
    image: "from-emerald-700 via-teal-600 to-cyan-700",
    capacity: 30,
    spotsLeft: 8,
    invitationOnly: false,
    organizer: "AfricaShowbizRoom × Kofi Mensah Studio",
    highlights: [
      "Masterclass direction photo",
      "Exercices pratiques avec matériel pro",
      "Critique portfolio personnalisée",
      "Certificat de participation",
      "Déjeuner et pauses café inclus",
    ],
    headliners: [
      { name: "Kofi Mensah", title: "Réalisateur & Photographe", avatar: "from-amber-500 to-red-400", coverImage: "from-amber-600 to-red-500", talentSlug: "kofi-mensah", socials: "@kofimensah" },
    ],
    participants: [
      { name: "Kofi Mensah", role: "Formateur principal", avatar: "from-amber-500 to-red-400", confirmed: true },
      { name: "Emma Adjei", role: "DP invitée", avatar: "from-blue-500 to-indigo-400", confirmed: true },
    ],
    gallery: [],
    tags: ["Workshop", "Photo", "Accra", "Formation"],
  },
  {
    slug: "gala-diner-casablanca",
    title: "Gala Dîner Casablanca",
    subtitle: "Soirée de gala réunissant l'élite du showbiz africain et les marques partenaires",
    description:
      "Le Gala AfricaShowbizRoom réunit chaque année les décideurs de l'industrie du divertissement africain autour d'un dîner gastronomique. Remise de prix, performances surprises et networking de haut niveau dans le cadre prestigieux du Royal Mansour. Un moment unique pour tisser des liens stratégiques.",
    type: "diner",
    status: "upcoming",
    date: "10 Mai 2026",
    time: "20:00 – 00:00",
    location: "Royal Mansour, Casablanca",
    venue: "Royal Mansour Hotel",
    city: "Casablanca",
    country: "Maroc",
    image: "from-amber-700 via-yellow-600 to-amber-800",
    capacity: 60,
    spotsLeft: 5,
    invitationOnly: true,
    dresscode: "Black Tie / Haute couture africaine",
    organizer: "AfricaShowbizRoom",
    highlights: [
      "Dîner gastronomique 5 services",
      "Remise des ASR Awards 2026",
      "Performance surprise",
      "Networking C-level exclusif",
      "Goodie bag premium",
    ],
    headliners: [
      { name: "Amara Diallo", title: "Performance live", avatar: "from-purple-500 to-pink-400", coverImage: "from-purple-600 to-pink-500", talentSlug: "amara-diallo", socials: "@amaradiallo" },
      { name: "Omar Benali", title: "MC & Présentateur", avatar: "from-violet-500 to-purple-400", coverImage: "from-violet-600 to-purple-500", talentSlug: "omar-benali", socials: "@omarbenali" },
      { name: "Grace Mwangi", title: "Comédienne & Actrice", avatar: "from-yellow-400 to-orange-400", coverImage: "from-yellow-500 to-orange-500", talentSlug: "grace-mwangi", socials: "@gracemwangi" },
    ],
    participants: [
      { name: "Omar Benali", role: "MC", avatar: "from-violet-500 to-purple-400", confirmed: true },
      { name: "Fatou Keita", role: "Invitée d'honneur", avatar: "from-emerald-500 to-teal-400", confirmed: true },
      { name: "Youssef Amine", role: "Directeur Orange Africa", avatar: "from-orange-500 to-red-400", confirmed: true },
      { name: "Amara Diallo", role: "Performance live", avatar: "from-purple-500 to-pink-400", confirmed: true },
      { name: "Grace Mwangi", role: "Humoriste", avatar: "from-yellow-400 to-orange-400", confirmed: false },
    ],
    gallery: [],
    tags: ["Gala", "Networking", "Casablanca", "Awards"],
  },
  {
    slug: "afro-digital-festival-nairobi",
    title: "Afro Digital Festival",
    subtitle: "Le festival des créateurs digitaux africains — Édition Nairobi",
    description:
      "Deux jours de conférences, panels et activations pour les créateurs de contenu et influenceurs africains. Avec des intervenants comme Omar Benali et Grace Mwangi, explorez les nouvelles frontières du contenu digital africain. Stands de marques, studio de création en direct et after-party exclusive.",
    type: "festival",
    status: "past",
    date: "12 Fév 2026",
    time: "10:00 – 22:00",
    location: "KICC, Nairobi",
    venue: "Kenyatta International Convention Centre",
    city: "Nairobi",
    country: "Kenya",
    image: "from-pink-700 via-fuchsia-600 to-purple-700",
    capacity: 500,
    spotsLeft: 0,
    invitationOnly: false,
    organizer: "AfricaShowbizRoom × Kenya Digital Hub",
    highlights: [
      "20+ panels et conférences",
      "Studio de création en direct",
      "Stands de 15 marques partenaires",
      "After-party exclusive",
      "Networking pass VIP",
    ],
    headliners: [
      { name: "Omar Benali", title: "Influenceur & Créateur Digital", avatar: "from-violet-500 to-purple-400", coverImage: "from-violet-600 to-purple-500", talentSlug: "omar-benali", socials: "@omarbenali" },
      { name: "Grace Mwangi", title: "Comédienne & Actrice", avatar: "from-yellow-400 to-orange-400", coverImage: "from-yellow-500 to-orange-500", talentSlug: "grace-mwangi", socials: "@gracemwangi" },
      { name: "Nia Okafor", title: "Danseuse & Chorégraphe", avatar: "from-rose-500 to-red-400", coverImage: "from-rose-600 to-red-500", talentSlug: "nia-okafor", socials: "@niaokafor" },
    ],
    participants: [
      { name: "Omar Benali", role: "Speaker", avatar: "from-violet-500 to-purple-400", confirmed: true },
      { name: "Grace Mwangi", role: "Speaker", avatar: "from-yellow-400 to-orange-400", confirmed: true },
      { name: "Nia Okafor", role: "Performance", avatar: "from-rose-500 to-red-400", confirmed: true },
    ],
    gallery: [
      { gradient: "from-pink-600 to-fuchsia-700", caption: "Keynote d'ouverture" },
      { gradient: "from-purple-600 to-indigo-700", caption: "Panel Créateurs" },
      { gradient: "from-amber-600 to-orange-600", caption: "Stand Samsung Africa" },
      { gradient: "from-teal-600 to-emerald-600", caption: "Studio en direct" },
      { gradient: "from-rose-600 to-red-600", caption: "After-party" },
      { gradient: "from-blue-600 to-violet-600", caption: "Networking VIP" },
    ],
    tags: ["Digital", "Influence", "Nairobi", "Festival"],
  },
];
