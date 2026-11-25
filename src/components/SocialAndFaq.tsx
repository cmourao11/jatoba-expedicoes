import { ChevronDown, Compass, ExternalLink, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { BRAND_INFO, FAQS, REVIEWS } from '../data/jatobaData';
import type { Expedition } from '../types/expedition';
import { InstagramIcon } from './InstagramIcon';

const CURRENT_YEAR = new Date().getFullYear();

interface SocialAndFaqProps {
  onOpenQuoteModal: (expedition?: Expedition) => void;
}

export function SocialAndFaq({ onOpenQuoteModal }: SocialAndFaqProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

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
    </>
  );
}
