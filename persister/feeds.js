var mongoose = require('mongoose');

/**
 * Projets Mongo DB model
 * @name projetModel
 */
var feedModel = function () {

  var feedSchema = mongoose.Schema({
    identifiant: String,
    version: String,
    auteur: String,
    type: String,
    projet_id: String,
    category: String,
    description: String,
    like_desc: String,
    type_deux: String,
    like_status: String,
    archive: { type: Boolean, default: false},
    date: { type: Date, default: Date.now }
  });
 

  return mongoose.model('Feed', feedSchema);
};

module.exports = new feedModel();