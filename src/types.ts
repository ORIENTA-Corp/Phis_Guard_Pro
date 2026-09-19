export type AnalysisType = 'text' | 'url';

export type RiskLevel = 'very_low' | 'low' | 'moderate' | 'high' | 'critical';

export interface AnalysisSignal {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  recommendation: string;
}

export interface TableResultItem {
  element: string;
  result: string;
  status: 'safe' | 'warning' | 'danger';
}

export interface AnalysisResult {
  id: string;
  type: AnalysisType;
  input: string;
  score: number; // 0 - 100
  riskLevel: RiskLevel;
  riskLabel: string;
  summary: string;
  signals: AnalysisSignal[];
  table: TableResultItem[];
  recommendations: string[];
  timestamp: string;
  technicalDetails?: {
    domainsFound?: string[];
    suspiciousKeywords?: string[];
    hasHttps?: boolean;
    isIpAddress?: boolean;
    hasAtSymbol?: boolean;
    excessiveLength?: boolean;
    typoSquattingBrand?: string | null;
    analysisEngine?: string;
  };
}

export interface HistoryItem {
  id: string;
  date: string;
  type: 'Email' | 'URL';
  score: number;
  riskLevel: RiskLevel;
  riskLabel: string;
  preview: string;
  status: string;
  fullResult?: AnalysisResult;
}

export interface DashboardStats {
  totalAnalyses: number;
  riskCount: number;
  urlCount: number;
  emailCount: number;
  avgScore: number;
}

export interface CyberAdvice {
  id: string;
  title: string;
  tag: string;
  summary: string;
  detailedPoints: string[];
  goldenRule: string;
  iconName: string;
}
