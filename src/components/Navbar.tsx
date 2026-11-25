import { Compass, GitCompareArrows, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BRAND_INFO } from '../data/jatobaData';
import { InstagramIcon } from './InstagramIcon';

interface NavbarProps {
  compareCount: number;
  onOpenCompare: () => void;
  onOpenQuickQuote: () => void;
}

export function Navbar({ compareCount, onOpenCompare, onOpenQuickQuote }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Roteiros 4x4', href: '#roteiros' },
    { label: 'Tudo Incluso', href: '#tudo-incluso' },
    { label: 'Atrativos', href: '#atrativos' },
    { label: 'Quando Ir', href: '#quando-ir' },
    { label: 'Dúvidas', href: '#duvidas' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#131917] text-[#FAF8F5] border-b border-white/10">
      {/* Top Authority Strip */}
      <div className="bg-[#0D1210] border-b border-white/5 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[#C9D1CE] truncate">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#FAF8F5]">
              <MapPin className="w-3.5 h-3.5 text-[#D94E1F] shrink-0" aria-hidden="true" />
              Saídas regulares e privativas de Palmas - TO
            </span>
            <span className="hidden md:inline text-white/25">|</span>
            <span className="hidden md:inline">
              Transporte 4x4 · Alimentação · Hospedagem · Atrativos
            </span>
          </div>
          <a
            href={BRAND_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#FAF8F5] hover:text-[#D94E1F] transition-colors font-medium shrink-0"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#D94E1F]" />
            <span>{BRAND_INFO.handle}</span>
            <span className="text-white/50 tabular-nums">({BRAND_INFO.followers})</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 group" aria-label="Jatobá Expedições - Início">
          <div className="w-9 h-9 rounded-lg bg-[#D94E1F] flex items-center justify-center text-white shadow-sm group-hover:bg-[#B83D14] transition-colors">
            <Compass className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <span className="block font-extrabold text-base tracking-tight text-white">
              JATOBÁ <span className="text-[#D94E1F]">EXPEDIÇÕES</span>
            </span>
            <span className="block text-[11px] font-medium text-[#9BA8A3] tracking-wide uppercase">
              Jalapão &amp; Serras Gerais · TO
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-md text-sm font-medium text-[#D6DDD9] hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2.5">
          {compareCount > 0 && (
            <button
              type="button"
              onClick={onOpenCompare}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#0B6E69] text-white hover:bg-[#095955] transition-colors cursor-pointer tabular-nums"
            >
              <GitCompareArrows className="w-4 h-4" aria-hidden="true" />
              Comparar ({compareCount})
            </button>
          )}
          <button
            type="button"
            onClick={onOpenQuickQuote}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-[#D94E1F] text-white hover:bg-[#B83D14] transition-colors cursor-pointer"
          >
            Simular Expedição
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-md text-[#D6DDD9] hover:text-white hover:bg-white/10"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          className="lg:hidden bg-[#19211E] border-t border-white/10 px-4 pt-3 pb-5 space-y-2"
          aria-label="Menu móvel"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-md text-sm font-medium text-[#FAF8F5] hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {compareCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCompare();
                }}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold bg-[#0B6E69] text-white flex items-center justify-center gap-2"
              >
                <GitCompareArrows className="w-4 h-4" />
                Comparar Roteiros ({compareCount})
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenQuickQuote();
              }}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-bold bg-[#D94E1F] text-white"
            >
              Simular Minha Expedição
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
