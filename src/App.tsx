import { useMemo, useState } from 'react';
import { AttractionsShowcase } from './components/AttractionsShowcase';
import { CompareModal } from './components/CompareModal';
import { ExpeditionExplorer } from './components/ExpeditionExplorer';
import { HeroSearch } from './components/HeroSearch';
import { IncludedSection } from './components/IncludedSection';
import { ItineraryModal } from './components/ItineraryModal';
import { Navbar } from './components/Navbar';
import { SeasonalityPlanner } from './components/SeasonalityPlanner';
import { SocialAndFaq } from './components/SocialAndFaq';
import { EXPEDITIONS } from './data/jatobaData';
import type { Expedition, SearchFilters } from './types/expedition';

const INITIAL_FILTERS: SearchFilters = {
  region: 'todos',
  duration: 'todos',
  modality: 'todos',
  travelers: 2,
  query: '',
};

export function App() {
  const [filters, setFilters] = useState<SearchFilters>(INITIAL_FILTERS);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [detailExpedition, setDetailExpedition] = useState<Expedition | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteExpedition, setQuoteExpedition] = useState<Expedition | null>(null);
  const [preferredMonth, setPreferredMonth] = useState('Julho');

  const updateFilters = (patch: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const filteredExpeditions = useMemo(() => {
    return EXPEDITIONS.filter((exp) => {
      if (filters.region !== 'todos' && exp.region !== filters.region) return false;
      if (filters.duration === '3' && exp.days !== 3) return false;
      if (filters.duration === '4' && exp.days !== 4) return false;
      if (filters.duration === '5+' && exp.days < 5) return false;
      if (filters.modality !== 'todos' && !exp.modalities.includes(filters.modality)) return false;

      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const haystack = [
          exp.title,
          exp.subtitle,
          exp.regionLabel,
          ...exp.mainAttractions,
          ...exp.baseCities,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [filters]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const comparedExpeditions = useMemo(
    () => EXPEDITIONS.filter((exp) => compareIds.includes(exp.id)),
    [compareIds]
  );

  const handleOpenQuote = (expedition?: Expedition) => {
    setQuoteExpedition(expedition ?? null);
    setQuoteModalOpen(true);
  };

  const handlePickMonth = (monthName: string) => {
    setPreferredMonth(monthName);
    setQuoteExpedition(null);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#131917]">
      <Navbar
        compareCount={compareIds.length}
        onOpenCompare={() => setCompareOpen(true)}
        onOpenQuickQuote={() => handleOpenQuote()}
      />

      <main className="flex-1">
        <HeroSearch
          filters={filters}
          onUpdateFilters={updateFilters}
          totalMatches={filteredExpeditions.length}
        />

        <ExpeditionExplorer
          expeditions={filteredExpeditions}
          filters={filters}
          onUpdateFilters={updateFilters}
          onResetFilters={() => setFilters(INITIAL_FILTERS)}
          compareIds={compareIds}
          onToggleCompare={toggleCompare}
          onClearCompare={() => setCompareIds([])}
          onOpenCompare={() => setCompareOpen(true)}
          onOpenDetails={(exp) => setDetailExpedition(exp)}
          onSelectQuote={(exp) => handleOpenQuote(exp)}
        />

        <IncludedSection />

        <AttractionsShowcase />

        <SeasonalityPlanner onPickMonthForQuote={handlePickMonth} />

        <SocialAndFaq
          quoteModalOpen={quoteModalOpen}
          selectedExpedition={quoteExpedition}
          preselectedMonth={preferredMonth}
          defaultTravelers={filters.travelers}
          onCloseQuoteModal={() => setQuoteModalOpen(false)}
          onOpenQuoteModal={handleOpenQuote}
        />
      </main>

      <ItineraryModal
        expedition={detailExpedition}
        onClose={() => setDetailExpedition(null)}
        onRequestQuote={(exp) => handleOpenQuote(exp)}
      />

      <CompareModal
        expeditions={comparedExpeditions}
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        onSelectQuote={(exp) => handleOpenQuote(exp)}
      />
    </div>
  );
}

export default App;
