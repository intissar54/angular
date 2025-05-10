const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const db = require('./database/db.config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à MongoDB
db.mongoose.connect(db.url)
  .then(() => {
    console.log('Connecté à MongoDB avec succès!');
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB', err);
    process.exit();
  });

// Route simple
app.get('/', (req, res) => {
  res.json({ message: "Bienvenue dans l'application d'accessoires." });
});

// Routes des articles
const articleRoutes = require('./api/routes/article.routes');
app.use('/api/articles', articleRoutes);

// Démarrer le serveur
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}.`);
});

module.exports = app;