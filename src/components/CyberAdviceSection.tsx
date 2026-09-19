import React, { useState } from 'react';
import {
  BookOpen,
  Mail,
  Globe,
  ShieldAlert,
  KeyRound,
  LayoutGrid,
  AlertTriangle,
  MessageSquare,
  Lock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  Shield
} from 'lucide-react';
import { CYBER_ADVICE_LIST } from '../data/cyberKnowledge';
import { CyberAdvice } from '../types';

export const CyberAdviceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(CYBER_ADVICE_LIST[0].id);

  // Map icon names
  const getIcon = (name: string) => {
    switch (name) {
      case 'Mail':
        return Mail;
      case 'Globe':
        return Globe;
      case 'ShieldAlert':
        return ShieldAlert;
      case 'KeyRound':
        return KeyRound;
      case 'LayoutGrid':
        return LayoutGrid;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'MessageSquare':
        return MessageSquare;
      case 'Lock':
        return Lock;
      default:
        return Shield;
    }
  };

  return (
    <section id="conseils-section" className="py-16 lg:py-24 border-t border-blue-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/50 text-cyan-300 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>CENTRE DE RESSOURCES ET SENSIBILISATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Conseils essentiels de cybersécurité
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Consultez nos 8 guides pratiques pour développer les bons réflexes face aux tentatives d’escroquerie et d’ingénierie sociale.
          </p>
        </div>

        {/* 8 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CYBER_ADVICE_LIST.map((item) => {
            const Icon = getIcon(item.iconName);
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                id={`advice-card-${item.id}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900/95 border-blue-500/60 shadow-xl shadow-blue-950/50 ring-1 ring-blue-400/20'
                    : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {/* Card Header (Clickable toggle) */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-800/60 text-cyan-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-block text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                        {item.tag}
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                    {/* Golden Rule Callout */}
                    <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 text-xs text-cyan-200">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cyan-300 font-semibold block mb-0.5">Règle d’or :</strong>
                        <span>{item.goldenRule}</span>
                      </div>
                    </div>

                    {/* Detailed checklist */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono block">
                        Points de vigilance clés :
                      </span>
                      <ul className="space-y-2">
                        {item.detailedPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
