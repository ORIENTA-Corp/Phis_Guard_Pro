import { CyberAdvice } from '../types';

export const CYBER_ADVICE_LIST: CyberAdvice[] = [
  {
    id: 'reconnaissance-email-phishing',
    title: 'Comment reconnaître un email de phishing ?',
    tag: 'Emails & Messages',
    summary: 'Identifiez les leviers psychologiques et les anomalies techniques les plus répandues dans les courriels frauduleux.',
    goldenRule: 'Ne vous fiez jamais au seul nom affiché : inspectez toujours l’adresse email complète de l’expéditeur.',
    iconName: 'Mail',
    detailedPoints: [
      'Examinez l’adresse d’expédition après le symbole @ (ex: support@service-client-paypal.xyz au lieu de @paypal.com).',
      'Méfiez-vous du ton alarmiste créant un sentiment d’urgence artificielle (« dernier délai », « compte restreint »).',
      'Recherchez les fautes de syntaxe, l’absence de personnalisation (« Cher client ») et les incohérences de logo.',
      'Survolez les liens avec la souris sans cliquer pour révéler l’URL de destination réelle.',
      'Ne téléchargez jamais de pièces jointes inattendues avec extensions .zip, .exe, .html ou .iso.'
    ]
  },
  {
    id: 'verifier-une-url',
    title: 'Comment vérifier une URL ?',
    tag: 'Navigation Web',
    summary: 'Apprenez à décortiquer la structure anatomique d’un lien avant de le visiter ou d’y entrer des identifiants.',
    goldenRule: 'La présence du cadenas HTTPS prouve que la connexion est chiffrée, mais ne garantit PAS que le site est honnête.',
    iconName: 'Globe',
    detailedPoints: [
      'Isolez le domaine racine : lisez l’adresse de droite à gauche à partir du premier slash (« / »).',
      'Détectez le typosquatting : remplacement d’un « l » par un « 1 », ou « m » par « rn » (ex: arnazon.com).',
      'Méfiez-vous des sous-domaines trompeurs (ex: paypal.com.connexion-client.net appartient en réalité à connexion-client.net).',
      'Évitez de cliquer sur les liens raccourcis (bit.ly, t.co) sans utiliser un dé-raccourcisseur ou notre scanner Phis Guard.',
      'Faites attention aux extensions inhabituelles (.top, .xyz, .buzz, .club) pour des services bancaires ou administratifs.'
    ]
  },
  {
    id: 'partager-code-otp',
    title: 'Pourquoi ne jamais partager son code OTP ?',
    tag: 'Authentification',
    summary: 'Le code à usage unique (SMS ou application d’authentification) est le verrou ultime de vos comptes.',
    goldenRule: 'Aucun conseiller bancaire, technicien ou agent de support légitime ne vous demandera votre code OTP.',
    iconName: 'ShieldAlert',
    detailedPoints: [
      'Un code OTP (One-Time Password) est le second facteur d’authentification qui valide une transaction ou une connexion.',
      'Si un escroc vous appelle en se faisant passer pour votre banquier, c’est qu’il possède déjà votre mot de passe et a besoin de l’OTP pour vider votre compte.',
      'Lisez attentivement le texte du SMS : il indique souvent « pour valider un paiement de X € » ou « pour connecter un nouvel appareil ».',
      'Si quelqu’un vous réclame ce code sous un prétexte d’annulation de fraude, raccrochez immédiatement : c’est une manipulation d’ingénierie sociale.'
    ]
  },
  {
    id: 'creer-mot-de-passe-securise',
    title: 'Comment créer un mot de passe sécurisé ?',
    tag: 'Hygiène Numérique',
    summary: 'Protégez vos accès grâce aux méthodes modernes recommandées par les agences nationales de cybersécurité (ANSSI / NIST).',
    goldenRule: 'La longueur bat la complexité : privilégiez une phrase de passe mémorisable d’au moins 14 caractères.',
    iconName: 'KeyRound',
    detailedPoints: [
      'Adoptez la méthode des phrases de passe (passphrase) : combinez 4 mots sans lien évident (ex: Tulipe-Clavier-Espace-Danse42!).',
      'Ne réutilisez JAMAIS le même mot de passe sur deux services distincts (si un site fuite, vos autres comptes restent protégés).',
      'Utilisez un gestionnaire de mots de passe réputé (Bitwarden, 1Password, KeePass) pour stocker des chaînes uniques et complexes.',
      'Activez impérativement la double authentification (2FA) sur tous vos comptes critiques (email, banque, réseaux sociaux).'
    ]
  },
  {
    id: 'reconnaitre-fausse-page-connexion',
    title: 'Comment reconnaître une fausse page de connexion ?',
    tag: 'Contrefaçon Visuelle',
    summary: 'Les kits de phishing imitent à la perfection les pages de Microsoft 365, Google, Netflix ou des banques.',
    goldenRule: 'Ne saisissez jamais votre mot de passe si le gestionnaire de mots de passe de votre navigateur ne le remplit pas automatiquement.',
    iconName: 'LayoutGrid',
    detailedPoints: [
      'Un gestionnaire de mots de passe ne se trompe jamais : s’il ne propose pas vos identifiants, c’est que le domaine n’est pas le bon.',
      'Testez les liens secondaires du pied de page (Mentions légales, Contact, Aide) : sur une fausse page, ils sont souvent inactifs ou renvoient vers « # ».',
      'Regardez la barre d’adresse de votre navigateur : est-ce exactement le domaine attendu ?',
      'Vérifiez la présence d’artefacts visuels : polices floues, logos tronqués ou formulaire demandant anormalement le code PIN de carte bancaire.'
    ]
  },
  {
    id: 'apres-clic-lien-suspect',
    title: 'Que faire après avoir cliqué sur un lien suspect ?',
    tag: 'Réaction d’Urgence',
    summary: 'Guide d’intervention rapide étape par étape si vous avez interagi avec un message frauduleux.',
    goldenRule: 'Réagissez calmement mais sans délai : chaque minute compte pour sécuriser vos accès.',
    iconName: 'AlertTriangle',
    detailedPoints: [
      '1. Fermez immédiatement l’onglet et déconnectez l’appareil du réseau (Wi-Fi / câble) si un téléchargement a été initié.',
      '2. Si vous avez saisi un mot de passe : connectez-vous immédiatement depuis un autre appareil propre pour le changer et révoquer toutes les sessions actives.',
      '3. Si vous avez communiqué des informations de carte bancaire : contactez immédiatement votre banque pour faire opposition.',
      '4. Lancez une analyse complète avec votre antivirus à jour sur l’appareil concerné.',
      '5. Signalez le message frauduleux aux plateformes de signalement officielles (Phishing Initiative, Signal Spam, Pharos).'
    ]
  },
  {
    id: 'proteger-compte-whatsapp',
    title: 'Comment protéger son compte WhatsApp ?',
    tag: 'Messageries',
    summary: 'Les arnaques par détournement de compte WhatsApp (« Salut maman, j’ai changé de numéro ») explosent.',
    goldenRule: 'Activez le code PIN de vérification en deux étapes dans les paramètres de votre compte WhatsApp.',
    iconName: 'MessageSquare',
    detailedPoints: [
      'Allez dans Paramètres > Compte > Vérification en deux étapes et définissez un code à 6 chiffres confidentiel.',
      'Méfiez-vous des messages reçus de proches demandant de l’argent d’urgence sous prétexte de téléphone cassé : appelez-les de vive voix pour vérifier.',
      'Ne transmettez jamais le code de vérification SMS de WhatsApp reçu sur votre mobile, même si un ami vous le demande en ligne.',
      'Consultez régulièrement la liste des « Appareils connectés » pour vérifier qu’aucun navigateur pirate n’est synchronisé avec votre WhatsApp Web.'
    ]
  },
  {
    id: 'securiser-compte-email',
    title: 'Comment sécuriser son compte email ?',
    tag: 'Compte Principal',
    summary: 'Votre boîte email est le centre névralgique de votre identité numérique : sa compromission ouvre l’accès à tous vos comptes.',
    goldenRule: 'Votre adresse email est le réceptacle de réinitialisation de tous vos services : protégez-la avec la plus haute exigence.',
    iconName: 'Lock',
    detailedPoints: [
      'Utilisez un mot de passe totalement exclusif et jamais partagé avec un autre site pour votre messagerie.',
      'Activez la double authentification par application (Google Authenticator, Microsoft Authenticator) ou clé physique (YubiKey).',
      'Vérifiez les « règles de transfert » dans les paramètres de votre boîte : les pirates créent souvent une règle silencieuse transférant tous vos emails à leur adresse.',
      'Consultez l’historique des connexions récentes pour repérer des accès suspects depuis des pays inhabituels.'
    ]
  }
];

