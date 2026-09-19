import React from 'react';
import { ShieldCheck, Mail, Globe, ArrowRight, Lock, Radar, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onSelectType: (type: 'text' | 'url') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectType }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-blue-950/60">
      {/* Background cyber grid & glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headings & Call to actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-700/40 text-blue-300 text-xs font-medium tracking-wide shadow-inner">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Votre sécurité commence par une vérification.</span>
            </div>

            {/* Main Titles */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Détectez le phishing{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                  avant qu’il ne vous piège.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Analysez un email, un message ou une URL suspecte et identifiez rapidement les signaux de phishing.
              </p>
            </div>

            {/* Two Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-btn-analyze-text"
                onClick={() => onSelectType('text')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/40 shadow-xl shadow-blue-700/25 transition-all duration-200 active:scale-95 cursor-pointer group"
              >
                <div className="p-1 rounded-md bg-blue-700/60 text-cyan-200 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span>Analyser un texte</span>
                <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-btn-analyze-url"
                onClick={() => onSelectType('url')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold text-cyan-200 bg-slate-900/90 hover:bg-blue-950/90 border border-cyan-500/30 shadow-lg shadow-cyan-950/40 transition-all duration-200 active:scale-95 cursor-pointer group"
              >
                <div className="p-1 rounded-md bg-cyan-950 text-cyan-300 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <span>Analyser une URL</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
              <div className="text-left">
                <div className="text-2xl font-bold font-mono text-white">0–100</div>
                <div className="text-xs text-slate-400">Score de risque précis</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold font-mono text-cyan-400">14+</div>
                <div className="text-xs text-slate-400">Signaux heuristiques</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
                <div className="text-xs text-slate-400">Confidentialité locale</div>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Cybersecurity Digital Shield Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer cyber frame */}
              <div className="relative rounded-2xl bg-gradient-to-b from-blue-900/40 via-slate-900/90 to-[#0c1427] p-6 border border-blue-500/30 shadow-2xl shadow-blue-950/60 backdrop-blur-sm">
                
                {/* Simulated Security Radar Header */}
                <div className="flex items-center justify-between pb-4 border-b border-blue-900/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono font-medium text-slate-300">MONITEUR_ACTIF // THREAT_ENGINE</span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-blue-900/60 text-cyan-300 rounded border border-blue-700/50">
                    STATUS: SECURE
                  </span>
                </div>

                {/* Interactive Shield SVG Graphic */}
                <div className="py-6 flex flex-col items-center justify-center relative">
                  {/* Digital circular sonar rings */}
                  <div className="absolute w-52 h-52 rounded-full border border-blue-500/20 animate-[pulse_4s_ease-in-out_infinite]" />
                  <div className="absolute w-40 h-40 rounded-full border border-cyan-500/25 animate-[spin_16s_linear_infinite]" />
                  
                  {/* Central Shield Graphic with digital core */}
                  <div className="relative z-10 w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-950 flex items-center justify-center shadow-2xl shadow-cyan-500/30 border border-cyan-400/50">
                    <ShieldCheck className="w-16 h-16 text-cyan-200" />
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-slate-950 border border-blue-400/40">
                      <Lock className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>

                  {/* Suspicious Email Being Inspected Overlay */}
                  <div className="mt-6 w-full space-y-2.5">
                    <div className="p-3 rounded-lg bg-slate-950/90 border border-red-500/30 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        <span className="truncate text-slate-200 font-mono">http://paypal-security-update.xyz</span>
                      </div>
                      <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-red-500/20 text-red-400 rounded shrink-0 border border-red-500/30">
                        Alerte 89/100
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/90 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate text-slate-200 font-mono">https://www.service-public.fr</span>
                      </div>
                      <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 rounded shrink-0 border border-emerald-500/30">
                        Sain 08/100
                      </span>
                    </div>
                  </div>

                </div>

                {/* Footer security prompt */}
                <div className="pt-3 border-t border-blue-900/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>SANDBOX_ISOLATED: ACTIF</span>
                  <span className="text-cyan-400">PROTECTION ZERO-CLICK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
