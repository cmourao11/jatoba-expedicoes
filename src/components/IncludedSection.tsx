import { AlertCircle, BedDouble, CheckCircle2, Compass, TicketCheck, Utensils } from 'lucide-react';
import { INCLUDED_ITEMS, NOT_INCLUDED_ITEMS } from '../data/jatobaData';

const ICON_MAP = {
  Compass,
  Utensils,
  BedDouble,
  TicketCheck,
} as const;

export function IncludedSection() {
  return (
    <section id="tudo-incluso" className="bg-[#F2EFE9] border-y border-[#E4DFD5] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D94E1F]">
            Transparência Total · Padrão Jatobá Expedições
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#131917]">
            Roteiros completos para você viver o Cerrado sem imprevistos
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4D5753] leading-relaxed">
            No Jalapão e nas Serras Gerais as distâncias são longas e remotas. Cuidamos de toda a
            operação terrestre de ponta a ponta a partir de Palmas - TO.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {INCLUDED_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.iconName];
            return (
              <div
                key={item.title}
                className="bg-white rounded-xl p-5 border border-[#E4DFD5] flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E5F3F2] text-[#0B6E69] flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-extrabold text-[#131917]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#4D5753] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Clear Included vs Not Included Split */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-[#131917] text-white rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#34B3A8]" aria-hidden="true" />
                Serviço de bordo e suporte nativo durante toda a travessia
              </h3>
              <p className="mt-2 text-sm text-[#C9D1CE] leading-relaxed">
                Nossos veículos saem abastecidos diariamente com caixa térmica de água mineral
                gelada, lanches de trilha e kit de primeiros socorros. Nossos guias são moradores e
                conhecedores profundos das estradas de areia do Tocantins, ajustando horários para
                fugir de filas nos fervedouros.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-semibold text-[#8FD8D2]">
              <span>✓ Embarque no seu hotel em Palmas</span>
              <span>✓ Grupos reduzidos por 4x4</span>
              <span>✓ Seguro viagem aventura</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-[#E4DFD5]">
            <h3 className="text-base font-extrabold text-[#131917] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#D94E1F]" aria-hidden="true" />
              O que não está incluso no pacote terrestre
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#4D5753]">
              {NOT_INCLUDED_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D94E1F] font-bold leading-5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
