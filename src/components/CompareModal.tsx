import { CheckCircle2, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Expedition } from '../types/expedition';

interface CompareModalProps {
  expeditions: Expedition[];
  isOpen: boolean;
  onClose: () => void;
  onSelectQuote: (expedition: Expedition) => void;
}

export function CompareModal({ expeditions, isOpen, onClose, onSelectQuote }: CompareModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || expeditions.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white text-[#131917] rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#E4DFD5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#131917] text-white px-5 py-4 sm:px-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8FD8D2]">
              Comparador Lado a Lado
            </span>
            <h2 id="compare-modal-title" className="text-lg sm:text-xl font-extrabold">
              Qual expedição combina mais com a sua viagem?
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar comparador"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-auto p-4 sm:p-6">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#E4DFD5]">
                <th className="py-3 pr-4 text-xs font-bold uppercase text-[#5A6560] w-40">
                  Critério
                </th>
                {expeditions.map((exp) => (
                  <th key={exp.id} className="py-3 px-4 align-top">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#E5F3F2] text-[#0B6E69] text-[11px] font-bold">
                      {exp.regionLabel}
                    </span>
                    <div className="mt-1 text-base font-extrabold text-[#131917]">{exp.title}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEAE2] text-sm">
              <tr>
                <td className="py-3.5 pr-4 font-bold text-[#131917]">Duração</td>
                {expeditions.map((exp) => (
                  <td key={exp.id} className="py-3.5 px-4 font-semibold tabular-nums">
                    {exp.days} dias e {exp.nights} noites
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-[#131917]">Nível de Trilha</td>
                {expeditions.map((exp) => (
                  <td key={exp.id} className="py-3.5 px-4 text-[#4D5753]">
                    {exp.difficulty}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-[#131917]">Cidades-Base</td>
                {expeditions.map((exp) => (
                  <td key={exp.id} className="py-3.5 px-4 text-[#4D5753]">
                    {exp.baseCities.join(' · ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-[#131917]">Alimentação Inclusa</td>
                {expeditions.map((exp) => (
                  <td key={exp.id} className="py-3.5 px-4 text-[#4D5753]">
                    {exp.mealsCount}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-[#131917]">Principais Atrativos</td>
                {expeditions.map((exp) => (
                  <td key={exp.id} className="py-3.5 px-4">
                    <ul className="space-y-1">
                      {exp.mainAttractions.map((attr) => (
                        <li key={attr} className="flex items-center gap-1.5 text-xs text-[#2B3330]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6E69] shrink-0" />
                          <span>{attr}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-[#131917]">Indicado Para</td>
                {expeditions.map((exp) => (
                  <td key={exp.id} className="py-3.5 px-4 text-xs text-[#4D5753] leading-relaxed">
                    {exp.idealFor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4" />
                {expeditions.map((exp) => (
                  <td key={exp.id} className="py-4 px-4">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectQuote(exp);
                      }}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#D94E1F] hover:bg-[#B83D14] text-white text-xs font-bold cursor-pointer"
                    >
                      Escolher {exp.title}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
