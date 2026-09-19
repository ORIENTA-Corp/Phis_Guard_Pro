import { AnalysisResult, AnalysisSignal, AnalysisType, RiskLevel, TableResultItem } from '../types';

// Liste de marques fréquemment ciblées par le phishing
export const TARGETED_BRANDS = [
  { name: 'PayPal', domain: 'paypal.com', patterns: [/paypal/i, /pay-pal/i, /paypa1/i] },
  { name: 'Netflix', domain: 'netflix.com', patterns: [/netflix/i, /netfllx/i, /net-flix/i] },
  { name: 'Apple', domain: 'apple.com', patterns: [/apple/i, /icloud/i, /appleid/i, /apple-id/i] },
  { name: 'Microsoft', domain: 'microsoft.com', patterns: [/microsoft/i, /office365/i, /outlook/i, /live\.com/i] },
  { name: 'Google', domain: 'google.com', patterns: [/google/i, /gmail/i, /drive/i] },
  { name: 'Amazon', domain: 'amazon.com', patterns: [/amazon/i, /amzn/i, /prime-video/i] },
  { name: 'Ameli / Sécurité Sociale', domain: 'ameli.fr', patterns: [/ameli/i, /assurance-maladie/i, /secu-sociale/i, /carte-vitale/i] },
  { name: 'La Poste / Chronopost', domain: 'laposte.fr', patterns: [/laposte/i, /chronopost/i, /colissimo/i, /suivi-colis/i, /mondialrelay/i] },
  { name: 'Direction Générale des Finances Publiques (Impôts)', domain: 'impots.gouv.fr', patterns: [/impots?\.gouv/i, /dgfip/i, /remboursement-impot/i] },
  { name: 'CAF', domain: 'caf.fr', patterns: [/caf\.fr/i, /allocations-familiales/i] },
  { name: 'Banque / Établissement financier', domain: 'banque.fr', patterns: [/societe-generale/i, /bnp-paribas/i, /credit-agricole/i, /caisse-epargne/i, /banque-postale/i, /bourso/i, /revolut/i] },
  { name: 'WhatsApp', domain: 'whatsapp.com', patterns: [/whatsapp/i, /whats-app/i, /wa\.me/i] },
  { name: 'Facebook / Meta / Instagram', domain: 'meta.com', patterns: [/facebook/i, /instagram/i, /meta-security/i] },
];

export const SUSPICIOUS_TLDS = ['.top', '.xyz', '.work', '.click', '.club', '.buzz', '.monster', '.tk', '.ml', '.ga', '.cf', '.gq', '.cam', '.cfd'];

export const SUSPICIOUS_URL_KEYWORDS = [
  'login', 'signin', 'se-connecter', 'verification', 'verify', 'verifier', 'secure', 'securite',
  'account', 'compte', 'billing', 'facturation', 'update', 'maj', 'confirm', 'auth', 'authentification',
  'wallet', 'recover', 'reactiver', 'deblocage', 'colis', 'livraison', 'taxe', 'amende', 'infraction', 'carte-vitale'
];

export function determineRiskLevel(score: number): { level: RiskLevel; label: string } {
  if (score <= 20) {
    return { level: 'very_low', label: 'Risque très faible' };
  } else if (score <= 40) {
    return { level: 'low', label: 'Risque faible' };
  } else if (score <= 60) {
    return { level: 'moderate', label: 'Risque modéré' };
  } else if (score <= 80) {
    return { level: 'high', label: 'Risque élevé' };
  } else {
    return { level: 'critical', label: 'Risque critique' };
  }
}

/**
 * Analyse approfondie d'un texte d'email ou message suspect
 */
