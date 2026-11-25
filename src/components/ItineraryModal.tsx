import { Calendar, CheckCircle2, MapPin, Utensils, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Expedition } from '../types/expedition';

interface ItineraryModalProps {
  expedition: Expedition | null;
  onClose: () => void;
  onRequestQuote: (expedition: Expedition) => void;
}

export function ItineraryModal({ expedition, onClose, onRequestQuote }: ItineraryModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expedition) return;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expedition, onClose]);

  if (!expedition) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="itinerary-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF8F5] text-[#131917] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#E4DFD5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#131917] text-white px-5 py-4 sm:px-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8FD8D2]">
              <span>{expedition.regionLabel}</span>
              <span>·</span>
              <span className="tabular-nums">
                {expedition.days} Dias e {expedition.nights} Noites
              </span>
              <span>·</span>
              <span>Saída: {expedition.departureCity}</span>
            </div>
            <h2 id="itinerary-modal-title" className="mt-1 text-xl sm:text-2xl font-extrabold">
              {expedition.title}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes do roteiro"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Itinerary Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Summary Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-[#E4DFD5] text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#D94E1F] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="block font-bold text-[#131917]">Pernoites / Bases</span>
                <span className="text-[#4D5753]">{expedition.baseCities.join(' → ')}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Utensils className="w-4 h-4 text-[#0B6E69] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="block font-bold text-[#131917]">Pensão Inclusa</span>
                <span className="text-[#4D5753]">{expedition.mealsCount}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#0B6E69] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="block font-bold text-[#131917]">Perfil Recomendado</span>
                <span className="text-[#4D5753]">{expedition.idealFor}</span>
              </div>
            </div>
          </div>

          {/* Day-by-Day Timeline */}
          <div>
            <h3 className="text-base font-extrabold text-[#131917] mb-4">
              Programação Completa Dia a Dia
            </h3>
            <ol className="space-y-4">
              {expedition.itinerary.map((step) => (
                <li
                  key={step.day}
                  className="bg-white rounded-xl p-4 border border-[#E4DFD5] relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-[#131917] text-white text-xs font-extrabold tabular-nums">
                      DIA {step.day}
                    </span>
                    <span className="text-xs font-semibold text-[#0B6E69]">
                      Base: {step.baseCity}
                    </span>
                  </div>
                  <h4 className="mt-2 font-bold text-base text-[#131917]">{step.title}</h4>
                  <p className="mt-1 text-sm text-[#4D5753] leading-relaxed">{step.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.highlights.map((hl) => (
                      <span
                        key={hl}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#2B3330] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E4DFD5]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6E69]" aria-hidden="true" />
                        {hl}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sticky Footer CTA */}
        <div className="bg-white border-t border-[#E4DFD5] px-5 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4D5753]">
            *A ordem das visitas pode ser ajustada pelo guia para garantir os horários mais vazios em
            cada fervedouro ou cachoeira.
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestQuote(expedition);
            }}
            className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-lg bg-[#D94E1F] hover:bg-[#B83D14] text-white text-sm font-bold cursor-pointer"
          >
            Consultar Vagas deste Roteiro
          </button>
        </div>
      </div>
    </div>
  );
}
