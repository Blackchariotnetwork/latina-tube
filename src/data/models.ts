export interface Model {
  id: string;
  name: string;
  origin: string;
  flag: string;
  city: string;
  age: number;
  scenesCount: number;
  views: string;
  followers: string;
  avatar: string;
  banner: string;
  bio: string;
  specialties: string[];
  measurements?: string;
}

export const MODELS_DATA: Model[] = [
  {
    id: "m1",
    name: "Valentina Rivas",
    origin: "Colombia",
    flag: "🇨🇴",
    city: "Medellín",
    age: 24,
    scenesCount: 16,
    views: "4.8M",
    followers: "890K",
    avatar: "/src/assets/images/latina_model_valentina_1794487125326.jpg",
    banner: "/src/assets/images/latina_hero_banner_1794487123475.jpg",
    bio: "Renowned across South America for her commanding gaze, golden sun-kissed skin, and magnetic charisma. Valentina is a premier exclusive creator specializing in cinematic solo productions, panoramic balcony captures, and ultra high-definition rooftop suite experiences in El Poblado, Medellín.",
    specialties: ["Penthouse Suites", "Golden Hour Glamour", "Ultra HD 4K", "Balcony Skyline"]
  },
  {
    id: "m2",
    name: "Camila Santos",
    origin: "Brazil",
    flag: "🇧🇷",
    city: "Rio de Janeiro",
    age: 25,
    scenesCount: 22,
    views: "6.2M",
    followers: "1.2M",
    avatar: "/src/assets/images/latina_model_camila_1794487126937.jpg",
    banner: "/src/assets/images/latina_scene_thumb_1794487125829.jpg",
    bio: "Directly from the sun-drenched shores of Ipanema, Camila embodies authentic Rio beach vibrancy and effortless Brazilian elegance. A top-ranked headliner whose releases regularly dominate trending lists with upbeat tropical atmosphere and cinematic 60FPS fluidity.",
    specialties: ["Copacabana Vibes", "Beachfront Cabanas", "60FPS Motion", "Tropical Summer"]
  },
  {
    id: "m3",
    name: "Sofia Navarro",
    origin: "Cuba",
    flag: "🇨🇺",
    city: "Havana",
    age: 23,
    scenesCount: 12,
    views: "3.1M",
    followers: "650K",
    avatar: "/src/assets/images/latina_model_sofia_1794487124819.jpg",
    banner: "/src/assets/images/latina_hero_banner_1794487123475.jpg",
    bio: "A classically trained modern dancer who combines vintage Havana charm with modern luxury production. Sofia captures intimate retro aesthetics, rich velvet lounges, and golden dusk balcony sessions that exude timeless Caribbean sophistication.",
    specialties: ["Vintage Hotel Suites", "Sultry Velvet Lounges", "Rhythmic Elegance", "Midnight Moods"]
  },
  {
    id: "m4",
    name: "Catalina Gomez",
    origin: "Colombia",
    flag: "🇨🇴",
    city: "Cali",
    age: 24,
    scenesCount: 14,
    views: "3.9M",
    followers: "720K",
    avatar: "/src/assets/images/latina_model_valentina_1794487125326.jpg",
    banner: "/src/assets/images/latina_scene_thumb_1794487125829.jpg",
    bio: "Hailing from Cali, the world capital of rhythm and salsa, Catalina pairs athletic poise with warmth and unforgettable stage presence. Her high-energy private rehearsals and poolside retreat shoots are staples of the VIP network.",
    specialties: ["Poolside Retreats", "Salsa Aesthetics", "Lush Villas", "Natural Sunlight"]
  },
  {
    id: "m5",
    name: "Paloma Cruz",
    origin: "Puerto Rico",
    flag: "🇵🇷",
    city: "Miami / San Juan",
    age: 26,
    scenesCount: 28,
    views: "8.4M",
    followers: "1.7M",
    avatar: "/src/assets/images/latina_model_camila_1794487126937.jpg",
    banner: "/src/assets/images/latina_scene_thumb_1794487125829.jpg",
    bio: "Splitting time between Condado and South Beach, Paloma commands mega-yacht decks, Biscayne Bay sunsets, and sleek marble penthouses. Her releases set the benchmark for luxury Latin cinematography with multi-camera HDR setups.",
    specialties: ["Yacht Exclusives", "South Beach Glam", "Biscayne Bay Sunset", "VIP Penthouse"]
  },
  {
    id: "m6",
    name: "Isabella Morales",
    origin: "Mexico",
    flag: "🇲🇽",
    city: "Cancún / CDMX",
    age: 25,
    scenesCount: 15,
    views: "4.1M",
    followers: "810K",
    avatar: "/src/assets/images/latina_model_sofia_1794487124819.jpg",
    banner: "/src/assets/images/latina_hero_banner_1794487123475.jpg",
    bio: "From upscale Polanco ateliers to Caribbean shoreline villas in Riviera Maya, Isabella brings high-contrast modern fashion aesthetics and sultry desert-dusk atmospheres to every session.",
    specialties: ["Riviera Maya Resort", "Modern Atelier", "Cenote Escapes", "Warm Amber Sunset"]
  }
];
