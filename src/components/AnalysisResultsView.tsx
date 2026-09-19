import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  ExternalLink,
  Info,
  CheckCircle2,
  FileText,
  Shield
} from 'lucide-react';
import { AnalysisResult, RiskLevel } from '../types';

interface AnalysisResultsViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  // Helper for color styling based on risk level
  const getRiskTheme = (level: RiskLevel, score: number) => {
    if (score <= 20) {
      return {
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/40',
        badgeBg: 'bg-emerald-500/20',
        badgeText: 'text-emerald-400',
        progressColor: 'from-emerald-500 to-teal-400',
        textColor: 'text-emerald-400',
        icon: ShieldCheck
      };
    } else if (score <= 40) {
      return {
        bg: 'bg-cyan-950/40',
        border: 'border-cyan-500/40',
        badgeBg: 'bg-cyan-500/20',
        badgeText: 'text-cyan-400',
        progressColor: 'from-cyan-500 to-blue-400',
        textColor: 'text-cyan-400',
        icon: ShieldCheck
      };
    } else if (score <= 60) {
      return {
        bg: 'bg-amber-950/40',
        border: 'border-amber-500/40',
        badgeBg: 'bg-amber-500/20',
        badgeText: 'text-amber-400',
        progressColor: 'from-amber-500 to-orange-400',
        textColor: 'text-amber-400',
        icon: AlertTriangle
      };
    } else if (score <= 80) {
      return {
        bg: 'bg-orange-950/40',
        border: 'border-orange-500/40',
        badgeBg: 'bg-orange-500/20',
        badgeText: 'text-orange-400',
        progressColor: 'from-orange-500 to-red-500',
        textColor: 'text-orange-400',
        icon: AlertTriangle
      };
    } else {
      return {
        bg: 'bg-red-950/50',
        border: 'border-red-500/50',
        badgeBg: 'bg-red-500/20',
        badgeText: 'text-red-400',
        progressColor: 'from-red-600 to-rose-500',
        textColor: 'text-red-400',
        icon: AlertOctagon
      };
    }
  };

  const theme = getRiskTheme(result.riskLevel, result.score);
  const StatusIcon = theme.icon;

  const handleCopyReport = () => {
    const lines = [
      '==========================================',
      '        RAPPORT DE SÉCURITÉ PHIS GUARD    ',
      '==========================================',
      `Date : ${new Date(result.timestamp).toLocaleString('fr-FR')}`,
      `Type : ${result.type === 'url' ? 'URL' : 'Email / Message'}`,
      `Score de risque : ${result.score}/100`,
      `Niveau de risque : ${result.riskLabel}`,
      '------------------------------------------',
      'SYNTHÈSE :',
      result.summary,
      '------------------------------------------',
      'SIGNAUX DÉTECTÉS :',
      ...result.signals.map(
        (s) => `• [${s.severity.toUpperCase()}] ${s.name}\n  Explication: ${s.explanation}\n  Conseil: ${s.recommendation}`
      ),
      '------------------------------------------',
      'RECOMMANDATIONS DE SÉCURITÉ :',
      ...result.recommendations.map((r) => `→ ${r}`),
      '------------------------------------------',
      'AVERTISSEMENT : Phis Guard fournit une analyse indicative et ne garantit pas qu’un contenu est totalement sûr. En cas de doute, vérifiez toujours auprès de la source officielle.',
      'Signature : Détectez. Comprenez. Protégez-vous.'
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="resultat-analyse" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Score Hero Card */}
        <div className={`p-6 sm:p-8 rounded-2xl ${theme.bg} border ${theme.border} shadow-2xl backdrop-blur-md relative overflow-hidden`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Score Gauge Visual */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {/* Score Meter Disc */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-800"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className={`stroke-current ${theme.textColor} transition-all duration-1000 ease-out`}
                    strokeWidth="9"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tighter">
                    {result.score}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                    / 100
                  </span>
                </div>
              </div>

              {/* Title & Level */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-current/30 shadow-sm font-mono"
                     style={{ color: 'inherit' }}>
                  <StatusIcon className="w-4 h-4" />
                  <span>Score de risque : {result.score}/100</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Niveau : <span className={theme.textColor}>{result.riskLabel}</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              <button
                id="btn-new-analysis"
                onClick={onReset}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-700/30 transition-all active:scale-95 cursor-pointer border border-blue-400/30"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Nouvelle analyse</span>
              </button>

              <button
                id="btn-copy-report"
                onClick={handleCopyReport}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 shadow transition-all active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Rapport copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-300" />
                    <span>Copier le rapport</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Scale Legend reference bar */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 grid grid-cols-5 gap-1.5 text-center text-[10px] sm:text-xs font-mono">
            <div className={`p-1.5 rounded ${result.score <= 20 ? 'bg-emerald-500/30 border border-emerald-500 font-bold text-white' : 'text-slate-500'}`}>
              0–20: Très faible
            </div>
            <div className={`p-1.5 rounded ${result.score > 20 && result.score <= 40 ? 'bg-cyan-500/30 border border-cyan-500 font-bold text-white' : 'text-slate-500'}`}>
              21–40: Faible
            </div>
            <div className={`p-1.5 rounded ${result.score > 40 && result.score <= 60 ? 'bg-amber-500/30 border border-amber-500 font-bold text-white' : 'text-slate-500'}`}>
              41–60: Modéré
            </div>
            <div className={`p-1.5 rounded ${result.score > 60 && result.score <= 80 ? 'bg-orange-500/30 border border-orange-500 font-bold text-white' : 'text-slate-500'}`}>
              61–80: Élevé
            </div>
            <div className={`p-1.5 rounded ${result.score > 80 ? 'bg-red-500/30 border border-red-500 font-bold text-white' : 'text-slate-500'}`}>
              81–100: Critique
            </div>
          </div>
        </div>

        {/* Section 8: Tableau de résultats */}
        <div className="bg-slate-900/90 rounded-2xl border border-blue-900/40 p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>Résultat de l’analyse</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Type : {result.type === 'url' ? 'URL Web' : 'Email / Message'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase font-semibold text-slate-400 font-mono tracking-wider">
                  <th className="py-3 px-4">Élément</th>
                  <th className="py-3 px-4">Résultat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200">Score de risque</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">{result.score}/100</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200">Niveau</td>
                  <td className={`py-3 px-4 font-semibold ${theme.textColor}`}>
                    {result.riskLabel.replace('Risque ', '')}
                  </td>
                </tr>

                {result.table.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 text-slate-300">{item.element}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium font-mono ${
                          item.status === 'danger'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                            : item.status === 'warning'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {item.status === 'danger' && <AlertOctagon className="w-3 h-3 shrink-0" />}
                        {item.status === 'warning' && <AlertTriangle className="w-3 h-3 shrink-0" />}
                        {item.status === 'safe' && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                        <span>{item.result}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 7: Pourquoi cette alerte ? (Signaux détaillés) */}
        <div className="bg-slate-900/90 rounded-2xl border border-blue-900/40 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Pourquoi cette alerte ?</span>
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Détail des signaux de phishing identifiés, leur degré de sévérité et leur signification technique.
            </p>
          </div>

          {result.signals.length === 0 ? (
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Aucun signal suspect n’a été détecté</strong>
                <p className="text-xs text-emerald-300/80 mt-1">
                  Les formules et structures analysées ne présentent pas les marqueurs d’urgence, de contrefaçon de marque ou de captation d’identifiants habituels.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {result.signals.map((signal) => {
                const isCrit = signal.severity === 'critical';
                const isHigh = signal.severity === 'high';
                const isMed = signal.severity === 'medium';
                return (
                  <div
                    key={signal.id}
                    className={`p-4 sm:p-5 rounded-xl border transition-all ${
                      isCrit
                        ? 'bg-red-950/30 border-red-500/40'
                        : isHigh
                        ? 'bg-orange-950/30 border-orange-500/40'
                        : isMed
                        ? 'bg-amber-950/30 border-amber-500/30'
                        : 'bg-slate-800/40 border-slate-700/40'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {isCrit || isHigh ? (
                          <span className="text-base">⚠️</span>
                        ) : (
                          <span className="text-base">ℹ️</span>
                        )}
                        <h4 className="text-base font-bold text-white tracking-tight">
                          {signal.name}
                        </h4>
                      </div>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded font-mono ${
                          isCrit
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : isHigh
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                            : isMed
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Gravité : {signal.severity === 'critical' ? 'Critique' : signal.severity === 'high' ? 'Élevée' : signal.severity === 'medium' ? 'Moyenne' : 'Faible'}
                      </span>
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed pl-6 mb-3">
                      « {signal.explanation} »
                    </p>

                    <div className="pl-6 pt-2 border-t border-slate-800/60 flex items-start gap-2 text-xs text-cyan-300">
                      <strong className="shrink-0 text-cyan-400 font-semibold">Conseil immédiat :</strong>
                      <span>{signal.recommendation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 9: Que devez-vous faire ? (Recommandations de sécurité) */}
        <div className="bg-slate-900/90 rounded-2xl border border-blue-900/40 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Que devez-vous faire ?</span>
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Mesures défensives concrètes adaptées à ce résultat pour préserver la sécurité de vos comptes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.recommendations.map((rec, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3 text-sm text-slate-200 leading-relaxed"
              >
                <div className="p-1 rounded bg-blue-950 text-cyan-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>{rec}</span>
              </div>
            ))}
          </div>

          {/* Mandatory legal disclaimer */}
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-100 font-semibold">Avertissement de sécurité :</strong> Phis Guard
              fournit une analyse indicative et ne garantit pas qu’un contenu est totalement sûr. En cas de
              doute, vérifiez toujours auprès de la source officielle.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