export const PRESET_ANALYSES = [
  {
    label: 'Notification bancaire frauduleuse',
    type: 'text' as const,
    description: 'Faux message d’alerte de sécurité exigeant confirmation immédiate des identifiants.',
    content: `URGENT - SERVICE SÉCURITÉ BANCAIRE
Cher client,
Une tentative de connexion inhabituelle a été bloquée sur votre espace bancaire le 19/09/2026.
Pour des raisons de sécurité, votre compte sera suspendu sous 24h si vous ne confirmez pas vos identifiants.

Veuillez vous connecter immédiatement sur le portail de vérification :
http://connexion-securisee-banque-update.xyz/login?ref=8921

Munissez-vous de votre mot de passe et de votre code secret afin de réactiver vos accès.
Sans action de votre part, vos cartes de paiement seront définitivement désactivées.`
  },
  {
    label: 'Faux avis de livraison de colis (SMS)',
    type: 'text' as const,
    description: 'SMS de phishing classique réclamant des frais de douane pour débloquer un colis.',
    content: `Info LaPoste : Votre colis n°FR-849204 ne peut pas être livré en raison d'un affranchissement insuffisant (frais de douane de 2,45€ impayés).
Veuillez régulariser votre situation avant ce soir 23h59 pour éviter le renvoi à l'expéditeur :
http://suivi-colis-relais-laposte.cfd/affranchir

Demande de paiement par carte bancaire obligatoire.`
  },
  {
    label: 'Arnaque WhatsApp & code OTP',
    type: 'text' as const,
    description: 'Tentative d’usurpation de compte avec demande du code à 6 chiffres reçu par SMS.',
    content: `Coucou ! J'ai un gros problème avec mon WhatsApp, je viens de t'envoyer mon code de vérification à 6 chiffres par erreur sur ton numéro.
Tu peux me renvoyer le code OTP que tu viens de recevoir par SMS tout de suite stp ? C'est super urgent pour mon travail merci !!`
  },
  {
    label: 'Faux remboursement impôts (DGFIP)',
    type: 'text' as const,
    description: 'Promesse d’un remboursement fiscal pour collecter les coordonnées bancaires.',
    content: `Direction Générale des Finances Publiques
Objet : Notification de remboursement d'impôt d'un montant de 482,50 €

Après calculs des droits fiscaux pour l'exercice en cours, vous êtes bénéficiaire d'un remboursement exceptionnel.
Pour recevoir votre virement sous 48h, veuillez renseigner votre relevé d'identité bancaire (IBAN) et le cryptogramme de votre carte sur notre portail sécurisé :
https://remboursement-dgfip-impots-gouv.top/espace-particulier/virement`
  },
  {
    label: 'URL Typosquattée PayPal',
    type: 'url' as const,
    description: 'Faux domaine imitant PayPal avec mots-clés trompeurs et extension atypique.',
    content: 'http://paypal-verification-account-security.xyz/signin/auth'
  },
  {
    label: 'URL Fausse page Netflix',
    type: 'url' as const,
    description: 'URL trompeuse signalant un abonnement suspendu avec multiples sous-domaines.',
    content: 'https://netflix.com.reactivation-paiement-espace.club/account/update'
  },
  {
    label: 'URL Légitime (Exemple sain)',
    type: 'url' as const,
    description: 'Domaine officiel avec protocole HTTPS sécurisé et structure vérifiée.',
    content: 'https://www.service-public.fr/particuliers/vosdroits/N20314'
  }
];
