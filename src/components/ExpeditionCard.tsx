import {
  BedDouble,
  Calendar,
  Check,
  Compass,
  GitCompareArrows,
  MapPin,
  Sparkles,
  TicketCheck,
  Utensils,
} from 'lucide-react';
import type { Expedition } from '../types/expedition';

interface ExpeditionCardProps {
  expedition: Expedition;
  isCompared: boolean;
  compareDisabled: boolean;
  onToggleCompare: (id: string) => void;
  onOpenDetails: (expedition: Expedition) => void;
  onSelectQuote: (expedition: Expedition) => void;
}

export function ExpeditionCard({
  expedition,
  isCompared,
  compareDisabled,
  onToggleCompare,
  onOpenDetails,
  onSelectQuote,
}: ExpeditionCardProps) {
  return (
    <article className="bg-white rounded-xl border border-[#E4DFD5] overflow-hidden flex flex-col hover:border-[#C7BFB0] transition-colors shadow-xs">
      {/* Visual Header */}
      <div className="relative aspect-[16/10] bg-[#1D2623] overflow-hidden">
        <img
          src={expedition.image}
          alt={expedition.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#131917]/90 text-white backdrop-blur-xs">
            {expedition.regionLabel}
          </span>
          {expedition.badge && (
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#D94E1F] text-white inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              {expedition.badge}
            </span>
          )}
        </div>

        {/* Duration Pill */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/95 text-[#131917] text-xs font-extrabold tabular-nums shadow-xs inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#0B6E69]" aria-hidden="true" />
          {expedition.days} Dias / {expedition.nights} Noites
        </div>

        {/* KAYAK-Style Compare Toggle */}
        <button
          type="button"
          disabled={compareDisabled && !isCompared}
          onClick={() => onToggleCompare(expedition.id)}
          aria-pressed={isCompared}
          title={
            compareDisabled && !isCompared
              ? 'Máximo de 3 roteiros para comparação'
              : 'Selecionar para comparar lado a lado'
          }
          className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
            isCompared
              ? 'bg-[#0B6E69] text-white'
              : compareDisabled
                ? 'bg-black/40 text-white/60 cursor-not-allowed'
                : 'bg-[#131917]/85 text-white hover:bg-[#131917]'
          }`}
        >
          {isCompared ? (
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <GitCompareArrows className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          <span>{isCompared ? 'Comparando' : 'Comparar'}</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 text-xs text-[#5A6560] font-medium">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#D94E1F]" aria-hidden="true" />
            Saída: {expedition.departureCity}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F2EFE9] text-[#3B4440] font-semibold">
            Trilha: {expedition.difficulty}
          </span>
        </div>

        <h3 className="mt-2 text-lg font-extrabold text-[#131917] leading-snug">
          {expedition.title}
        </h3>
        <p className="mt-1.5 text-sm text-[#4D5753] leading-relaxed line-clamp-2">
          {expedition.subtitle}
        </p>

        {/* Key Attractions Chips */}
        <div className="mt-4">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#68736E] mb-1.5">
            Destaques do Roteiro
          </span>
          <div className="flex flex-wrap gap-1.5">
            {expedition.mainAttractions.slice(0, 4).map((attr) => (
              <span
                key={attr}
                className="px-2 py-0.5 rounded text-xs font-medium bg-[#FAF8F5] border border-[#E4DFD5] text-[#2B3330]"
              >
                {attr}
              </span>
            ))}
            {expedition.mainAttractions.length > 4 && (
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[#E5F3F2] text-[#0B6E69] tabular-nums">
                +{expedition.mainAttractions.length - 4} atrativos
              </span>
            )}
          </div>
        </div>

        {/* All-Inclusive Strip */}
        <div className="mt-4 pt-3.5 border-t border-[#EEEAE2] grid grid-cols-4 gap-1 text-[11px] font-semibold text-[#3B4440]">
          <div className="flex flex-col items-center text-center gap-1 bg-[#FAF8F5] py-1.5 rounded">
            <Compass className="w-3.5 h-3.5 text-[#0B6E69]" aria-hidden="true" />
            <span>4x4 Incluso</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1 bg-[#FAF8F5] py-1.5 rounded">
            <BedDouble className="w-3.5 h-3.5 text-[#0B6E69]" aria-hidden="true" />
            <span>Pousadas</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1 bg-[#FAF8F5] py-1.5 rounded">
            <Utensils className="w-3.5 h-3.5 text-[#0B6E69]" aria-hidden="true" />
            <span>Refeições</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1 bg-[#FAF8F5] py-1.5 rounded">
            <TicketCheck className="w-3.5 h-3.5 text-[#0B6E69]" aria-hidden="true" />
            <span>Entradas</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 pt-1 grid grid-cols-2 gap-2.5 mt-auto">
          <button
            type="button"
            onClick={() => onOpenDetails(expedition)}
            className="py-2.5 px-3 rounded-lg border border-[#D4CEC2] text-xs sm:text-sm font-bold text-[#131917] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
          >
            Roteiro Dia a Dia
          </button>
          <button
            type="button"
            onClick={() => onSelectQuote(expedition)}
            className="py-2.5 px-3 rounded-lg bg-[#D94E1F] hover:bg-[#B83D14] text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer"
          >
            Consultar Datas
          </button>
        </div>
      </div>
    </article>
  );
}
