const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');

router.post('/', articleController.create);
router.get('/', articleController.findAll);
router.get('/:id', articleController.findOne);
router.put('/:id', articleController.update);
router.delete('/:id', articleController.delete);

module.exports = router;