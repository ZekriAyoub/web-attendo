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

3. **Configurer Supabase** :

Renommez le fichier .env.example en .env et remplacez les valeurs des constantes avec :

```bash
VITE_SUPABASE_URL=https://vaqmlxvbflgyhecshtbs.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcW1seHZiZmxneWhlY3NodGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDgxNTksImV4cCI6MjA1OTY4NDE1OX0.7vAyD9qZK4r56g5RzVHvtiQAWUWFIZxreTwxKarts3U
```

### Sécurité

Les valeurs présentes dans le fichier .env.example (notamment VITE_SUPABASE_URL et VITE_SUPABASE_KEY) sont fournies à titre démo et ne contiennent aucune donnée sensible.
La clé Supabase utilisée est de type anon publique, avec des règles de sécurité RLS activées sur toutes les tables.
Cela signifie que seules les actions autorisées explicitement sont possibles, même avec cette clé.


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
