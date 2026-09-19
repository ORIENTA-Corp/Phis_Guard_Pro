import React from 'react';
import {
  ClipboardPaste,
  Cpu,
  ShieldCheck,
  Search,
  Database,
  Terminal,
  ArrowRight,
  Layers,
  Network,
  Lock
} from 'lucide-react';

interface HowItWorksProps {
  onStartScan: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartScan }) => {
  const steps = [
    {
      number: '1',
      title: 'Collez',
      subtitle: 'Collez l’email, le message ou l’URL suspecte.',
      description:
        'Saisissez ou collez directement dans l’interface sécurisée le corps du message reçu (SMS, WhatsApp, email pro) ou le lien suspect sans le lancer.',
      icon: ClipboardPaste,
      color: 'from-blue-600 to-cyan-500'
    },
    {
      number: '2',
      title: 'Analysez',
      subtitle: 'Phis Guard recherche automatiquement les signaux caractéristiques du phishing.',
      description:
        'Notre moteur hybride passe au crible la syntaxe, l’urgence psychologique, le typosquatting de marques, les protocoles SSL et la structure des domaines.',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      number: '3',
      title: 'Comprenez',
      subtitle: 'Obtenez un score de risque accompagné d’explications et de recommandations.',
      description:
        'Un indice de 0 à 100 vous indique la sévérité, avec une ventilation transparente de chaque alerte (« Pourquoi cette alerte ? ») et les gestes défensifs à adopter.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-400'
    }
  ];

  const modularEngines = [
    {
      title: 'Moteur d’analyse textuelle',
      desc: 'Détection des leviers psychologiques d’urgence, de contrainte financière et de menaces juridiques.',
      icon: Terminal
    },
    {
      title: 'Intelligence Artificielle de pointe',
      desc: 'Modèle de langage forensique analysant la sémantique et les formulations détournées.',
      icon: Cpu
    },
    {
      title: 'Inspection des domaines & DNS',
      desc: 'Détection de similarité de noms de domaine (typosquatting, homoglyphes, sous-domaines trompeurs).',
      icon: Network
    },
    {
      title: 'Services de réputation & listes d’alerte',
      desc: 'Interconnexion modulaire avec les bases mondiales d’indicateurs de compromission (IOCs).',
      icon: Database
    },
    {
      title: 'Système de scoring pondéré',
      desc: 'Agrégation mathématique normalisée sur une échelle claire de 0 à 100 points.',
      icon: Layers
    },
    {
      title: 'Isolation sandbox zéro-exécution',
      desc: 'Garantie absolue qu’aucun code tiers ni script malveillant n’est exécuté sur votre machine.',
      icon: Lock
    }
  ];

  return (
    <section id="comment-ca-marche" className="py-16 lg:py-24 border-t border-blue-950/60 bg-[#070c18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/50 text-cyan-300 text-xs font-mono">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>MÉTHODOLOGIE FORENSIQUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comment fonctionne Phis Guard ?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Une démarche en trois étapes simples pour démystifier les pièges numériques et vous protéger efficacement.
          </p>
        </div>

        {/* 3 Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-slate-900/90 border border-blue-900/50 p-8 shadow-xl hover:border-blue-500/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-4xl font-black font-mono text-slate-800 group-hover:text-blue-900/80 transition-colors">
                      0{step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                    {step.number}. {step.title}
                  </h3>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-3">
                    « {step.subtitle} »
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs text-slate-400 font-mono">
                  <span>ÉTAPE {step.number} / 03</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Technique Modulaire (Section 17) */}
        <div className="rounded-2xl bg-slate-950/80 border border-blue-800/40 p-8 sm:p-10 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              ARCHITECTURE MODULAIRE & ÉVOLUTIVE
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Sous le capot : une suite d’analyse multi-couches
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Conçu selon les standards de l’industrie de la cybersécurité, Phis Guard combine heuristique locale ultra-rapide, intelligence artificielle et modules d’inspection réseau.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modularEngines.map((engine, idx) => {
              const EngineIcon = engine.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-700/60 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-blue-950 text-cyan-300 border border-blue-800/50">
                      <EngineIcon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{engine.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{engine.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-mono">
              API-READY // PRÊT POUR L’INTÉGRATION SIEM & SOAR
            </span>
            <button
              onClick={onStartScan}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              <span>Tester la détection maintenant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
