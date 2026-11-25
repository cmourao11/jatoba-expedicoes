import {
  Check,
  ChevronDown,
  Compass,
  Copy,
  ExternalLink,
  MapPin,
  Star,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { BRAND_INFO, EXPEDITIONS, FAQS, REVIEWS, SEASON_MONTHS } from '../data/jatobaData';
import type { Expedition } from '../types/expedition';
import { buildQuoteMessage } from '../utils/quoteUrl';
import { InstagramIcon } from './InstagramIcon';

const CURRENT_YEAR = new Date().getFullYear();

interface SocialAndFaqProps {
  quoteModalOpen: boolean;
  selectedExpedition: Expedition | null;
  preselectedMonth: string;
  defaultTravelers: number;
  onCloseQuoteModal: () => void;
  onOpenQuoteModal: (expedition?: Expedition) => void;
}

export function SocialAndFaq({
  quoteModalOpen,
  selectedExpedition,
  preselectedMonth,
  defaultTravelers,
  onCloseQuoteModal,
  onOpenQuoteModal,
}: SocialAndFaqProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [chosenExpId, setChosenExpId] = useState<string>(
    selectedExpedition?.id ?? EXPEDITIONS[1].id
  );
  const [modalityLabel, setModalityLabel] = useState('Grupo Compartilhado');
  const [travelers, setTravelers] = useState(defaultTravelers);
  const [month, setMonth] = useState(preselectedMonth || 'Julho');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  const activeExp =
    EXPEDITIONS.find((e) => e.id === (selectedExpedition?.id ?? chosenExpId)) ?? EXPEDITIONS[1];

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
    <>
      {/* Social Proof + Instagram Community Banner */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E4DFD5] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#131917] text-white flex items-center justify-center shrink-0 border-2 border-[#D94E1F]">
              <InstagramIcon className="w-7 h-7 text-[#D94E1F]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#131917]">
                  {BRAND_INFO.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded bg-[#E5F3F2] text-[#0B6E69] text-xs font-bold">
                  {BRAND_INFO.handle}
                </span>
              </div>
              <p className="mt-1 text-sm text-[#4D5753]">
                🌴 {BRAND_INFO.territory} · 🚙 Roteiros completos · 🏕️ Transporte, Alimentação,
                Hospedagem e Atrativos
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-[#131917] tabular-nums">
                <span>{BRAND_INFO.postsCount} publicações</span>
                <span>·</span>
                <span>{BRAND_INFO.followers} seguidores</span>
                <span>·</span>
                <span>Saídas de Palmas - TO</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#131917] text-sm font-bold text-[#131917] hover:bg-[#F2EFE9] transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-[#D94E1F]" />
              <span>Ver Bastidores no Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#D94E1F] hover:bg-[#B83D14] text-sm font-bold text-white transition-colors cursor-pointer"
            >
              Montar Minha Cotação
            </button>
          </div>
        </div>

        {/* Traveler Testimonials */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <blockquote
              key={rev.id}
              className="bg-white rounded-xl p-5 border border-[#E4DFD5] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C68928]" aria-label="Nota 5 de 5">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-[#2B3330] leading-relaxed">“{rev.comment}”</p>
              </div>
              <footer className="mt-4 pt-3 border-t border-[#EEEAE2]">
                <div className="text-sm font-bold text-[#131917]">{rev.author}</div>
                <div className="text-xs text-[#5A6560]">
                  {rev.origin} · <span className="text-[#0B6E69] font-semibold">{rev.expedition}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="duvidas" className="bg-[#F2EFE9] border-t border-[#E4DFD5] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E69]">
              Perguntas Frequentes
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#131917]">
              Tudo o que você precisa saber antes de embarcar
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-xl border border-[#E4DFD5] overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#D94E1F]">
                        {faq.category}
                      </span>
                      <span className="block text-sm sm:text-base font-bold text-[#131917] mt-0.5">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#5A6560] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-[#4D5753] leading-relaxed border-t border-[#F2EFE9] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#131917] text-[#C9D1CE] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D94E1F] flex items-center justify-center text-white">
                <Compass className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-white text-base">JATOBÁ EXPEDIÇÕES</span>
            </div>
            <p className="mt-3 text-sm text-[#9BA8A3] leading-relaxed">
              Agência de turismo receptivo no Tocantins especializada em expedições 4x4 pelo Parque
              Estadual do Jalapão e Serras Gerais, com tudo incluso e saídas de Palmas - TO.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Roteiros em Destaque
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#roteiros" className="hover:text-white transition-colors">
                  Jalapão Essencial (3 Dias)
                </a>
              </li>
              <li>
                <a href="#roteiros" className="hover:text-white transition-colors">
                  Jalapão Completo Jatobá (4 Dias)
                </a>
              </li>
              <li>
                <a href="#roteiros" className="hover:text-white transition-colors">
                  Serras Gerais Cristalino (4 e 5 Dias)
                </a>
              </li>
              <li>
                <a href="#roteiros" className="hover:text-white transition-colors">
                  Grande Travessia Jalapão + Serras (7 Dias)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Atendimento &amp; Reservas
            </h3>
            <p className="mt-3 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D94E1F] shrink-0" aria-hidden="true" />
              <span>Base operacional: Palmas - Tocantins, Brasil</span>
            </p>
            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#F47B50] transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-[#D94E1F]" />
              <span>instagram.com/jatobaexpedicoes</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/10 text-xs text-[#7D8B85] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {CURRENT_YEAR} Jatobá Expedições. Todos os direitos reservados.</span>
          <span>Turismo consciente e valorização das comunidades locais do Tocantins.</span>
        </div>
      </footer>

      {/* Quote Simulator Modal */}
      {quoteModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
          onClick={onCloseQuoteModal}
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
                type="button"
                onClick={onCloseQuoteModal}
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
                  <label
                    htmlFor="quote-month"
                    className="block text-xs font-bold text-[#4D5753] mb-1"
                  >
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
                  <label
                    htmlFor="quote-name"
                    className="block text-xs font-bold text-[#4D5753] mb-1"
                  >
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
                  Copiamos automaticamente os dados acima para você colar na DM ou no link oficial
                  da bio da Jatobá Expedições.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
