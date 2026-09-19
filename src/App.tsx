import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Scanner } from './components/Scanner';
import { AnalysisResultsView } from './components/AnalysisResultsView';
import { Dashboard } from './components/Dashboard';
import { HowItWorks } from './components/HowItWorks';
import { CyberAdviceSection } from './components/CyberAdviceSection';
import { AboutSection } from './components/AboutSection';
import { PrivacySection } from './components/PrivacySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AnalysisResult, AnalysisType, HistoryItem } from './types';

// Default initial history entries for illustrative dashboard
const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    date: '18/09/2026 16:42',
    type: 'URL',
    score: 76,
    riskLevel: 'high',
    riskLabel: 'Risque élevé',
    preview: 'http://paypal-verification-account-security.xyz/signin',
    status: 'Terminée'
  },
  {
    id: 'hist-2',
    date: '18/09/2026 11:15',
    type: 'Email',
    score: 87,
    riskLevel: 'critical',
    riskLabel: 'Risque critique',
    preview: 'URGENT - SERVICE SÉCURITÉ BANCAIRE : Suspension sous 24h…',
    status: 'Terminée'
  },
  {
    id: 'hist-3',
    date: '17/09/2026 14:02',
    type: 'URL',
    score: 12,
    riskLevel: 'very_low',
    riskLabel: 'Risque très faible',
    preview: 'https://www.service-public.fr/particuliers/vosdroits',
    status: 'Terminée'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [scannerType, setScannerType] = useState<AnalysisType>('text');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem('phisguard_history');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Unable to load history from localStorage', e);
    }
    return INITIAL_HISTORY;
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('phisguard_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Unable to save history to localStorage', e);
    }
  }, [history]);

  const handleSelectHeroType = (type: 'text' | 'url') => {
    setScannerType(type);
    setActiveTab('analyser');
    setCurrentResult(null);
    const elem = document.getElementById('espace-analyse');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setCurrentResult(result);

    // Add to history
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('fr-FR')} ${now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;

    const newHistoryItem: HistoryItem = {
      id: result.id,
      date: formattedDate,
      type: result.type === 'url' ? 'URL' : 'Email',
      score: result.score,
      riskLevel: result.riskLevel,
      riskLabel: result.riskLabel,
      preview: result.input.slice(0, 60) + (result.input.length > 60 ? '…' : ''),
      status: 'Terminée',
      fullResult: result
    };

    setHistory((prev) => [newHistoryItem, ...prev]);

    // Scroll smoothly to results
    setTimeout(() => {
      const resElem = document.getElementById('resultat-analyse');
      if (resElem) {
        resElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleResetAnalysis = () => {
    setCurrentResult(null);
    const elem = document.getElementById('espace-analyse');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('phisguard_history');
    } catch (e) {
      // ignore
    }
  };

  const handleSelectHistoryItem = (result: AnalysisResult) => {
    setCurrentResult(result);
    setActiveTab('analyser');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickScan = () => {
    setActiveTab('analyser');
    setCurrentResult(null);
    setTimeout(() => {
      const elem = document.getElementById('espace-analyse');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'analyser') {
            // Keep current result or ready to scan
          }
        }}
        onQuickScan={handleQuickScan}
      />

      {/* Main Content Areas based on Active Tab or Single-Page Unified Experience */}
      <main className="flex-1">
        {activeTab === 'accueil' && (
          <>
            <Hero onSelectType={handleSelectHeroType} />
            <Scanner
              initialType={scannerType}
              onAnalysisComplete={handleAnalysisComplete}
              isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing}
            />
            {currentResult && (
              <AnalysisResultsView result={currentResult} onReset={handleResetAnalysis} />
            )}
            <HowItWorks onStartScan={() => handleSelectHeroType('text')} />
            <CyberAdviceSection />
            <AboutSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'analyser' && (
          <div className="pt-6 pb-12">
            <Scanner
              initialType={scannerType}
              onAnalysisComplete={handleAnalysisComplete}
              isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing}
            />
            {currentResult && (
              <AnalysisResultsView result={currentResult} onReset={handleResetAnalysis} />
            )}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="pt-6 pb-12">
            <Dashboard
              history={history}
              onClearHistory={handleClearHistory}
              onSelectHistoryItem={handleSelectHistoryItem}
              onStartNewScan={() => handleSelectHeroType('text')}
            />
          </div>
        )}

        {activeTab === 'comment-ca-marche' && (
          <div className="pt-6 pb-12">
            <HowItWorks onStartScan={() => handleSelectHeroType('text')} />
          </div>
        )}

        {activeTab === 'conseils' && (
          <div className="pt-6 pb-12">
            <CyberAdviceSection />
          </div>
        )}

        {activeTab === 'a-propos' && (
          <div className="pt-6 pb-12">
            <AboutSection />
          </div>
        )}

        {activeTab === 'confidentialite' && (
          <div className="pt-6 pb-12">
            <PrivacySection onClearLocalHistory={handleClearHistory} />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-6 pb-12">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
