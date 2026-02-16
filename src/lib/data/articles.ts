/* -------------------------------------------------------
 * Données mock des articles éditoriaux (sera remplacé par l'API)
 * ----------------------------------------------------- */

export type ArticleType = "portrait" | "interview" | "reportage" | "impact";

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar: string; // gradient placeholder
}

export interface ArticleGalleryItem {
  gradient: string;
  caption: string;
}

export interface ArticleVideo {
  gradient: string; // thumbnail placeholder
  title: string;
  duration: string; // ex : "12:34"
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  type: ArticleType;
  coverImage: string; // gradient placeholder
  author: ArticleAuthor;
  publishedAt: string; // ex : "12 Fév 2026"
  readingTime: string; // ex : "8 min"
  featured: boolean;
  tags: string[];
  content: ArticleContentBlock[];
  gallery: ArticleGalleryItem[];
  video?: ArticleVideo;
  relatedSlugs: string[];
}

export type ArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; author: string }
  | { type: "image"; gradient: string; caption: string };

export const articleTypes: { value: string; label: string; color: string }[] = [
  { value: "all", label: "Tous", color: "bg-amber-400" },
  { value: "portrait", label: "Portraits", color: "bg-purple-500" },
  { value: "interview", label: "Interviews", color: "bg-blue-500" },
  { value: "reportage", label: "Reportages", color: "bg-emerald-500" },
  { value: "impact", label: "Impact", color: "bg-rose-500" },
];

export const articleTypeConfig: Record<ArticleType, { label: string; color: string; gradient: string }> = {
  portrait: { label: "Portrait", color: "bg-purple-500", gradient: "from-purple-500 to-violet-600" },
  interview: { label: "Interview", color: "bg-blue-500", gradient: "from-blue-500 to-indigo-600" },
  reportage: { label: "Reportage", color: "bg-emerald-500", gradient: "from-emerald-500 to-teal-600" },
  impact: { label: "Impact", color: "bg-rose-500", gradient: "from-rose-500 to-red-600" },
};

