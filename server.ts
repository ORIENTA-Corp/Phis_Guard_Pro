import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { analyzeTextMessage, analyzeUrlInput } from './src/utils/phishingEngine.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser with reasonable limits
  app.use(express.json({ limit: '1mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Phis Guard Cybersecurity Intelligence Engine',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      aiEnabled: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // Contact form submission endpoint
  app.post('/api/contact', (req, res) => {
    try {
      const { name, email, subject, message } = req.body || {};
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires (Nom, Email, Message).' });
      }
      // Log cleanly server-side
      console.log(`[Phis Guard Contact] From: ${name} <${email}> | Subject: ${subject || 'Sans sujet'}`);
      return res.json({
        success: true,
        message: 'Votre message a été transmis avec succès à l’équipe de sécurité Phis Guard.',
        ticketId: 'SEC-' + Math.floor(100000 + Math.random() * 900000)
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Erreur lors de l’enregistrement de votre message.' });
    }
  });

  // Phishing analysis endpoint
  app.post('/api/analyze', async (req, res) => {
    try {
      const { type, content } = req.body || {};

      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        return res.status(400).json({ error: 'Le contenu à analyser ne peut pas être vide.' });
      }

      if (content.length > 50000) {
        return res.status(400).json({ error: 'Le contenu est trop volumineux (limite de 50 000 caractères).' });
      }

      const analysisType = type === 'url' ? 'url' : 'text';

      // 1. Heuristic engine baseline analysis (instant, deterministic, robust)
      let result = analysisType === 'url' ? analyzeUrlInput(content) : analyzeTextMessage(content);

      // 2. Optional Gemini AI enhancement if GEMINI_API_KEY is available
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          const prompt = `Tu es un expert senior en cybersécurité certifié pour le produit Phis Guard. Analyse ce contenu suspect (${analysisType === 'url' ? 'URL' : 'email / message'}).
Contenu:
"""${content.slice(0, 4000)}"""

Score heuristique préliminaire: ${result.score}/100.

Fournis une analyse au format JSON strict avec les clés:
- "aiScore": nombre entre 0 et 100 (score de dangerosité phishing)
- "aiSummary": phrase concise en français expliquant le diagnostic
- "additionalSignals": tableau d'objets avec {"name": string, "severity": "low"|"medium"|"high"|"critical", "explanation": string, "recommendation": string}
- "expertAdvice": tableau de 2 conseils clés prioritaires

Réponds UNIQUEMENT avec l'objet JSON sans markdown.`;

          const aiResponse = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json'
            }
          });

          if (aiResponse.text) {
            const aiData = JSON.parse(aiResponse.text);
            if (typeof aiData.aiScore === 'number') {
              // Pondération intelligente : moyenne entre heuristique experte et analyse sémantique IA
              const blendedScore = Math.round(result.score * 0.55 + aiData.aiScore * 0.45);
              result.score = Math.min(100, Math.max(0, blendedScore));
              if (result.score <= 20) {
                result.riskLevel = 'very_low';
                result.riskLabel = 'Risque très faible';
              } else if (result.score <= 40) {
                result.riskLevel = 'low';
                result.riskLabel = 'Risque faible';
              } else if (result.score <= 60) {
                result.riskLevel = 'moderate';
                result.riskLabel = 'Risque modéré';
              } else if (result.score <= 80) {
                result.riskLevel = 'high';
                result.riskLabel = 'Risque élevé';
              } else {
                result.riskLevel = 'critical';
                result.riskLabel = 'Risque critique';
              }
            }
            if (aiData.aiSummary) {
              result.summary = aiData.aiSummary;
            }
            if (Array.isArray(aiData.additionalSignals)) {
              aiData.additionalSignals.forEach((sig: any, index: number) => {
                if (sig && sig.name && sig.explanation) {
                  result.signals.push({
                    id: 'ai-sig-' + index,
                    name: String(sig.name),
                    severity: ['low', 'medium', 'high', 'critical'].includes(sig.severity) ? sig.severity : 'high',
                    explanation: String(sig.explanation),
                    recommendation: String(sig.recommendation || 'Faites preuve d’une prudence maximale.')
                  });
                }
              });
            }
            if (Array.isArray(aiData.expertAdvice) && aiData.expertAdvice.length > 0) {
              result.recommendations = [
                ...aiData.expertAdvice.map(String),
                ...result.recommendations
              ].slice(0, 5);
            }
            if (result.technicalDetails) {
              result.technicalDetails.analysisEngine = 'Phis Guard Hybrid Neural & Heuristic Engine (Gemini 3.8 Flash)';
            }
          }
        } catch (geminiError) {
          console.warn('[Phis Guard] Gemini enhancement skipped or failed, using heuristic engine:', geminiError);
          // Result still contains high-accuracy heuristic analysis
        }
      }

      return res.json(result);
    } catch (err: any) {
      console.error('[Phis Guard] Analysis error:', err);
      return res.status(500).json({ error: 'Une erreur est survenue lors de l’analyse de sécurité.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Phis Guard server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
