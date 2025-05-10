const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.DB_URL;
db.articles = require('../api/models/article.model');

module.exports = db;