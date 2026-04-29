# 🖤 Parfumerie de la Zac — Chatbot IA

Chatbot IA luxe pour la Parfumerie de la Zac, propulsé par Claude.

## Structure des fichiers

```
parfumerie-zac/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx        ← Chatbot principal
│   └── index.js       ← Point d'entrée
├── .env.example       ← Modèle pour les variables
├── .gitignore
├── package.json
└── README.md
```

## Déploiement sur Vercel

1. Pushez ce projet sur GitHub
2. Connectez Vercel à GitHub
3. Ajoutez la variable d'environnement :
   - Nom : `REACT_APP_ANTHROPIC_API_KEY`
   - Valeur : votre clé API Anthropic
4. Déployez !

## Personnalisation

- Modifiez le catalogue dans `src/App.jsx` (variable `CATALOGUE`)
- Remplacez le numéro WhatsApp dans `SYSTEM_PROMPT`
- Ajoutez votre logo en remplaçant l'emoji 🖤 par une balise `<img>`
