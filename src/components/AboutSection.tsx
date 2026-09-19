import React from 'react';
import { Shield, Target, Users, CheckCircle, Award, Sparkles, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="a-propos-section" className="py-16 lg:py-24 border-t border-blue-950/60 bg-[#070c18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Main Mission Statement */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/50 text-cyan-300 text-xs font-mono">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>À PROPOS DE PHIS GUARD</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            La sécurité numérique accessible à chacun
          </h2>

          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 border border-blue-700/40 shadow-xl">
            <p className="text-lg sm:text-xl font-medium text-cyan-100 italic leading-relaxed">
              « Notre objectif est de rendre la cybersécurité plus simple, plus accessible et plus compréhensible pour tous. »
            </p>
          </div>
        </div>

        {/* Narrative & Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Démystifier les menaces</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Face à des escroqueries de plus en plus sophistiquées imitant des services familiers (banques, administrations, livraison), Phis Guard donne à chacun les clés pour décoder les signaux cachés sans vocabulaire jargonneux.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Pour débutants & experts</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Que vous soyez un particulier vérifiant un SMS suspect ou un administrateur réseau cherchant une seconde opinion rapide, nos rapports s’adaptent avec clarté visuelle et profondeur technique.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Éthique & Indépendance</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Notre outil a été pensé comme un bien d’intérêt public : aucun profilage publicitaire, respect scrupuleux de la confidentialité des messages et pédagogie continue.
            </p>
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-900/30 to-slate-950 border border-blue-800/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">Une question sur nos méthodes de détection ?</h4>
            <p className="text-sm text-slate-300">Notre équipe de recherche en cybersécurité est à votre disposition.</p>
          </div>
          <div className="flex items-center gap-3 font-mono text-sm text-cyan-400 bg-slate-950 px-4 py-2.5 rounded-xl border border-blue-900">
            <span>CONTACT RAPIDE : +237 656 482 954</span>
          </div>
        </div>

      </div>
    </section>
  );
};