export const articles: Article[] = [
  {
    slug: "amara-diallo-teranga-soul",
    title: "Amara Diallo : la voix qui réinvente la Teranga Soul",
    excerpt:
      "Portrait intimiste d'une artiste sénégalaise qui mêle soul, afrobeats et mbalax pour créer un son unique. De Dakar aux scènes internationales, plongée dans l'univers d'Amara Diallo.",
    type: "portrait",
    coverImage: "from-purple-700 via-violet-600 to-pink-600",
    author: {
      name: "Sophie Mbengue",
      role: "Rédactrice en chef",
      avatar: "from-purple-500 to-pink-400",
    },
    publishedAt: "10 Fév 2026",
    readingTime: "12 min",
    featured: true,
    tags: ["Musique", "Sénégal", "Soul", "Afrobeats"],
    content: [
      { type: "paragraph", text: "C'est dans un studio modeste de Dakar, entre les murs couverts de tissu wax et les enceintes qui vibrent doucement, que nous rencontrons Amara Diallo. La chanteuse, révélée en 2024 par ses reprises virales, prépare son deuxième album dans une atmosphère de concentration et de joie créative." },
      { type: "heading", text: "De Dakar au monde" },
      { type: "paragraph", text: "Née dans le quartier populaire de la Médina, Amara a grandi bercée par les chants de sa grand-mère griotte et les vinyles de Youssou N'Dour que son père écoutait en boucle. « La musique n'était pas un choix, c'était l'air que je respirais », confie-t-elle avec un sourire lumineux." },
      { type: "image", gradient: "from-amber-600 to-orange-500", caption: "Amara dans son studio à Dakar — Photo : Kofi Mensah" },
      { type: "paragraph", text: "Son premier album 'Teranga Soul', sorti en septembre 2025, a été une déflagration. Mêlant le mbalax traditionnel aux arrangements soul contemporains, avec des touches d'afrobeats venu de Lagos, le disque a immédiatement trouvé son public. Plus de 15 millions de streams en trois mois, une nomination aux AFRIMA Awards, et des invitations à jouer de Londres à Johannesburg." },
      { type: "quote", text: "Je ne fais pas de la fusion pour être moderne. Je fais de la fusion parce que c'est ce que je suis : une Africaine du XXIe siècle.", author: "Amara Diallo" },
      { type: "heading", text: "L'ADN AfricaShowbizRoom" },
      { type: "paragraph", text: "Amara Diallo incarne parfaitement la vision d'AfricaShowbizRoom : un talent brut, éditorialisé et mis en avant avec soin. Son profil sur la plateforme lui a permis de connecter avec trois marques majeures pour des collaborations authentiques, loin du placement de produit artificiel." },
      { type: "paragraph", text: "« AfricaShowbizRoom comprend que les artistes africains ne sont pas des supports publicitaires, mais des créateurs de culture. C'est cette approche qui m'a convaincue de rejoindre la plateforme », explique-t-elle en rangeant ses notes de studio." },
    ],
    gallery: [
      { gradient: "from-purple-700 to-pink-600", caption: "Concert Dakar Arena 2025" },
      { gradient: "from-amber-600 to-red-500", caption: "Shooting presse" },
      { gradient: "from-blue-600 to-purple-600", caption: "En studio" },
      { gradient: "from-emerald-600 to-teal-500", caption: "Festival MASA Abidjan" },
      { gradient: "from-pink-500 to-rose-600", caption: "Backstage" },
    ],
    video: {
      gradient: "from-purple-600 to-indigo-700",
      title: "Amara Diallo — 'Teranga' (Clip officiel)",
      duration: "4:23",
    },
    relatedSlugs: ["mode-africaine-revolution", "afrobeats-global-impact"],
  },
  {
    slug: "kofi-mensah-regard-afrique",
    title: "Interview : Kofi Mensah, le regard qui sublime l'Afrique",
    excerpt:
      "Rencontre avec le réalisateur et photographe ghanéen dont l'esthétique afrofuturiste redéfinit la narration visuelle du continent. Entre clips, documentaires et mode, il nous livre sa vision.",
    type: "interview",
    coverImage: "from-amber-700 via-orange-600 to-red-700",
    author: {
      name: "Kwame Asante",
      role: "Journaliste culture",
      avatar: "from-amber-500 to-orange-400",
    },
    publishedAt: "05 Fév 2026",
    readingTime: "10 min",
    featured: false,
    tags: ["Cinéma", "Photographie", "Ghana", "Afrofuturisme"],
    content: [
      { type: "paragraph", text: "Kofi Mensah nous reçoit dans son studio d'Accra, un espace baigné de lumière naturelle où chaque mur raconte une histoire. Des polaroids de tournage côtoient des affiches de films africains classiques, et une caméra RED Dragon trône sur son bureau comme un totem." },
      { type: "heading", text: "L'esthétique comme arme" },
      { type: "quote", text: "Pendant trop longtemps, l'Afrique a été filmée à travers un filtre misérabiliste. Mon travail, c'est de montrer la beauté, la modernité, la complexité de notre continent.", author: "Kofi Mensah" },
      { type: "paragraph", text: "À 32 ans, Kofi a déjà réalisé plus de 80 clips musicaux, trois documentaires primés et une dizaine de campagnes pour des marques internationales. Son style se reconnaît immédiatement : des compositions cinématographiques léchées, une palette colorimétrique riche, et toujours ce sens du détail qui transforme chaque image en œuvre d'art." },
      { type: "image", gradient: "from-teal-600 to-cyan-500", caption: "Sur le tournage de 'Gold Coast Stories' — Accra, 2025" },
      { type: "paragraph", text: "Sa collaboration avec AfricaShowbizRoom a commencé naturellement. « C'est la seule plateforme qui comprend que la curation est essentielle. On ne met pas tous les créatifs dans le même sac. Chaque profil est traité comme une story éditoriale », souligne-t-il." },
    ],
    gallery: [
      { gradient: "from-amber-700 to-red-600", caption: "Tournage clip Lagos" },
      { gradient: "from-teal-600 to-cyan-500", caption: "Portrait editorial" },
      { gradient: "from-rose-600 to-pink-500", caption: "Fashion Week Accra" },
    ],
    video: {
      gradient: "from-amber-600 to-red-700",
      title: "Kofi Mensah — Showreel 2025",
      duration: "3:45",
    },
    relatedSlugs: ["amara-diallo-teranga-soul", "mode-africaine-revolution"],
  },
  {
    slug: "mode-africaine-revolution",
    title: "La mode africaine à la conquête du monde : reportage au cœur de la révolution",
    excerpt:
      "De Lagos à Paris, de Dakar à Milan, les créateurs africains imposent leur vision sur les podiums internationaux. Enquête sur une révolution mode en marche.",
    type: "reportage",
    coverImage: "from-emerald-700 via-teal-600 to-cyan-700",
    author: {
      name: "Aïcha Traoré",
      role: "Correspondante mode",
      avatar: "from-emerald-500 to-teal-400",
    },
    publishedAt: "28 Jan 2026",
    readingTime: "15 min",
    featured: true,
    tags: ["Mode", "International", "Créateurs", "Fashion Week"],
    content: [
      { type: "paragraph", text: "Il est 6h du matin à Lagos, et dans l'atelier d'Adebayo Fashions, une dizaine de couturières s'activent déjà. Dans moins de 72 heures, la collection sera présentée à la Fashion Week de Paris. Un scénario impensable il y a encore dix ans, mais qui est devenu la norme pour une nouvelle génération de créateurs africains." },
      { type: "heading", text: "L'Afrique, nouvelle terre promise de la mode" },
      { type: "paragraph", text: "Les chiffres parlent d'eux-mêmes : le marché de la mode en Afrique pèse aujourd'hui 31 milliards de dollars et devrait atteindre 50 milliards d'ici 2030. Mais au-delà des chiffres, c'est un changement de paradigme culturel qui s'opère. Les créateurs africains ne cherchent plus à imiter les maisons occidentales — ils imposent leur propre vocabulaire esthétique." },
      { type: "image", gradient: "from-pink-600 to-rose-500", caption: "Fashion Week Lagos 2025 — Photo : Kofi Mensah" },
      { type: "quote", text: "Nous n'avons pas besoin de la validation de Paris ou Milan. Nous créons pour nous-mêmes, et le monde suit.", author: "Fatou Keita, mannequin et ambassadrice" },
      { type: "heading", text: "Le rôle des plateformes" },
      { type: "paragraph", text: "Des plateformes comme AfricaShowbizRoom jouent un rôle crucial dans cette révolution en offrant une vitrine premium aux créateurs. « La curation éditoriale fait toute la différence. Ce n'est pas un catalogue, c'est un magazine vivant qui raconte nos histoires », témoigne Imane Ayissi, designer camerounais de renom." },
      { type: "paragraph", text: "Le reportage continue avec Fatou Keita, mannequin ivoirienne et l'un des visages les plus demandés de la mode africaine contemporaine. Son parcours illustre parfaitement la trajectoire d'une industrie en pleine maturité." },
    ],
    gallery: [
      { gradient: "from-emerald-700 to-teal-600", caption: "Atelier Lagos" },
      { gradient: "from-amber-600 to-yellow-500", caption: "Fashion Week Paris" },
      { gradient: "from-pink-600 to-rose-500", caption: "Défilé Imane Ayissi" },
      { gradient: "from-blue-600 to-indigo-500", caption: "Coulisses Dakar" },
      { gradient: "from-violet-600 to-purple-500", caption: "Expo textiles Kigali" },
      { gradient: "from-teal-600 to-cyan-500", caption: "Atelier tissage" },
    ],
    relatedSlugs: ["kofi-mensah-regard-afrique", "afrobeats-global-impact"],
  },
  {
    slug: "afrobeats-global-impact",
    title: "Impact : Comment l'Afrobeats a conquis les charts mondiaux",
    excerpt:
      "Analyse de l'impact économique et culturel de l'afrobeats sur l'industrie musicale mondiale. Chiffres, témoignages et projections pour la décennie à venir.",
    type: "impact",
    coverImage: "from-rose-700 via-red-600 to-orange-700",
    author: {
      name: "Tunde Okonkwo",
      role: "Analyste industrie musicale",
      avatar: "from-rose-500 to-red-400",
    },
    publishedAt: "20 Jan 2026",
    readingTime: "18 min",
    featured: true,
    tags: ["Musique", "Économie", "Impact", "Global"],
    content: [
      { type: "paragraph", text: "En 2025, l'afrobeats représentait 8% des écoutes mondiales sur les plateformes de streaming, contre à peine 1% en 2018. Une croissance fulgurante qui redéfinit les rapports de force dans l'industrie musicale globale et positionne l'Afrique comme le nouveau centre névralgique de la musique populaire." },
      { type: "heading", text: "Les chiffres de la révolution" },
      { type: "paragraph", text: "Le marché de la musique en Afrique subsaharienne a atteint 1,2 milliard de dollars en 2025, porté par le streaming, les concerts et les partenariats de marques. Lagos, Accra, Nairobi et Johannesburg sont devenues des capitales musicales mondiales, attirant producteurs, labels et investisseurs du monde entier." },
      { type: "image", gradient: "from-amber-600 to-orange-500", caption: "Infographie : La croissance de l'Afrobeats 2018-2026" },
      { type: "quote", text: "L'Afrique ne suit plus les tendances. L'Afrique crée les tendances que le monde suit.", author: "Yemi Adebayo, producteur" },
      { type: "heading", text: "L'effet plateforme" },
      { type: "paragraph", text: "Les plateformes de mise en relation comme AfricaShowbizRoom accélèrent cette dynamique en connectant directement les artistes africains aux marques internationales. En 2025, les collaborations marques-artistes facilitées par la plateforme ont généré un impact économique estimé à 2,3 millions de dollars pour les talents du continent." },
      { type: "paragraph", text: "L'avenir s'annonce radieux : avec une population jeune et hyperconnectée, l'Afrique est en passe de devenir le premier marché mondial du divertissement d'ici 2040. L'afrobeats n'est que le premier acte d'une révolution culturelle bien plus vaste." },
    ],
    gallery: [
      { gradient: "from-rose-700 to-red-600", caption: "Concert Afrobeats à Londres" },
      { gradient: "from-amber-600 to-orange-600", caption: "Studio Lagos" },
      { gradient: "from-purple-600 to-indigo-600", caption: "Festival Nyege Nyege" },
    ],
    video: {
      gradient: "from-rose-600 to-orange-700",
      title: "L'Afrobeats en chiffres — Documentaire ASR",
      duration: "15:20",
    },
    relatedSlugs: ["amara-diallo-teranga-soul", "kofi-mensah-regard-afrique"],
  },
  {
    slug: "nairobi-tech-creative-scene",
    title: "Nairobi : quand la tech rencontre la créativité africaine",
    excerpt:
      "Reportage au cœur de la scène tech-créative de Nairobi où développeurs, artistes et entrepreneurs réinventent le divertissement africain.",
    type: "reportage",
    coverImage: "from-blue-700 via-indigo-600 to-violet-700",
    author: {
      name: "Grace Wanjiku",
      role: "Correspondante Afrique de l'Est",
      avatar: "from-blue-500 to-indigo-400",
    },
    publishedAt: "15 Jan 2026",
    readingTime: "11 min",
    featured: false,
    tags: ["Tech", "Nairobi", "Innovation", "Digital"],
    content: [
      { type: "paragraph", text: "Nairobi est en pleine ébullition créative. Dans les espaces de coworking de Westlands, les studios de Kilimani et les incubateurs de Ngong Road, une nouvelle génération de créateurs africains fusionne technologie et art pour inventer le divertissement de demain." },
      { type: "heading", text: "Silicon Savannah meets Showbiz" },
      { type: "paragraph", text: "La « Silicon Savannah » — surnom donné à l'écosystème tech de Nairobi — ne se contente plus de produire des fintech et des agritech. Elle s'attaque désormais au divertissement avec des startups qui utilisent l'IA, la réalité augmentée et la blockchain pour transformer la création, la distribution et la monétisation du contenu africain." },
      { type: "quote", text: "Nairobi est le laboratoire où se construit le futur du divertissement africain. Ici, un codeur peut aussi être un artiste, et un artiste peut aussi être un entrepreneur.", author: "Grace Mwangi, comédienne et entrepreneuse" },
      { type: "paragraph", text: "AfricaShowbizRoom a choisi Nairobi pour son hub Afrique de l'Est, reconnaissant la ville comme un carrefour incontournable de la créativité continentale." },
    ],
    gallery: [
      { gradient: "from-blue-700 to-indigo-600", caption: "Hub tech Nairobi" },
      { gradient: "from-emerald-600 to-teal-500", caption: "Studio de création" },
      { gradient: "from-amber-600 to-orange-500", caption: "Coworking Westlands" },
    ],
    relatedSlugs: ["afrobeats-global-impact", "omar-benali-digital-creator"],
  },
  {
    slug: "omar-benali-digital-creator",
    title: "Omar Benali : l'art de connecter l'Afrique au digital",
    excerpt:
      "Portrait du créateur de contenu marocain qui a bâti une audience de 800K abonnés en racontant l'Afrique moderne, innovante et connectée.",
    type: "portrait",
    coverImage: "from-violet-700 via-purple-600 to-fuchsia-700",
    author: {
      name: "Leila Bennani",
      role: "Rédactrice digital",
      avatar: "from-violet-500 to-purple-400",
    },
    publishedAt: "08 Jan 2026",
    readingTime: "9 min",
    featured: false,
    tags: ["Digital", "Maroc", "Influence", "Contenu"],
    content: [
      { type: "paragraph", text: "Omar Benali filme depuis son appartement de Casablanca avec vue sur l'Atlantique. Mais sa portée, elle, s'étend sur tout le continent. Avec 820 000 abonnés cumulés sur ses plateformes, ce créateur de 28 ans est devenu l'une des voix les plus influentes de la nouvelle génération africaine digitale." },
      { type: "heading", text: "Raconter l'Afrique autrement" },
      { type: "paragraph", text: "« Mon objectif n'a jamais été les followers. Mon objectif, c'est de montrer une Afrique que les médias traditionnels ignorent : innovante, drôle, ambitieuse, connectée », explique Omar en montrant son setup de tournage — un bureau impeccable avec ring light, micro et deux écrans." },
      { type: "quote", text: "Chaque vidéo est une lettre d'amour à l'Afrique que je connais. Pas celle des clichés, mais celle qui code, qui crée, qui rêve grand.", author: "Omar Benali" },
      { type: "paragraph", text: "Sur AfricaShowbizRoom, Omar fait le lien entre les marques tech et la communauté créative. Ses partenariats sont sélectionnés avec soin — uniquement des marques qui partagent sa vision d'une Afrique moderne et ambitieuse." },
    ],
    gallery: [
      { gradient: "from-violet-700 to-purple-600", caption: "Studio Casablanca" },
      { gradient: "from-amber-600 to-orange-500", caption: "Tournage YouTube" },
      { gradient: "from-blue-600 to-cyan-500", caption: "CES Africa" },
    ],
    video: {
      gradient: "from-violet-600 to-fuchsia-700",
      title: "Omar Benali — 'L'Afrique connectée' (Vlog)",
      duration: "18:42",
    },
    relatedSlugs: ["nairobi-tech-creative-scene", "amara-diallo-teranga-soul"],
  },
];
