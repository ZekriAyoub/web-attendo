# Attendo – Gestion des présences aux épreuves scolaires

Attendo est une application web développée en Vue.js pour faciliter la **gestion des épreuves**, des **locaux** et la **prise de présence des étudiants** dans un cadre universitaire.

--- 

## Fonctionnalités principales

- Authentification avec Google
- Gestion des sessions d’examen
- Gestion des unités d’enseignement (UE)
- Création et gestion des épreuves
- Attribution de locaux pour chaque épreuve
- Affectation d’un surveillant par local
- Prise de présence des étudiants dans chaque salle
- Vérifications automatiques :
  - Un étudiant ne peut pas être dans deux locaux pour une même épreuve
  - Un surveillant ne peut surveiller deux salles pour la même épreuve
  - La capacité d’un local ne peut être dépassée
- Compteur d’étudiants présents / capacité dans chaque salle
- Possibilité de marquer une épreuve comme **terminée**
- Filtres dynamiques sur les tableaux

---

## Technologies utilisées

- **Vue.js 3** (API Options)
- **Pinia** pour la gestion d’état
- **Vue Router** pour la navigation
- **Supabase** comme backend (base de données + auth)
- **Tailwind CSS** pour le style
- **Vue Toastification** pour les notifications

---
## Démo

[Essayez l'application ici](https://web-attendo.vercel.app)

---

## Installation

1. **Cloner le projet** :

```bash
git clone https://github.com/ZekriAyoub/web-attendo.git
```

2. **Installer les dépendances** :
```bash
npm install
```
 
3.  **Configurer les variables d'environnement** :
Créez un fichier `.env` à la racine du projet, puis renseignez les valeurs :

```bash
VITE_SUPABASE_URL=XXX
VITE_SUPABASE_KEY=XXX
```

Lancez le projet :

```bash
npm run dev
```

## Structure du dossier src

```text
├──src/
    ├── assets/             # Fichiers CSS
    ├── components/         # Composants UI réutilisables
    ├── lib/                # Supabase client et autres utilitaires globaux
    ├── router/             # Configuration du routeur (routes protégées)
    ├── services/           # Couche d'accès aux données (requêtes Supabase)
    ├── stores/             # Authentification et store global (Pinia)
    ├── views/              # Vues principales/pages
    ├── App.vue             # Entrée principale de l'application
    └──  main.js            # Point d'entrée principal de l'application.
```
