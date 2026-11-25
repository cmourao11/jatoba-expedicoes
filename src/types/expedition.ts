export type RegionSlug = 'todos' | 'jalapao' | 'serras-gerais' | 'conjugado';

export type ModalitySlug = 'todos' | 'compartilhado' | 'privativo';

export type TrailDifficulty = 'Leve' | 'Leve a Moderado' | 'Moderado';

export interface DayPlan {
  day: number;
  title: string;
  baseCity: string;
  description: string;
  highlights: string[];
}

export interface Expedition {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  region: Exclude<RegionSlug, 'todos'>;
  regionLabel: string;
  days: number;
  nights: number;
  departureCity: string;
  modalities: Exclude<ModalitySlug, 'todos'>[];
  difficulty: TrailDifficulty;
  badge?: string;
  featuredScore: number;
  image: string;
  imageAlt: string;
  idealFor: string;
  mainAttractions: string[];
  baseCities: string[];
  mealsCount: string;
  itinerary: DayPlan[];
}

export interface Attraction {
  id: string;
  name: string;
  municipality: string;
  region: 'Jalapão' | 'Serras Gerais';
  tag: string;
  image: string;
  description: string;
  guideTip: string;
}

export interface SeasonMonth {
  month: string;
  short: string;
  seasonType: 'seca' | 'transicao' | 'verde';
  seasonLabel: string;
  waterClarity: number; // 1-5
  waterfallVolume: number; // 1-5
  crowdLevel: 'Baixo' | 'Moderado' | 'Alto';
  avgTemp: string;
  summary: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Logística' | 'Pacotes' | 'Bagagem' | 'Reservas';
}

export interface SearchFilters {
  region: RegionSlug;
  duration: 'todos' | '3' | '4' | '5+';
  modality: ModalitySlug;
  travelers: number;
  query: string;
}