export function analyzeTextMessage(text: string): AnalysisResult {
  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();

  const signals: AnalysisSignal[] = [];
  let scorePenalty = 0;
  const tableItems: TableResultItem[] = [];
  const recommendations: string[] = [];
  const foundKeywords: string[] = [];

  // 1. Détection d'urgence artificielle & pression psychologique
  const urgencyRegex = /\b(urgente?|immédiatement|sous (24|48|12)h|dans les (24|48) heures|bloqu(é|er|era|e)|suspendu(e)?|supprim(é|er)|immédiat|délai dépassé|dernier rappel|sans délai|menace|fermeture de votre compte|mise en demeure)\b/i;
  const hasUrgency = urgencyRegex.test(lowerText);
  if (hasUrgency) {
    scorePenalty += 24;
    signals.push({
      id: 'urgency',
      name: 'Urgence artificielle et pression temporelle',
      severity: 'high',
      explanation: 'Le message exige une action immédiate sous peine de conséquences graves (blocage de compte, suppression, frais). Cette technique de manipulation psychologique vise à court-circuiter votre esprit critique.',
      recommendation: 'Ne cédez jamais à la panique. Les services légitimes accordent toujours un délai raisonnable et ne bloquent pas un compte sans préavis officiel.'
    });
    tableItems.push({ element: 'Urgence artificielle', result: 'Détectée', status: 'danger' });
    recommendations.push('Prenez du recul : ne répondez pas sous le coup de la panique ou de la précipitation.');
  } else {
    tableItems.push({ element: 'Urgence artificielle', result: 'Non détectée', status: 'safe' });
  }

  // 2. Menaces juridiques ou pénales
  const legalThreatRegex = /\b(amende|poursuites? (judiciaires?|pénale)|huissier|police|gendarmerie|tribunal|convocation|infraction|mandat|procureur|brigade des mineurs)\b/i;
  if (legalThreatRegex.test(lowerText)) {
    scorePenalty += 28;
    signals.push({
      id: 'legal_threat',
      name: 'Pression psychologique ou menace de sanction',
      severity: 'critical',
      explanation: 'Le message utilise des termes juridiques intimidants (amende, police, convocation) pour effrayer le destinataire et le contraindre à agir.',
      recommendation: 'Les institutions judiciaires et la police ne transmettent jamais de convocations pénales directes par email ou SMS informel.'
    });
    recommendations.push('Ne répondez sous aucun prétexte aux prétendues convocations policières ou judiciaires reçues par email.');
  }

  // 3. Demande de code OTP / SMS de validation
  const otpRegex = /\b(code (otp|sms|secret|de validation|de sécurité|reçu)|mot de passe temporaire|code à [456] chiffres)\b/i;
  if (otpRegex.test(lowerText)) {
    scorePenalty += 35;
    signals.push({
      id: 'otp_demand',
      name: 'Tentative de détournement de code OTP ou validation à deux facteurs',
      severity: 'critical',
      explanation: 'Le message sollicite un code de sécurité reçu par SMS ou notification. Un pirate tente probablement de valider une transaction ou d’accéder à votre compte.',
      recommendation: 'Ne transmettez JAMAIS votre code OTP. Aucune banque, opérateur ni support client légitime ne vous demandera votre code de confirmation.'
    });
    tableItems.push({ element: 'Demande de code OTP', result: 'Détectée (Critique)', status: 'danger' });
    recommendations.push('Gardez vos codes de validation SMS strictement secrets : ils équivalent à votre signature électronique.');
  }

  // 4. Demande d'identifiants ou mot de passe
  const credsRegex = /\b(mot de passe|password|identifiants?|connexion obligatoire|vos accès|mettre à jour vos identifiants|confirmer votre mot de passe)\b/i;
  const hasCreds = credsRegex.test(lowerText);
  if (hasCreds) {
    scorePenalty += 30;
    signals.push({
      id: 'credentials_request',
      name: 'Demande suspecte d’identifiants ou de mot de passe',
      severity: 'critical',
      explanation: 'Le message invite à communiquer ou saisir des identifiants confidentiels. Les pirates créent souvent des pages miroirs pour dérober ces accès.',
      recommendation: 'Ne saisissez jamais vos identifiants via un lien contenu dans un message. Rendez-vous vous-même sur le site officiel en tapant son adresse.'
    });
    tableItems.push({ element: "Demande d'identifiants", result: 'Détectée', status: 'danger' });
    recommendations.push('Ne communiquez jamais votre mot de passe et changez-le si vous l’avez saisi sur une page suspecte.');
  } else {
    tableItems.push({ element: "Demande d'identifiants", result: 'Non détectée', status: 'safe' });
  }

  // 5. Demande de coordonnées bancaires ou paiement inhabituel
  const bankRegex = /\b(coordonnées bancaires|numéro de carte|cryptogramme|cvv|iban|rib|frais de douane|frais de livraison|carte bancaire|payer (2|3|4|5|10|15|20) ?(€|\$|eur)|recharge pcs|transcash|recharge néosurf)\b/i;
  if (bankRegex.test(lowerText)) {
    scorePenalty += 32;
    signals.push({
      id: 'banking_request',
      name: 'Demande de coordonnées bancaires ou de paiement inhabituel',
      severity: 'critical',
      explanation: 'Le message demande des numéros de carte bancaire, un paiement minime (prétexte de frais de livraison ou colis bloqué) ou des coupons de paiement anonymes.',
      recommendation: 'Ne saisissez aucune coordonnée bancaire. Vérifiez toujours la réalité du prétendu colis ou dossier sur le site officiel.'
    });
    tableItems.push({ element: 'Demande bancaire / paiement', result: 'Détectée', status: 'danger' });
    recommendations.push('Vérifiez vos relevés bancaires et faites opposition immédiatement en cas de doute.');
  }

  // 6. Liens et URLs extraits du message
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[^\s]*)/gi;
  const extractedUrls = cleanText.match(urlRegex) || [];
  let suspiciousLinksFound = false;

  if (extractedUrls.length > 0) {
    extractedUrls.forEach((url) => {
      const uLower = url.toLowerCase();
      if (
        uLower.includes('bit.ly') ||
        uLower.includes('tinyurl') ||
        uLower.includes('is.gd') ||
        uLower.includes('t.co') ||
        SUSPICIOUS_TLDS.some((tld) => uLower.includes(tld)) ||
        SUSPICIOUS_URL_KEYWORDS.some((kw) => uLower.includes(kw))
      ) {
        suspiciousLinksFound = true;
      }
    });

    if (suspiciousLinksFound) {
      scorePenalty += 28;
      signals.push({
        id: 'suspicious_link',
        name: 'Lien hypertexte trompeur ou réducteur d’URL',
        severity: 'high',
        explanation: `Le message contient ${extractedUrls.length} lien(s), dont certains utilisent des techniques d'obfuscation, des raccourcisseurs d'URL ou des domaines atypiques.`,
        recommendation: 'Ne cliquez jamais sur les liens intégrés dans les messages non sollicités. Survolez le lien pour vérifier sa destination réelle ou utilisez l’onglet Analyse URL.'
      });
      tableItems.push({ element: 'Lien suspect', result: 'Détecté (' + extractedUrls.length + ' lien(s))', status: 'danger' });
      recommendations.push('Ne cliquez jamais directement sur le lien présent dans le message.');
    } else {
      scorePenalty += 10;
      tableItems.push({ element: 'Lien détecté', result: extractedUrls.length + ' lien(s) présent(s)', status: 'warning' });
    }
  } else {
    tableItems.push({ element: 'Lien suspect', result: 'Aucun lien détecté', status: 'safe' });
  }

  // 7. Usurpation de marque ou entité de confiance (Brand Impersonation)
  let impersonatedBrand: string | null = null;
  for (const b of TARGETED_BRANDS) {
    if (b.patterns.some((p) => p.test(lowerText))) {
      impersonatedBrand = b.name;
      break;
    }
  }

  if (impersonatedBrand) {
    // Si la marque est mentionnée mais avec urgence ou demande d'identifiants
    if (hasUrgency || hasCreds || bankRegex.test(lowerText)) {
      scorePenalty += 22;
      signals.push({
        id: 'brand_impersonation',
        name: `Usurpation présumée de marque (${impersonatedBrand})`,
        severity: 'high',
        explanation: `Le message mentionne ${impersonatedBrand} tout en réclamant une action sous pression ou des données sensibles. Les cybercriminels copient fréquemment l’identité visuelle de cette marque.`,
        recommendation: `Accédez à votre espace ${impersonatedBrand} exclusivement en passant par l’application officielle ou en tapant vous-même l’adresse web.`
      });
      tableItems.push({ element: 'Domaine / Marque suspecte', result: `Usurpation probable (${impersonatedBrand})`, status: 'danger' });
      recommendations.push(`Contactez directement le support officiel de ${impersonatedBrand} via leur canal certifié.`);
    } else {
      tableItems.push({ element: 'Marque mentionnée', result: impersonatedBrand, status: 'warning' });
    }
  } else {
    tableItems.push({ element: 'Domaine suspect', result: 'Aucune usurpation évidente', status: 'safe' });
  }

  // 8. Fautes d'orthographe, syntaxe robotique ou tournures artificielles
  const brokenPhrasesRegex = /\b(cher client|chère cliente|bonjour ami|veuillez de|mise a niveau obligatoire|veuillez confirmer votre existence|compte a ete restreint|re-activer|vous devez de suite)\b/i;
  if (brokenPhrasesRegex.test(lowerText)) {
    scorePenalty += 15;
    signals.push({
      id: 'bad_syntax',
      name: 'Formulation impersonnelle ou syntaxe anormale',
      severity: 'medium',
      explanation: 'Salutation générique ("Cher client") ou tournures maladroites caractéristiques des campagnes de phishing automatisées ou traduites à la va-vite.',
      recommendation: 'Les organismes officiels et banques s’adressent généralement à vous avec vos prénom et nom authentiques.'
    });
  }

  // 9. Promesse trop belle (loterie, gain inattendu, remboursement magique)
  const tooGoodRegex = /\b(vous avez gagné|tirage au sort|remboursement inattendu|trop-perçu de [0-9]+|héritage|bonus exceptionnel|500€ offerts|gagnez un iphone)\b/i;
  if (tooGoodRegex.test(lowerText)) {
    scorePenalty += 25;
    signals.push({
      id: 'too_good_promise',
      name: 'Promesse d’un gain ou remboursement disproportionné',
      severity: 'high',
      explanation: 'Appât financier (gain, loterie, remboursement imprévu) conçu pour susciter l’enthousiasme et faire baisser la vigilance de la victime.',
      recommendation: 'Si une offre paraît trop belle pour être vraie, il s’agit quasi-systématiquement d’une escroquerie.'
    });
    recommendations.push('Méfiez-vous des remboursements ou gains non sollicités.');
  }

  // Calcul final du score de risque entre 0 et 100
  let finalScore = Math.min(100, Math.max(0, scorePenalty));
  if (signals.length === 0) {
    finalScore = Math.min(15, Math.floor(Math.random() * 8) + 5);
  }

  const riskInfo = determineRiskLevel(finalScore);

  // Recommendations par défaut si vide
  if (recommendations.length === 0) {
    recommendations.push('Vérifiez toujours l’adresse de l’expéditeur réel avant d’ouvrir une pièce jointe.');
    recommendations.push('En cas de doute, contactez votre correspondant par un canal alternatif connu (téléphone, messagerie interne).');
  }

  const summary =
    finalScore >= 61
      ? `Ce message présente de multiples signaux alarmants caractéristiques d'une attaque de phishing (${signals.map((s) => s.name).slice(0, 2).join(', ')}). Ne cliquez sur rien.`
      : finalScore >= 35
      ? 'Ce message présente quelques éléments ambigus ou atypiques. La prudence est recommandée avant toute interaction.'
      : 'Aucun indicateur de danger majeur n’a été identifié dans cet extrait de texte. Maintenez une vigilance normale.';

  return {
    id: 'msg-' + Date.now(),
    type: 'text',
    input: text.slice(0, 300) + (text.length > 300 ? '…' : ''),
    score: finalScore,
    riskLevel: riskInfo.level,
    riskLabel: riskInfo.label,
    summary,
    signals,
    table: tableItems,
    recommendations,
    timestamp: new Date().toISOString(),
    technicalDetails: {
      domainsFound: extractedUrls,
      suspiciousKeywords: foundKeywords,
      analysisEngine: 'Phis Guard Heuristic Security Engine v3.2'
    }
  };
}

