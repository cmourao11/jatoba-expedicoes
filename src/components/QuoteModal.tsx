import { Check, Copy, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BRAND_INFO, EXPEDITIONS, SEASON_MONTHS } from '../data/jatobaData';
import type { Expedition } from '../types/expedition';
import { buildQuoteMessage } from '../utils/quoteUrl';

interface QuoteModalProps {
  initialExpedition: Expedition | null;
  initialMonth: string;
  initialTravelers: number;
  onClose: () => void;
}

export function QuoteModal({
  initialExpedition,
  initialMonth,
  initialTravelers,
  onClose,
}: QuoteModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [chosenExpId, setChosenExpId] = useState<string>(
    initialExpedition?.id ?? EXPEDITIONS[1].id
  );
  const [modalityLabel, setModalityLabel] = useState('Grupo Compartilhado');
  const [travelers, setTravelers] = useState(initialTravelers);
  const [month, setMonth] = useState(initialMonth || 'Julho');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const activeExp = EXPEDITIONS.find((e) => e.id === chosenExpId) ?? EXPEDITIONS[1];

  const messagePreview = buildQuoteMessage({
    expeditionTitle: activeExp.title,
    regionLabel: activeExp.regionLabel,
    days: activeExp.days,
    modalityLabel,
    travelers,
    preferredMonth: month,
    travelerName: name,
  });

  const handleCopyAndOpenInstagram = async () => {
    try {
      await navigator.clipboard.writeText(messagePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch {
      // Clipboard fallback ignored if blocked
    }
    window.open(BRAND_INFO.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white text-[#131917] rounded-2xl max-w-lg w-full overflow-hidden border border-[#E4DFD5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#131917] text-white px-5 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F47B50]">
              Atendimento Direto {BRAND_INFO.handle}
            </span>
            <h2 id="quote-modal-title" className="text-lg font-extrabold">
              Simular Cotação de Expedição
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar simulador"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label htmlFor="quote-exp" className="block text-xs font-bold text-[#4D5753] mb-1">
              Roteiro Desejado
            </label>
            <select
              id="quote-exp"
              value={activeExp.id}
              onChange={(e) => setChosenExpId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[#D4CEC2] text-sm font-semibold bg-[#FAF8F5]"
            >
              {EXPEDITIONS.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  {exp.title} ({exp.days} dias · {exp.regionLabel})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="quote-modality"
                className="block text-xs font-bold text-[#4D5753] mb-1"
              >
                Modalidade
              </label>
              <select
                id="quote-modality"
                value={modalityLabel}
                onChange={(e) => setModalityLabel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#D4CEC2] text-sm font-semibold bg-[#FAF8F5]"
              >
                <option value="Grupo Compartilhado">Grupo Compartilhado</option>
                <option value="4x4 Privativo Exclusivo">4x4 Privativo Exclusivo</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="quote-travelers"
                className="block text-xs font-bold text-[#4D5753] mb-1"
              >
                Nº de Viajantes
              </label>
              <input
                id="quote-travelers"
                type="number"
                min={1}
                max={20}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value) || 1)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#D4CEC2] text-sm font-semibold bg-[#FAF8F5] tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="quote-month" className="block text-xs font-bold text-[#4D5753] mb-1">
                Mês Previsto
              </label>
              <select
                id="quote-month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#D4CEC2] text-sm font-semibold bg-[#FAF8F5]"
              >
                {SEASON_MONTHS.map((m) => (
                  <option key={m.month} value={m.month}>
                    {m.month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quote-name" className="block text-xs font-bold text-[#4D5753] mb-1">
                Seu Nome (opcional)
              </label>
              <input
                id="quote-name"
                type="text"
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Ana Paula"
                className="w-full px-3 py-2.5 rounded-lg border border-[#D4CEC2] text-sm bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E4DFD5] rounded-lg p-3">
            <span className="block text-[11px] font-bold uppercase text-[#5A6560] mb-1">
              Resumo pronto para enviar:
            </span>
            <pre className="text-xs text-[#2B3330] whitespace-pre-wrap font-sans leading-relaxed">
              {messagePreview}
            </pre>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopyAndOpenInstagram}
              className="w-full py-3 px-4 rounded-lg bg-[#D94E1F] hover:bg-[#B83D14] text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Resumo Copiado! Abrindo @jatobaexpedicoes...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Copiar Pedido e Abrir @jatobaexpedicoes</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-[#5A6560]">
              Copiamos automaticamente os dados acima para você colar na DM ou no link oficial da
              bio da Jatobá Expedições.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
