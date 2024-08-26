# Frontend d'Enregistrement d'Entreprises

Frontend de l'application d'Enregistrement d'Entreprises, construit avec React et Vite.

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## Lancement rapide

1. Clonez le dépôt :
   ```
   git clone <url-du-repo-frontend>
   cd <nom-du-dossier-frontend>
   ```

2. Installez les dépendances :
   ```
   npm install
   # ou
   yarn install
   ```

3. Configurez l'URL de l'API :
   - Copiez `.env.example` en `.env`
   - Modifiez `VITE_API_URL` dans `.env` pour pointer vers votre backend

4. Démarrez l'application en mode développement :
   ```
   npm run dev
   # ou
   yarn dev
   ```

L'application sera accessible à `http://localhost:5173`.

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run preview` : Prévisualise la version de production en local

## Développement

- L'application utilise React Query pour la gestion des états et des requêtes API.
- Tailwind CSS est utilisé pour le styling.
- Vérifiez `src/components` pour les composants réutilisables.
- Les routes sont définies dans `src/App.tsx` ou un fichier de routage dédié.

## Remarques

- Assurez-vous que le backend est en cours d'exécution et accessible.
- Pour un déploiement en production, ajustez les variables d'environnement en conséquence.
