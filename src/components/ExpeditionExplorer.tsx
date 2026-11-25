import { ArrowUpDown, FilterX, GitCompareArrows, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import type { Expedition, SearchFilters } from '../types/expedition';
import { ExpeditionCard } from './ExpeditionCard';

interface ExpeditionExplorerProps {
  expeditions: Expedition[];
  filters: SearchFilters;
  onUpdateFilters: (patch: Partial<SearchFilters>) => void;
  onResetFilters: () => void;
  compareIds: string[];
  onToggleCompare: (id: string) => void;
  onClearCompare: () => void;
  onOpenCompare: () => void;
  onOpenDetails: (expedition: Expedition) => void;
  onSelectQuote: (expedition: Expedition) => void;
}

type SortKey = 'recommended' | 'days-asc' | 'days-desc';

export function ExpeditionExplorer({
  expeditions,
  filters,
  onUpdateFilters,
  onResetFilters,
  compareIds,
  onToggleCompare,
  onClearCompare,
  onOpenCompare,
  onOpenDetails,
  onSelectQuote,
}: ExpeditionExplorerProps) {
  const [sortBy, setSortBy] = useState<SortKey>('recommended');

  const sorted = [...expeditions].sort((a, b) => {
    if (sortBy === 'days-asc') return a.days - b.days;
    if (sortBy === 'days-desc') return b.days - a.days;
    return b.featuredScore - a.featuredScore;
  });

  const hasActiveFilters =
    filters.region !== 'todos' ||
    filters.duration !== 'todos' ||
    filters.modality !== 'todos' ||
    filters.query.trim() !== '';

  return (
    <section id="roteiros" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header + KAYAK Filter/Sort Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E69]">
            Roteiros Completos · Saídas de Palmas - TO
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#131917]">
            Escolha sua Expedição 4x4 no Tocantins
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#4D5753]">
            Selecione até 3 pacotes em <strong>Comparar</strong> para analisar lado a lado atrativos,
            cidades-base e ritmo da viagem.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="search"
              value={filters.query}
              onChange={(e) => onUpdateFilters({ query: e.target.value })}
              placeholder="Filtrar atrativo (ex: Rio Azuis, Dunas)..."
              aria-label="Filtrar roteiros por nome de atrativo"
              className="w-64 sm:w-72 px-3.5 py-2 rounded-lg bg-white border border-[#D4CEC2] text-sm text-[#131917] placeholder:text-[#7A8580] focus:outline-none focus:border-[#D94E1F]"
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-white border border-[#D4CEC2] rounded-lg px-3 py-2">
            <ArrowUpDown className="w-4 h-4 text-[#5A6560]" aria-hidden="true" />
            <label htmlFor="sort-expeditions" className="sr-only">
              Ordenar roteiros
            </label>
            <select
              id="sort-expeditions"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-transparent text-sm font-semibold text-[#131917] focus:outline-none cursor-pointer"
            >
              <option value="recommended">Ordenar: Mais Procurados</option>
              <option value="days-asc">Menor Duração (3 → 7 dias)</option>
              <option value="days-desc">Maior Imersão (7 → 3 dias)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#4D5753] tabular-nums">
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            Exibindo {sorted.length} roteiro(s)
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F2EFE9] hover:bg-[#E6E1D8] text-[#131917] font-semibold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-[#D94E1F]" aria-hidden="true" />
              Limpar filtros
            </button>
          )}
        </div>

        <span className="text-xs text-[#5A6560]">
          Todos os pacotes incluem: <strong>4x4 + Alimentação + Pousada + Entradas</strong>
        </span>
      </div>

      {/* Results Grid or Meaningful Empty State */}
      {sorted.length === 0 ? (
        <div
          role="status"
          className="mt-8 bg-white border border-[#E4DFD5] rounded-xl p-10 text-center max-w-xl mx-auto"
        >
          <FilterX className="w-10 h-10 text-[#D94E1F] mx-auto" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-bold text-[#131917]">
            Nenhum roteiro com essa combinação exata
          </h3>
          <p className="mt-1.5 text-sm text-[#4D5753]">
            Também montamos expedições 4x4 personalizadas sob medida para o seu grupo saindo de
            Palmas - TO. Limpe os filtros para ver todas as opções.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#D94E1F] hover:bg-[#B83D14] text-white text-sm font-bold cursor-pointer"
          >
            Mostrar Todos os 6 Roteiros
          </button>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((exp) => (
            <ExpeditionCard
              key={exp.id}
              expedition={exp}
              isCompared={compareIds.includes(exp.id)}
              compareDisabled={compareIds.length >= 3}
              onToggleCompare={onToggleCompare}
              onOpenDetails={onOpenDetails}
              onSelectQuote={onSelectQuote}
            />
          ))}
        </div>
      )}

      {/* Floating KAYAK-Style Comparison Tray */}
      {compareIds.length > 0 && (
        <div
          role="region"
          aria-label="Bandeja de comparação de roteiros"
          className="fixed bottom-4 left-4 right-4 z-30 max-w-3xl mx-auto bg-[#131917] text-white rounded-xl p-3.5 sm:px-5 shadow-2xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0B6E69] flex items-center justify-center shrink-0">
              <GitCompareArrows className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold tabular-nums">
                {compareIds.length} de 3 roteiro(s) selecionado(s) para comparar
              </p>
              <p className="text-xs text-[#B2C0BA]">
                {compareIds.length < 2
                  ? 'Selecione pelo menos mais 1 roteiro para comparar lado a lado'
                  : 'Pronto! Compare duração, cidades-base e atrativos'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClearCompare}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-[#D0D8D4] hover:bg-white/10 cursor-pointer"
            >
              Limpar
            </button>
            <button
              type="button"
              disabled={compareIds.length < 2}
              onClick={onOpenCompare}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                compareIds.length >= 2
                  ? 'bg-[#D94E1F] hover:bg-[#B83D14] text-white'
                  : 'bg-white/15 text-white/50 cursor-not-allowed'
              }`}
            >
              Comparar Agora
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
