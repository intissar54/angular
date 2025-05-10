const db = require('../../database/db.config');
const Article = db.articles;

// Créer et sauvegarder un nouvel article
exports.create = async (req, res) => {
    try {
        if (!req.body.nomArt || !req.body.description) {
            return res.status(400).send({
                message: "Les champs nomArt et description sont obligatoires!"
            });
        }

        const article = new Article({
            nomArt: req.body.nomArt,
            description: req.body.description
        });

        const data = await article.save();
        res.status(201).send({
            message: "Article créé avec succès!",
            data: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Erreur lors de la création de l'article."
        });
    }
};

// Récupérer tous les articles
exports.findAll = async (req, res) => {
    try {
        const data = await Article.find().select('-createdAt -__v'); // Exclure createdAt et __v
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Erreur lors de la récupération des articles."
        });
    }
};

// Récupérer un article spécifique par son ID
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Article.findById(id).select('-createdAt -__v'); // Exclure createdAt et __v
        
        if (!data) {
            return res.status(404).send({
                message: `Article non trouvé avec l'id=${id}`
            });
        }
        
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: `Erreur lors de la récupération de l'article avec l'id=${req.params.id}`
        });
    }
};

// Mettre à jour un article par son ID
exports.update = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "Les données à mettre à jour ne peuvent pas être vides!"
            });
        }

        const id = req.params.id;
        const data = await Article.findByIdAndUpdate(id, req.body, {
            new: true
        });

        if (!data) {
            return res.status(404).send({
                message: `Impossible de mettre à jour l'article avec l'id=${id}. Article non trouvé!`
            });
        }
        

        res.status(200).send({
            message: "Article mis à jour avec succès.",
            data: data
        });
    } catch (err) {
        res.status(500).send({
            message: `Erreur lors de la mise à jour de l'article avec l'id=${req.params.id}`
        });
    }
};

// Supprimer un article par son ID
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Article.findByIdAndDelete(id);
        
        if (!data) {
            return res.status(404).send({
                message: `Impossible de supprimer l'article avec l'id=${id}. Article non trouvé!`
            });
        }
        
        res.status(200).send({
            message: "Article supprimé avec succès!"
        });
    } catch (err) {
        res.status(500).send({
            message: `Impossible de supprimer l'article avec l'id=${req.params.id}`
        });
    }
};
