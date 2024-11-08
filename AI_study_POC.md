# AI study Proof Of Concept

## Request

Recommande-moi des réalisateur de films dont le travail est similaire à celui de Cristopher Nolan

## Answer

Voici quelques réalisateurs dont le style et les thèmes abordés peuvent rappeler ceux de Christopher Nolan :

1. David Fincher : Connu pour ses thrillers psychologiques complexes tels que "Fight Club", "Gone Girl" et "Seven".

2. Darren Aronofsky : Ses films comme "Requiem for a Dream", "Black Swan" et "The Fountain" explorent des thèmes profonds et des structures narratives non linéaires.

3. Denis Villeneuve : Réalisateur de "Arrival", "Blade Runner 2049" et "Prisoners", il crée des films visuellement époustouflants avec des intrigues complexes.

4. Quentin Tarantino : Bien que son style soit différent de celui de Nolan, Tarantino est reconnu pour ses scénarios non linéaires et ses dialogues percutants dans des films comme "Pulp Fiction" et "Inglourious Basterds".

5. Wes Anderson : Ses films, dont "The Grand Budapest Hotel" et "Moonrise Kingdom", présentent une esthétique unique et des personnages excentriques, rappelant l'attention de Nolan aux détails visuels.

6. The Wachowskis : Le duo derrière la trilogie "Matrix" crée des films de science-fiction visuellement innovants qui explorent des concepts philosophiques profonds.

7. Guillermo del Toro : Réalisateur de "Pan's Labyrinth" et "The Shape of Water", del Toro mélange habilement réalité et fantaisie, créant des mondes visuellement époustouflants.

Bien que chacun de ces réalisateurs ait son propre style distinctif, ils partagent avec Nolan une approche créative de la narration, une attention aux détails visuels et une volonté d'explorer des thèmes complexes.

## Request

Renvoie-moi la réponse que tu m'as donné sous format JSON

## Answer

{
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
}

## Request

Crée une API REST en node.js avec le JSON que tu vient de me donner en respectant les conditions suivantes : 
- Toutes les routes doivent êtres protégées par un basic auth
- Ton rendu doit comporter au moins :

- une route GET qui renvoie un objet correspondant aux paramètres passés dans la query
-  une route POST qui renvoie un objet correspondant à ce qui a été passé dans le body de la requête
Ajoute un fichier .http pour tester les routes et s'assurer que l’on obtient une erreur 401 lorsque l’authentification n’est pas bonne

## Answer

### API REST

```js
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

```

### HTTP FILE

```http
GET http://localhost:3000/realisateurs?nom=David%20Fincher
Authorization: Basic admin password

###

GET http://localhost:3000/realisateurs?nom=David%20Fincher
Authorization: Basic wrong password

###

POST http://localhost:3000/realisateurs
Content-Type: application/json
Authorization: Basic admin
```

## Request

Refactorise les requêtes du fichier .http pour utiliser une variable pour l’hôte des requêtes

## Answer

```http
@baseUrl = http://localhost:3000

GET {{baseUrl}}/realisateurs?nom=David%20Fincher
Authorization: Basic admin password

###

GET {{baseUrl}}/realisateurs?nom=David%20Fincher
Authorization: Basic wrong password

###

POST {{baseUrl}}/realisateurs
Content-Type: application/json
Authorization: Basic admin password

{
  "nom": "Christopher Nolan",
  "description": "Réalisateur britannique connu pour ses films à grand spectacle et ses scénarios complexes, comme \"Inception\", \"Interstellar\" et la trilogie \"The Dark Knight\"."
}
```
