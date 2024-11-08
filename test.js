const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const app = express();
app.use(bodyParser.json());

// Données JSON
const data = {
  "realisateurs": [
    {
      "nom": "David Fincher",
      "description": "Connu pour ses thrillers psychologiques complexes tels que \"Fight Club\", \"Gone Girl\" et \"Seven\"."
    },
    {
      "nom": "Darren Aronofsky",
      "description": "Ses films comme \"Requiem for a Dream\", \"Black Swan\" et \"The Fountain\" explorent des thèmes profonds et des structures narratives non linéaires."
    },
    {
      "nom": "Denis Villeneuve",
      "description": "Réalisateur de \"Arrival\", \"Blade Runner 2049\" et \"Prisoners\", il crée des films visuellement époustouflants avec des intrigues complexes."
    },
    {
      "nom": "Quentin Tarantino",
      "description": "Bien que son style soit différent de celui de Nolan, Tarantino est reconnu pour ses scénarios non linéaires et ses dialogues percutants dans des films comme \"Pulp Fiction\" et \"Inglourious Basterds\"."
    },
    {
      "nom": "Wes Anderson",
      "description": "Ses films, dont \"The Grand Budapest Hotel\" et \"Moonrise Kingdom\", présentent une esthétique unique et des personnages excentriques, rappelant l'attention de Nolan aux détails visuels."
    },
    {
      "nom": "The Wachowskis",
      "description": "Le duo derrière la trilogie \"Matrix\" crée des films de science-fiction visuellement innovants qui explorent des concepts philosophiques profonds."
    },
    {
      "nom": "Guillermo del Toro",
      "description": "Réalisateur de \"Pan's Labyrinth\" et \"The Shape of Water\", del Toro mélange habilement réalité et fantaisie, créant des mondes visuellement époustouflants."
    }
  ],
  "conclusion": "Bien que chacun de ces réalisateurs ait son propre style distinctif, ils partagent avec Nolan une approche créative de la narration, une attention aux détails visuels et une volonté d'explorer des thèmes complexes."
};

// Middleware d'authentification basic auth
app.use(basicAuth({
  users: { 'admin': 'password' },
  challenge: true
}));

// Route GET protégée
app.get('/api/realisateurs', (req, res) => {
  const { nom } = req.query;
  if (nom) {
    const realisateur = data.realisateurs.find(r => r.nom === nom);
    if (realisateur) {
      res.json(realisateur);
    } else {
      res.status(404).json({ message: 'Réalisateur non trouvé' });
    }
  } else {
    res.json(data.realisateurs);
  }
});

// Route POST protégée
app.post('/api/realisateurs', (req, res) => {
  const realisateur = req.body;
  data.realisateurs.push(realisateur);
  res.status(201).json(realisateur);
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