/**
 * Analyse technique approfondie d'une URL
 */
export function analyzeUrlInput(rawUrl: string): AnalysisResult {
  const cleanInput = rawUrl.trim();
  const signals: AnalysisSignal[] = [];
  let scorePenalty = 0;
  const tableItems: TableResultItem[] = [];
  const recommendations: string[] = [];

  let parsedUrl: URL | null = null;
  let hasValidProtocol = false;

  try {
    let urlToParse = cleanInput;
    if (!cleanInput.startsWith('http://') && !cleanInput.startsWith('https://')) {
      urlToParse = 'https://' + cleanInput;
    } else {
      hasValidProtocol = true;
    }
    parsedUrl = new URL(urlToParse);
  } catch (e) {
    // URL malformée
  }

  const isHttps = cleanInput.toLowerCase().startsWith('https://');
  const isHttp = cleanInput.toLowerCase().startsWith('http://');

  // 1. Analyse du protocole HTTPS
  if (!isHttps && isHttp) {
    scorePenalty += 25;
    signals.push({
      id: 'no_https',
      name: 'Absence de chiffrement sécurisé HTTPS',
      severity: 'medium',
      explanation: 'Cette adresse utilise le protocole HTTP non chiffré. Vos données de connexion transitent en clair et peuvent être interceptées.',
      recommendation: 'Ne saisissez jamais d’identifiants ni de coordonnées confidentielles sur un site non sécurisé en HTTPS.'
    });
    tableItems.push({ element: 'Protocole HTTPS', result: 'Non sécurisé (HTTP simple)', status: 'warning' });
  } else if (isHttps) {
    tableItems.push({ element: 'Protocole HTTPS', result: 'Actif (Chiffrement SSL/TLS)', status: 'safe' });
  } else {
    tableItems.push({ element: 'Protocole', result: 'Non spécifié (Protocole par défaut)', status: 'warning' });
  }

  const hostname = parsedUrl ? parsedUrl.hostname.toLowerCase() : cleanInput.toLowerCase();
  const pathname = parsedUrl ? parsedUrl.pathname.toLowerCase() : '';
  const search = parsedUrl ? parsedUrl.search.toLowerCase() : '';
  const fullLower = cleanInput.toLowerCase();

  // 2. Détection d'adresse IP directe
  const ipRegex = /^(https?:\/\/)?(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/.*)?$/;
  const isIp = ipRegex.test(cleanInput);
  if (isIp) {
    scorePenalty += 40;
    signals.push({
      id: 'direct_ip',
      name: 'Utilisation d’une adresse IP directe au lieu d’un nom de domaine',
      severity: 'critical',
      explanation: 'L’URL pointe vers une adresse IP numérique brute. Les services légitimes utilisent des noms de domaine reconnus et vérifiés.',
      recommendation: 'Fuyez ce site. C’est un procédé classique pour contourner les filtres de réputation de nom de domaine.'
    });
    tableItems.push({ element: 'Structure du domaine', result: 'Adresse IP brute (Dangereux)', status: 'danger' });
    recommendations.push('Ne visitez pas les sites hébergés sur des adresses IP brutes sans nom de domaine.');
  }

  // 3. Détection de caractère @ dans l'URL (obfuscation)
  if (cleanInput.includes('@')) {
    scorePenalty += 45;
    signals.push({
      id: 'at_symbol_obfuscation',
      name: 'Présence du caractère "@" (Technique de camouflage d’URL)',
      severity: 'critical',
      explanation: 'Le symbole "@" dans une URL permet à un cybercriminel de faire croire que l’URL appartient à un domaine de confiance alors que le navigateur est redirigé vers l’hôte situé après le "@".',
      recommendation: 'N’ouvrez pas ce lien : il s’agit d’une tromperie délibérée de destination.'
    });
    tableItems.push({ element: 'Camouflage "@"', result: 'Détecté (Critique)', status: 'danger' });
  }

  // 4. Détection de TLD suspect (Top Level Domain)
  const matchingSuspiciousTld = SUSPICIOUS_TLDS.find((tld) => hostname.endsWith(tld));
  if (matchingSuspiciousTld) {
    scorePenalty += 26;
    signals.push({
      id: 'suspicious_tld',
      name: `Extension de domaine à haut risque (${matchingSuspiciousTld})`,
      severity: 'high',
      explanation: `L'extension ${matchingSuspiciousTld} est très prisée par les créateurs de pages de phishing pour son faible coût et l'absence de vérification d'identité.`,
      recommendation: 'Méfiez-vous particulièrement des domaines utilisant cette extension de premier niveau.'
    });
    tableItems.push({ element: 'Extension de domaine (TLD)', result: `Risque élevé (${matchingSuspiciousTld})`, status: 'danger' });
  } else {
    tableItems.push({ element: 'Extension de domaine', result: hostname.split('.').pop() || 'Standard', status: 'safe' });
  }

  // 5. Imitation de marques connues (Typosquatting & sous-domaines trompeurs)
  let brandImpersonated: string | null = null;
  let isLegitBrandDomain = false;

  for (const b of TARGETED_BRANDS) {
    if (b.patterns.some((p) => p.test(hostname) || p.test(pathname))) {
      brandImpersonated = b.name;
      // Vérifier si c'est vraiment le domaine officiel
      if (hostname === b.domain || hostname.endsWith('.' + b.domain)) {
        isLegitBrandDomain = true;
      }
      break;
    }
  }

  if (brandImpersonated) {
    if (!isLegitBrandDomain) {
      scorePenalty += 42;
      signals.push({
        id: 'brand_typosquatting',
        name: `Imitation trompeuse de la marque ${brandImpersonated}`,
        severity: 'critical',
        explanation: `L’URL emprunte le nom de ${brandImpersonated} mais le domaine racine n’est pas le domaine officiel certifié. Il s’agit très probablement d’une fausse page miroir de connexion.`,
        recommendation: `Ne saisissez AUCUNE information sur ce site. Allez sur le portail officiel de ${brandImpersonated}.`
      });
      tableItems.push({ element: 'Usurpation de marque', result: `Imitation détectée (${brandImpersonated})`, status: 'danger' });
      recommendations.push(`Vérifiez l’adresse officielle de ${brandImpersonated} dans vos favoris.`);
    } else {
      tableItems.push({ element: 'Domaine officiel', result: `Certifié conforme (${brandImpersonated})`, status: 'safe' });
    }
  } else {
    tableItems.push({ element: 'Usurpation de marque', result: 'Aucune imitation évidente', status: 'safe' });
  }

  // 6. Sous-domaines excessifs ou trompeurs (ex: paypal.com.securite-connexion.net)
  const domainParts = hostname.split('.');
  if (domainParts.length >= 4) {
    scorePenalty += 20;
    signals.push({
      id: 'excessive_subdomains',
      name: 'Multiples sous-domaines complexes',
      severity: 'medium',
      explanation: 'La présence de nombreux sous-domaines imbriqués est souvent utilisée pour noyer le véritable nom de domaine sur les écrans de smartphones.',
      recommendation: 'Regardez toujours les deux derniers segments du domaine (ex: domaine.com) pour identifier qui contrôle le site.'
    });
    tableItems.push({ element: 'Sous-domaines', result: `${domainParts.length} niveaux (Suspect)`, status: 'warning' });
  }

  // 7. Mots-clés de sécurité trompeurs dans l'URL
  const foundKeywords = SUSPICIOUS_URL_KEYWORDS.filter((kw) => hostname.includes(kw) || pathname.includes(kw));
  if (foundKeywords.length > 0 && !isLegitBrandDomain) {
    scorePenalty += 18;
    signals.push({
      id: 'deceptive_keywords',
      name: `Mots-clés trompeurs dans l’URL (${foundKeywords.slice(0, 3).join(', ')})`,
      severity: 'high',
      explanation: 'L’URL emploie des termes rassurants ("secure", "login", "verify", "compte") pour induire la victime en erreur et simuler un espace d’authentification.',
      recommendation: 'La présence du mot "secure" dans une adresse web ne signifie pas que le site est sécurisé.'
    });
    tableItems.push({ element: 'Mots-clés d’authentification', result: foundKeywords.slice(0, 2).join(', '), status: 'warning' });
  }

  // 8. Longueur d'URL disproportionnée
  if (cleanInput.length > 90) {
    scorePenalty += 14;
    signals.push({
      id: 'length_anomaly',
      name: 'URL excessivement longue',
      severity: 'low',
      explanation: 'L’URL dépasse 90 caractères avec de multiples paramètres de suivi souvent employés pour masquer la destination réelle dans les aperçus d’emails.',
      recommendation: 'Examinez la structure de base du domaine avant de poursuivre.'
    });
  }

  // 9. Présence de tirets multiples dans le nom de domaine
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 3) {
    scorePenalty += 18;
    signals.push({
      id: 'multiple_hyphens',
      name: 'Tirets multiples dans le nom de domaine',
      severity: 'medium',
      explanation: `Le nom de domaine contient ${hyphenCount} tirets, structure courante dans les domaines générés pour le phishing (ex: secure-account-update-fr.com).`,
      recommendation: 'Soyez vigilant face aux domaines composés de suites de mots reliés par des tirets.'
    });
  }

  let finalScore = Math.min(100, Math.max(0, scorePenalty));
  if (signals.length === 0 && isHttps && (isLegitBrandDomain || domainParts.length <= 3)) {
    finalScore = 8; // Score sain
  }

  const riskInfo = determineRiskLevel(finalScore);

  if (recommendations.length === 0) {
    recommendations.push('Ne téléchargez aucun fichier et ne fournissez aucun mot de passe sur cette page.');
    recommendations.push('En cas de redirection, vérifiez immédiatement l’adresse affichée dans la barre d’adresse de votre navigateur.');
  }

  const summary =
    finalScore >= 61
      ? `Cette URL présente de forts indices de malveillance (${signals.map((s) => s.name).slice(0, 2).join(', ')}). Ne naviguez pas sur ce lien.`
      : finalScore >= 35
      ? 'Cette URL présente des caractéristiques suspectes ou une configuration atypique. Procédez avec grande précaution.'
      : 'Cette URL ne présente aucun indicateur flagrant de malveillance selon nos filtres heuristiques habituels.';

  return {
    id: 'url-' + Date.now(),
    type: 'url',
    input: cleanInput,
    score: finalScore,
    riskLevel: riskInfo.level,
    riskLabel: riskInfo.label,
    summary,
    signals,
    table: tableItems,
    recommendations,
    timestamp: new Date().toISOString(),
    technicalDetails: {
      hasHttps: isHttps,
      isIpAddress: isIp,
      hasAtSymbol: cleanInput.includes('@'),
      excessiveLength: cleanInput.length > 90,
      typoSquattingBrand: brandImpersonated,
      analysisEngine: 'Phis Guard URL Inspector & Heuristic Engine'
    }
  };
}
