import React from 'react';
import {
  Activity,
  AlertTriangle,
  Mail,
  Globe,
  TrendingUp,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  Eye,
  FileCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { AnalysisResult, HistoryItem } from '../types';

interface DashboardProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onSelectHistoryItem: (result: AnalysisResult) => void;
  onStartNewScan: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  history,
  onClearHistory,
  onSelectHistoryItem,
  onStartNewScan
}) => {
  // Compute dashboard metrics
  const totalAnalyses = history.length;
  const riskCount = history.filter((h) => h.score >= 41).length;
  const urlCount = history.filter((h) => h.type === 'URL').length;
  const emailCount = history.filter((h) => h.type === 'Email').length;
  const avgScore =
    totalAnalyses > 0
      ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / totalAnalyses)
      : 0;

  // Format data for Recharts evolution
  const chartData = [...history]
    .reverse()
    .slice(-10)
    .map((item, idx) => ({
      name: `#${idx + 1}`,
      date: item.date.split(' ')[0] || item.date,
      score: item.score,
      type: item.type
    }));

  return (
    <section id="dashboard-section" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700/50 text-cyan-300 text-xs font-mono mb-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>TABLEAU DE BORD DE SÉCURITÉ</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Tableau de bord & Historique
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Suivi statistique des menaces analysées et registre chronologique de vos vérifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {history.length > 0 && (
              <button
                id="btn-clear-history"
                onClick={onClearHistory}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Supprimer l’historique</span>
              </button>
            )}
            <button
              id="btn-dash-new-scan"
              onClick={onStartNewScan}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-700/20 transition-all cursor-pointer border border-blue-400/30"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Nouvelle vérification</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Total Analyses */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-blue-900/40 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
              <span>Total analyses</span>
              <FileCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white tracking-tight">
              {totalAnalyses}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Éléments inspectés</div>
          </div>

          {/* Contenus à risque */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-red-900/40 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
              <span>Contenus à risque</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-3xl font-black font-mono text-red-400 tracking-tight">
              {riskCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Score &gt; 40/100</div>
          </div>

          {/* URLs analysées */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-900/40 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
              <span>URLs analysées</span>
              <Globe className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black font-mono text-cyan-400 tracking-tight">
              {urlCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Liens & domaines</div>
          </div>

          {/* Emails analysés */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-900/40 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
              <span>Emails analysés</span>
              <Mail className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black font-mono text-indigo-300 tracking-tight">
              {emailCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Messages & SMS</div>
          </div>

          {/* Risque moyen */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-900/40 shadow-lg col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
              <span>Risque moyen</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black font-mono text-amber-400 tracking-tight">
              {avgScore}
              <span className="text-sm text-slate-500 font-normal">/100</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Indice global</div>
          </div>
        </div>

        {/* Evolution Chart */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-blue-900/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <span>Évolution des risques détectés</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Courbe chronologique du niveau de menace (scores de 0 à 100)
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {chartData.length} dernières analyses
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#1e3a8a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                    formatter={(val: any) => [`Score : ${val}/100`, 'Risque']}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#38bdf8"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm">
                <Activity className="w-8 h-8 mb-2 opacity-30" />
                <span>Effectuez une première analyse pour visualiser le graphique.</span>
              </div>
            )}
          </div>
        </div>

        {/* Section 10: Historique des analyses */}
        <div className="bg-slate-900/90 rounded-2xl border border-blue-900/40 p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Historique des analyses récentes</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Consultez vos analyses passées sauvegardées localement dans votre navigateur.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {history.length} entrée(s)
            </span>
          </div>

          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm">Aucune analyse enregistrée pour le moment.</p>
              <button
                onClick={onStartNewScan}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <span>Lancer une analyse maintenant</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs uppercase font-semibold text-slate-400 font-mono tracking-wider">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Aperçu</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Niveau de risque</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-slate-300 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="py-3 px-4 font-medium whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border ${
                          item.type === 'URL'
                            ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/50'
                            : 'bg-blue-950/60 text-blue-300 border-blue-800/50'
                        }`}>
                          {item.type === 'URL' ? <Globe className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                          <span>{item.type}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-xs max-w-xs truncate font-mono">
                        {item.preview}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                        {item.score}/100
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono ${
                          item.score >= 81
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                            : item.score >= 61
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                            : item.score >= 41
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : item.score >= 21
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}>
                          {item.riskLabel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        {item.fullResult && (
                          <button
                            id={`btn-view-history-${item.id}`}
                            onClick={() => onSelectHistoryItem(item.fullResult!)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium text-cyan-300 hover:text-white bg-blue-950/80 hover:bg-blue-900/80 border border-blue-800/60 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Voir</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
