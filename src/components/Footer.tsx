import React from 'react';
import { Shield, MessageCircle, Phone, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-blue-950/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Slogan */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white font-mono tracking-tight">
                PHIS GUARD
              </span>
            </div>
            <p className="text-base text-slate-300 font-medium">
              « Détectez les signaux. Comprenez le risque. Protégez-vous. »
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Outil de cybersécurité spécialisé dans la détection proactive et la pédagogie contre les attaques de phishing, usurpations d’identité et arnaques numériques.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('accueil')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('analyser')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Analyse
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Tableau de bord
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('comment-ca-marche')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Comment ça marche
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('conseils')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Conseils
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('confidentialite')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Confidentialité
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support & WhatsApp Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              Contact d’urgence
            </h4>
            <div className="space-y-2 text-xs">
              <div className="text-slate-400">WhatsApp / Téléphone :</div>
              <a
                href="https://wa.me/237656482954"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-mono font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>+237 656 482 954</span>
              </a>
              <div className="pt-2 text-[11px] text-slate-400">
                Disponibilité 7j/7 pour les signalements d’incidents critiques.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Phis Guard — Tous droits réservés.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-blue-400/80">
              CYBERSECURITY SUITE // BUILD 2026
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
