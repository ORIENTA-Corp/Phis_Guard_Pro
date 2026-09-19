import React from 'react';
import { ShieldAlert, Lock, Trash2, EyeOff, Clock, Server, CheckCircle2, AlertOctagon } from 'lucide-react';

interface PrivacySectionProps {
  onClearLocalHistory: () => void;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({ onClearLocalHistory }) => {
  return (
    <section id="confidentialite-section" className="py-16 lg:py-24 border-t border-blue-950/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/50 text-cyan-300 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROTECTION DES DONNÉES PERSONNELLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sécurité & Confidentialité
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Notre engagement inaltérable envers la vie privée de nos utilisateurs et le traitement éthique des données inspectées.
          </p>
        </div>

        {/* Vital Rule Callout */}
        <div className="p-6 rounded-2xl bg-red-950/40 border-2 border-red-500/50 shadow-2xl flex items-start gap-4">
          <div className="p-2 rounded-xl bg-red-900/60 text-red-400 shrink-0 mt-1">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-red-300 uppercase tracking-wide font-mono">
              RÈGLE FONDAMENTALE DE SÉCURITÉ
            </h3>
            <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
              « Phis Guard ne doit jamais demander à l’utilisateur de saisir son mot de passe ou son code OTP pour analyser un contenu. »
            </p>
            <p className="text-xs text-red-200/80 leading-relaxed">
              Si un service prétendant être Phis Guard vous demande vos mots de passe réels, vos identifiants bancaires ou un code d’authentification reçu par SMS, interrompez immédiatement : il s’agit d’une usurpation.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Privacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Quelles données sont analysées ? */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-950 text-cyan-400 border border-blue-800/40">
                <EyeOff className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Quelles données sont analysées ?</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Seul le fragment de texte ou le lien hypertexte que vous collez volontairement dans le formulaire fait l’objet de l’inspection. Aucune donnée de votre carnet d’adresses, historique de navigation global ou métadonnées de votre appareil n’est aspirée.
            </p>
          </div>

          {/* 2. Combien de temps sont-elles conservées ? */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-950 text-cyan-400 border border-blue-800/40">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Combien de temps sont-elles conservées ?</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Les calculs sont exécutés en mémoire vive (in-memory) de manière éphémère. Dès que le score de risque est calculé et renvoyé à votre écran, le message est purgé de la mémoire active du serveur.
            </p>
          </div>

          {/* 3. Les contenus sont-ils enregistrés ? */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-950 text-cyan-400 border border-blue-800/40">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Les contenus sont-ils enregistrés ?</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Non. Nous évitons délibérément tout archivage centralisé d’emails ou de liens personnels sur nos serveurs afin d’éliminer tout risque de fuite de données. L’historique que vous voyez est stocké exclusivement dans le stockage local de votre propre navigateur.
            </p>
          </div>

          {/* 4. Comment supprimer votre historique ? */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-950 text-red-400 border border-red-800/40">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Comment supprimer votre historique ?</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vous gardez le contrôle souverain : un simple clic sur le bouton « Supprimer l’historique » depuis le Tableau de bord ou ci-dessous efface instantanément et définitivement l’intégralité des enregistrements locaux.
            </p>
            <button
              onClick={onClearLocalHistory}
              className="inline-flex items-center gap-1.5 text-xs text-red-300 hover:text-red-200 font-semibold cursor-pointer underline pt-1"
            >
              <span>Vider mon historique local maintenant</span>
            </button>
          </div>
        </div>

        {/* Security Seals */}
        <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>CHIFFREMENT EN TRANSIT (TLS 1.3)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>AUCUN COOKIE PUBLICITAIRE TIERS</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>CONFORMITÉ RGPD / PRIVACY-BY-DESIGN</span>
          </div>
        </div>

      </div>
    </section>
  );
};
