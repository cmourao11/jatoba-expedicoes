import { Info, MapPin } from 'lucide-react';
import { useState } from 'react';
import { ATTRACTIONS } from '../data/jatobaData';

export function AttractionsShowcase() {
  const [regionTab, setRegionTab] = useState<'Todos' | 'Jalapão' | 'Serras Gerais'>('Todos');

  const visible =
    regionTab === 'Todos'
      ? ATTRACTIONS
      : ATTRACTIONS.filter((item) => item.region === regionTab);

  return (
    <section id="atrativos" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E69]">
            Santuários do Tocantins
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#131917]">
            Cenários que você vai conhecer com a Jatobá
          </h2>
        </div>

        <div className="inline-flex rounded-lg bg-[#F2EFE9] p-1 border border-[#E4DFD5] self-start">
          {(['Todos', 'Jalapão', 'Serras Gerais'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setRegionTab(tab)}
              className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                regionTab === tab
                  ? 'bg-[#131917] text-white'
                  : 'text-[#4D5753] hover:text-[#131917]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((attr) => (
          <article
            key={attr.id}
            className="bg-white rounded-xl border border-[#E4DFD5] overflow-hidden flex flex-col"
          >
            <div className="relative aspect-[16/10] bg-[#19211E] overflow-hidden">
              <img
                src={attr.image}
                alt={`${attr.name} em ${attr.municipality}, ${attr.region}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#131917]/85 text-white text-xs font-bold">
                {attr.region}
              </span>
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#0B6E69] text-white text-xs font-semibold">
                {attr.tag}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-1 text-xs text-[#5A6560] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#D94E1F]" aria-hidden="true" />
                <span>{attr.municipality} - TO</span>
              </div>
              <h3 className="mt-1.5 text-lg font-extrabold text-[#131917]">{attr.name}</h3>
              <p className="mt-2 text-sm text-[#4D5753] leading-relaxed flex-1">
                {attr.description}
              </p>

              <div className="mt-4 pt-3 border-t border-[#EEEAE2] flex items-start gap-2 text-xs text-[#2B3330] bg-[#FAF8F5] -mx-5 -mb-5 p-4">
                <Info className="w-4 h-4 text-[#0B6E69] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Dica do Guia Jatobá:</strong> {attr.guideTip}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
