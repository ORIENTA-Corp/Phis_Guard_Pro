import React, { useState } from 'react';
import { Shield, ShieldAlert, Menu, X, Terminal, ExternalLink } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickScan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onQuickScan }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'analyser', label: 'Analyser' },
    { id: 'dashboard', label: 'Tableau de bord' },
    { id: 'comment-ca-marche', label: 'Comment ça marche' },
    { id: 'conseils', label: 'Conseils' },
    { id: 'a-propos', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080d1a]/85 border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('accueil')}
            className="flex items-center gap-3.5 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/40 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">PHIS GUARD</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold font-mono tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30 rounded">
                  v3.2
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-tight">Détectez • Comprenez • Protégez-vous</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'text-cyan-400 bg-blue-950/70 border border-blue-800/60 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-cta-analyze"
              onClick={() => {
                handleNavClick('analyser');
                onQuickScan();
              }}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg shadow-lg shadow-blue-600/30 transition-all duration-200 active:scale-95 cursor-pointer border border-blue-400/30"
            >
              <ShieldAlert className="w-4 h-4 text-cyan-200" />
              <span>Analyser maintenant</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080d1a] border-b border-blue-900/40 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'text-cyan-400 bg-blue-950/80 border border-blue-800/70 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />}
                </button>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-800/80">
            <button
              id="mobile-nav-cta-analyze"
              onClick={() => {
                handleNavClick('analyser');
                onQuickScan();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow-md"
            >
              <ShieldAlert className="w-5 h-5 text-cyan-200" />
              <span>Analyser maintenant</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
