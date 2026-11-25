import { CalendarDays, CheckCircle2, Compass, MapPin, Search, ShieldCheck, Users } from 'lucide-react';
import { BRAND_INFO } from '../data/jatobaData';
import type { ModalitySlug, RegionSlug, SearchFilters } from '../types/expedition';

interface HeroSearchProps {
  filters: SearchFilters;
  onUpdateFilters: (patch: Partial<SearchFilters>) => void;
  totalMatches: number;
}

export function HeroSearch({ filters, onUpdateFilters, totalMatches }: HeroSearchProps) {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('roteiros');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickTabs: { label: string; region: RegionSlug; sub: string }[] = [
    { label: 'Todos os Destinos', region: 'todos', sub: '6 roteiros' },
    { label: 'Jalapão', region: 'jalapao', sub: 'Fervedouros & Dunas' },
    { label: 'Serras Gerais', region: 'serras-gerais', sub: 'Rio Azuis & Cânions' },
    { label: 'Travessia Conjugada', region: 'conjugado', sub: '7 dias completos' },
  ];

  return (
    <section className="relative bg-[#131917] text-[#FAF8F5] overflow-hidden border-b border-[#25302C]">
      {/* Editorial Background Image + High-Contrast Scrim */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="./images/hero-jalapao.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(19,25,23,0.82) 0%, rgba(19,25,23,0.74) 52%, rgba(19,25,23,0.97) 100%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16">
        {/* Top Tag + Real Social Authority */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0B6E69]/90 text-xs font-semibold tracking-wide uppercase text-white">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            Ecoturismo Receptivo 4x4 · Tocantins
          </span>
          <a
            href={BRAND_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/15 text-xs font-medium text-[#E5ECE9] transition-colors tabular-nums"
          >
            <span>Comunidade {BRAND_INFO.handle}:</span>
            <strong className="text-white">{BRAND_INFO.followers} seguidores</strong>
            <span>· {BRAND_INFO.postsCount} expedições publicadas</span>
          </a>
        </div>

        {/* Headline */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
            Compare e viva expedições completas pelo{' '}
            <span className="text-[#F47B50]">Jalapão e Serras Gerais</span>.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#D0D8D4] max-w-2xl leading-relaxed">
            Saídas de <strong className="text-white font-semibold">Palmas - TO</strong> em veículos
            4x4 preparados com hospedagem, alimentação regional completa e 100% dos atrativos já
            inclusos no pacote.
          </p>
        </div>

        {/* KAYAK-Inspired Category Tabs */}
        <div
          className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
          role="tablist"
          aria-label="Filtrar por região do Tocantins"
        >
          {quickTabs.map((tab) => {
            const active = filters.region === tab.region;
            return (
              <button
                key={tab.region}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onUpdateFilters({ region: tab.region })}
                className={`px-4 py-2.5 rounded-t-lg text-left transition-colors shrink-0 cursor-pointer border-b-2 ${
                  active
                    ? 'bg-white text-[#131917] border-[#D94E1F]'
                    : 'bg-white/10 text-[#E5ECE9] border-transparent hover:bg-white/15'
                }`}
              >
                <span className="block text-xs sm:text-sm font-bold">{tab.label}</span>
                <span
                  className={`block text-[11px] ${
                    active ? 'text-[#525E59]' : 'text-[#B2C0BA]'
                  }`}
                >
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* KAYAK-Inspired Multi-Segment Search Box */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white text-[#131917] rounded-b-xl rounded-tr-xl p-3 sm:p-3.5 shadow-xl border border-[#E4DFD5]"
          aria-label="Buscador de expedições"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5">
            {/* Segment 1: Região */}
            <div className="lg:col-span-3 bg-[#F6F4EF] hover:bg-[#EFECE4] transition-colors rounded-lg px-3.5 py-2.5 border border-transparent focus-within:border-[#D94E1F] focus-within:bg-white">
              <label
                htmlFor="hero-region"
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5A6560]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D94E1F]" aria-hidden="true" />
                Destino (Saída: Palmas)
              </label>
              <select
                id="hero-region"
                value={filters.region}
                onChange={(e) => onUpdateFilters({ region: e.target.value as RegionSlug })}
                className="mt-1 w-full bg-transparent text-sm font-bold text-[#131917] focus:outline-none cursor-pointer"
              >
                <option value="todos">Jalapão &amp; Serras Gerais (Todos)</option>
                <option value="jalapao">Parque Estadual do Jalapão</option>
                <option value="serras-gerais">Serras Gerais do Tocantins</option>
                <option value="conjugado">Combo Jalapão + Serras Gerais</option>
              </select>
            </div>

            {/* Segment 2: Duração */}
            <div className="lg:col-span-3 bg-[#F6F4EF] hover:bg-[#EFECE4] transition-colors rounded-lg px-3.5 py-2.5 border border-transparent focus-within:border-[#D94E1F] focus-within:bg-white">
              <label
                htmlFor="hero-duration"
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5A6560]"
              >
                <CalendarDays className="w-3.5 h-3.5 text-[#0B6E69]" aria-hidden="true" />
                Duração do Roteiro
              </label>
              <select
                id="hero-duration"
                value={filters.duration}
                onChange={(e) =>
                  onUpdateFilters({
                    duration: e.target.value as SearchFilters['duration'],
                  })
                }
                className="mt-1 w-full bg-transparent text-sm font-bold text-[#131917] focus:outline-none cursor-pointer tabular-nums"
              >
                <option value="todos">Qualquer duração (3 a 7 dias)</option>
                <option value="3">3 Dias / 2 Noites (Escapada)</option>
                <option value="4">4 Dias / 3 Noites (Clássico)</option>
                <option value="5+">5 a 7 Dias (Imersão Completa)</option>
              </select>
            </div>

            {/* Segment 3: Modalidade */}
            <div className="lg:col-span-2 bg-[#F6F4EF] hover:bg-[#EFECE4] transition-colors rounded-lg px-3.5 py-2.5 border border-transparent focus-within:border-[#D94E1F] focus-within:bg-white">
              <label
                htmlFor="hero-modality"
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5A6560]"
              >
                <Compass className="w-3.5 h-3.5 text-[#0B6E69]" aria-hidden="true" />
                Modalidade
              </label>
              <select
                id="hero-modality"
                value={filters.modality}
                onChange={(e) => onUpdateFilters({ modality: e.target.value as ModalitySlug })}
                className="mt-1 w-full bg-transparent text-sm font-bold text-[#131917] focus:outline-none cursor-pointer"
              >
                <option value="todos">Grupo ou Privativo</option>
                <option value="compartilhado">Grupo Compartilhado</option>
                <option value="privativo">4x4 Exclusivo Privativo</option>
              </select>
            </div>

            {/* Segment 4: Viajantes */}
            <div className="lg:col-span-2 bg-[#F6F4EF] hover:bg-[#EFECE4] transition-colors rounded-lg px-3.5 py-2.5 border border-transparent focus-within:border-[#D94E1F] focus-within:bg-white">
              <label
                htmlFor="hero-travelers"
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5A6560]"
              >
                <Users className="w-3.5 h-3.5 text-[#D94E1F]" aria-hidden="true" />
                Viajantes
              </label>
              <select
                id="hero-travelers"
                value={filters.travelers}
                onChange={(e) => onUpdateFilters({ travelers: Number(e.target.value) })}
                className="mt-1 w-full bg-transparent text-sm font-bold text-[#131917] focus:outline-none cursor-pointer tabular-nums"
              >
                <option value={1}>1 viajante (Solo)</option>
                <option value={2}>2 viajantes (Casal/Dupla)</option>
                <option value={3}>3 viajantes</option>
                <option value={4}>4 viajantes (4x4 Fechado)</option>
                <option value={6}>6+ viajantes (Grupo)</option>
              </select>
            </div>

            {/* Primary KAYAK-style Action Button */}
            <div className="sm:col-span-2 lg:col-span-2 flex">
              <button
                type="submit"
                className="w-full min-h-[54px] rounded-lg bg-[#D94E1F] hover:bg-[#B83D14] text-white font-extrabold text-sm px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm tabular-nums"
              >
                <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Ver {totalMatches} Roteiros</span>
              </button>
            </div>
          </div>
        </form>

        {/* All-Inclusive Pillars Bar (Jalapão Oficial Clarity) */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm text-[#DCE3DF]">
          {BRAND_INFO.pillars.map((pillar) => (
            <div
              key={pillar}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
            >
              <CheckCircle2 className="w-4 h-4 text-[#34B3A8] shrink-0" aria-hidden="true" />
              <span className="font-medium">{pillar}</span>
            </div>
          ))}
        </div>

        <p className="mt-3 text-xs text-[#9BA8A3] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#34B3A8] shrink-0" aria-hidden="true" />
          Operação local especializada no Tocantins — você só se preocupa em pousar em Palmas (PMW).
        </p>
      </div>
    </section>
  );
}
