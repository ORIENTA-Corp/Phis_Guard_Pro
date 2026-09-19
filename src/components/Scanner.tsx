import React, { useState, useEffect } from 'react';
import { Mail, Globe, ShieldAlert, Sparkles, AlertCircle, RefreshCw, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { AnalysisResult, AnalysisType } from '../types';
import { PRESET_ANALYSES } from '../data/cyberKnowledge';
import { analyzeTextMessage, analyzeUrlInput } from '../utils/phishingEngine';

interface ScannerProps {
  initialType?: AnalysisType;
  onAnalysisComplete: (result: AnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (val: boolean) => void;
}

export const Scanner: React.FC<ScannerProps> = ({
  initialType = 'text',
  onAnalysisComplete,
  isAnalyzing,
  setIsAnalyzing
}) => {
  const [activeTab, setActiveTab] = useState<AnalysisType>(initialType);
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [scanStep, setScanStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialType) {
      setActiveTab(initialType);
    }
  }, [initialType]);

  const stepsText = [
    activeTab === 'text' ? 'Vérification du texte et de l’expéditeur…' : 'Validation de la structure de l’URL…',
    activeTab === 'text' ? 'Analyse des liens et des domaines…' : 'Inspection du protocole SSL/TLS et DNS…',
    'Recherche des signaux suspects et techniques d’ingénierie sociale…',
    'Calcul du score de risque et synthèse des recommandations…'
  ];

  const handleStartAnalysis = async () => {
    setErrorMessage(null);
    const content = activeTab === 'text' ? textContent.trim() : urlContent.trim();

    if (!content) {
      setErrorMessage(
        activeTab === 'text'
          ? 'Veuillez coller le contenu de l’email ou du message suspect à analyser.'
          : 'Veuillez renseigner l’URL suspecte à vérifier.'
      );
      return;
    }

    setIsAnalyzing(true);
    setScanStep(0);

    // Step-by-step progressive animation
    const stepInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 650);

    try {
      // 1. Try server-side API analysis first
      let result: AnalysisResult | null = null;
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: activeTab, content })
        });
        if (response.ok) {
          result = await response.json();
        }
      } catch (networkErr) {
        console.warn('API fetch error, falling back to local cybersecurity engine:', networkErr);
      }

      // 2. Fallback to client-side engine if server route is unavailable or offline
      if (!result) {
        result = activeTab === 'url' ? analyzeUrlInput(content) : analyzeTextMessage(content);
      }

      // Allow final step animation to complete gracefully
      setTimeout(() => {
        clearInterval(stepInterval);
        setIsAnalyzing(false);
        if (result) {
          onAnalysisComplete(result);
        }
      }, 2600);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setErrorMessage('Une erreur est survenue lors de l’analyse. Veuillez réessayer.');
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_ANALYSES[0]) => {
    setActiveTab(preset.type);
    if (preset.type === 'text') {
      setTextContent(preset.content);
    } else {
      setUrlContent(preset.content);
    }
    setErrorMessage(null);
  };

  return (
    <section id="espace-analyse" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700/50 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>MOTEUR DE DÉTECTION PHISHING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Analysez votre contenu suspect
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Choisissez le type d’élément suspect pour examiner instantanément les vecteurs de fraude.
          </p>
        </div>

        {/* Main Scanner Box */}
        <div className="bg-slate-900/95 border border-blue-800/60 rounded-2xl shadow-2xl shadow-blue-950/80 overflow-hidden backdrop-blur-md">
          {/* Analysis Tabs */}
          <div className="flex border-b border-blue-900/40 bg-slate-950/60">
            <button
              id="tab-btn-message"
              onClick={() => {
                setActiveTab('text');
                setErrorMessage(null);
              }}
              disabled={isAnalyzing}
              className={`flex-1 py-4 px-6 text-center font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all border-b-2 cursor-pointer ${
                activeTab === 'text'
                  ? 'border-blue-500 text-cyan-300 bg-blue-950/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Mail className={`w-5 h-5 ${activeTab === 'text' ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>Onglet 1 — Email / Message</span>
            </button>

            <button
              id="tab-btn-url"
              onClick={() => {
                setActiveTab('url');
                setErrorMessage(null);
              }}
              disabled={isAnalyzing}
              className={`flex-1 py-4 px-6 text-center font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all border-b-2 cursor-pointer ${
                activeTab === 'url'
                  ? 'border-cyan-400 text-cyan-300 bg-blue-950/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Globe className={`w-5 h-5 ${activeTab === 'url' ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>Onglet 2 — URL</span>
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Tab 1: Email / Message */}
            {activeTab === 'text' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="message-input" className="block text-sm font-medium text-slate-200">
                    Contenu du message ou de l’email suspect
                  </label>
                  <span className="text-xs text-slate-400">
                    Accepte : Email pro, SMS, WhatsApp, notification bancaire, etc.
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    id="message-input"
                    rows={7}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    disabled={isAnalyzing}
                    placeholder="Collez ici le contenu de l’email ou du message suspect…"
                    className="w-full rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-100 placeholder-slate-500 p-4 text-sm font-mono leading-relaxed transition-all resize-y"
                  />
                  {textContent && !isAnalyzing && (
                    <button
                      onClick={() => setTextContent('')}
                      className="absolute top-3 right-3 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 cursor-pointer"
                    >
                      Effacer
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Vos données ne sont ni revendues ni stockées publiquement.</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {textContent.length} caractères
                  </span>
                </div>
              </div>
            ) : (
              /* Tab 2: URL */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="url-input" className="block text-sm font-medium text-slate-200">
                    Lien hypertexte ou adresse web suspecte
                  </label>
                  <span className="text-xs text-amber-400/90 font-medium">
                    🛡️ Isolation sandbox : aucun lien n’est ouvert
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="url-input"
                    type="text"
                    value={urlContent}
                    onChange={(e) => setUrlContent(e.target.value)}
                    disabled={isAnalyzing}
                    placeholder="Collez ici l’URL suspecte…"
                    className="w-full rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-slate-100 placeholder-slate-500 px-4 py-3.5 text-sm font-mono transition-all"
                  />
                  {urlContent && !isAnalyzing && (
                    <button
                      onClick={() => setUrlContent('')}
                      className="absolute top-2.5 right-3 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 cursor-pointer"
                    >
                      Effacer
                    </button>
                  )}
                </div>

                {/* Important Security Notice */}
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200 leading-relaxed">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 font-semibold">Règle de sécurité stricte :</strong> Phis Guard
                    analyse le domaine et la structure sans jamais exécuter de scripts distants ni ouvrir
                    l’adresse directement dans votre navigateur.
                  </div>
                </div>
              </div>
            )}

            {/* Error Message if empty */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Progress Animation State when Analyzing */}
            {isAnalyzing ? (
              <div className="py-6 px-4 rounded-xl bg-slate-950 border border-blue-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
                    <span className="font-semibold text-white text-sm sm:text-base">
                      Analyse de sécurité en cours…
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {Math.min(100, Math.round(((scanStep + 1) / 4) * 100))}%
                  </span>
                </div>

                {/* Step indicators */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${((scanStep + 1) / 4) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-mono">
                  {stepsText.map((step, idx) => {
                    const isDone = idx < scanStep;
                    const isCurrent = idx === scanStep;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                          isCurrent
                            ? 'bg-blue-950/80 border-blue-500/60 text-cyan-300'
                            : isDone
                            ? 'bg-slate-900/60 border-emerald-900/40 text-emerald-400'
                            : 'bg-slate-950/40 border-slate-800/40 text-slate-500'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : isCurrent ? (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
                        )}
                        <span className="truncate">{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Action Button */
              <div>
                <button
                  id={activeTab === 'text' ? 'btn-analyze-message' : 'btn-verify-url'}
                  onClick={handleStartAnalysis}
                  className="w-full py-4 px-6 rounded-xl font-bold text-white text-base bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer border border-blue-400/40"
                >
                  <ShieldAlert className="w-5 h-5 text-cyan-100" />
                  <span>{activeTab === 'text' ? 'Analyser le message' : 'Vérifier l’URL'}</span>
                  <ArrowRight className="w-5 h-5 text-cyan-200" />
                </button>
              </div>
            )}

            {/* Presets / Exemples réels */}
            {!isAnalyzing && (
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Exemples fréquents de phishing à tester :
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESET_ANALYSES.map((preset, idx) => (
                    <button
                      key={idx}
                      id={`preset-btn-${idx}`}
                      onClick={() => handleApplyPreset(preset)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/70 hover:bg-blue-900/60 border border-slate-700/60 hover:border-blue-600 text-slate-300 hover:text-white transition-all text-left flex items-center gap-1.5 cursor-pointer"
                      title={preset.description}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${preset.type === 'text' ? 'bg-blue-400' : 'bg-cyan-400'}`} />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
