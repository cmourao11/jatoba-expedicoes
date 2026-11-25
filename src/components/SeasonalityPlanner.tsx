import { Droplets, Sun, Thermometer, Users } from 'lucide-react';
import { useState } from 'react';
import { SEASON_MONTHS } from '../data/jatobaData';

interface SeasonalityPlannerProps {
  onPickMonthForQuote: (monthName: string) => void;
}

export function SeasonalityPlanner({ onPickMonthForQuote }: SeasonalityPlannerProps) {
  const [selectedIdx, setSelectedIdx] = useState(4); // Maio default (Abertura da Seca Cristalina)
  const current = SEASON_MONTHS[selectedIdx];

  return (
    <section id="quando-ir" className="bg-[#131917] text-[#FAF8F5] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F47B50]">
            Planejador Inteligente de Temporada
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Qual a melhor época para ir ao Jalapão e Serras Gerais?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#C9D1CE]">
            Faz sol o ano inteiro no Tocantins e os fervedouros nunca turvam. Clique em cada mês
            abaixo para comparar transparência dos rios, volume das cachoeiras e movimento.
          </p>
        </div>

        {/* KAYAK-Style 12-Month Selector Bar */}
        <div
          className="mt-8 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2"
          role="tablist"
          aria-label="Meses do ano"
        >
          {SEASON_MONTHS.map((item, idx) => {
            const active = idx === selectedIdx;
            const indicatorColor =
              item.seasonType === 'seca'
                ? 'bg-[#34B3A8]'
                : item.seasonType === 'transicao'
                  ? 'bg-[#E5A93B]'
                  : 'bg-[#5CB85C]';

            return (
              <button
                key={item.short}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedIdx(idx)}
                className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                  active
                    ? 'bg-white text-[#131917] border-[#D94E1F]'
                    : 'bg-white/5 text-[#DCE3DF] border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="block text-xs font-extrabold tabular-nums">{item.short}</span>
                <span className="mt-2 flex items-center gap-1 text-[11px] opacity-80 tabular-nums">
                  <span className={`w-2 h-2 rounded-full ${indicatorColor}`} />
                  {item.avgTemp}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Month Detail Panel */}
        <div className="mt-6 bg-[#1C2421] border border-white/10 rounded-xl p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#0B6E69] text-white text-xs font-bold">
                {current.seasonLabel}
              </span>
              <span className="text-xs text-[#9BA8A3] font-medium">
                Mês selecionado: <strong className="text-white">{current.month}</strong>
              </span>
            </div>
            <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-white">
              Como é viajar em {current.month}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#D0D8D4] leading-relaxed">
              {current.summary}
            </p>
            <button
              type="button"
              onClick={() => onPickMonthForQuote(current.month)}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#D94E1F] hover:bg-[#B83D14] text-white text-sm font-bold transition-colors cursor-pointer"
            >
              Consultar Saídas para {current.month}
            </button>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="bg-[#131917] border border-white/10 rounded-lg p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-[#9BA8A3]">
                <Droplets className="w-4 h-4 text-[#34B3A8]" aria-hidden="true" />
                <span>Transparência</span>
              </div>
              <p className="mt-1.5 text-base font-extrabold text-white tabular-nums">
                {current.waterClarity}/5 · Cristalina
              </p>
            </div>

            <div className="bg-[#131917] border border-white/10 rounded-lg p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-[#9BA8A3]">
                <Sun className="w-4 h-4 text-[#E5A93B]" aria-hidden="true" />
                <span>Volume Cachoeiras</span>
              </div>
              <p className="mt-1.5 text-base font-extrabold text-white tabular-nums">
                {current.waterfallVolume}/5 · Intenso
              </p>
            </div>

            <div className="bg-[#131917] border border-white/10 rounded-lg p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-[#9BA8A3]">
                <Thermometer className="w-4 h-4 text-[#F47B50]" aria-hidden="true" />
                <span>Média Diurna</span>
              </div>
              <p className="mt-1.5 text-base font-extrabold text-white tabular-nums">
                {current.avgTemp}
              </p>
            </div>

            <div className="bg-[#131917] border border-white/10 rounded-lg p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-[#9BA8A3]">
                <Users className="w-4 h-4 text-[#8FD8D2]" aria-hidden="true" />
                <span>Fluxo nos Atrativos</span>
              </div>
              <p className="mt-1.5 text-base font-extrabold text-white">{current.crowdLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
