var mongoose = require('mongoose');

/**
 * Projets Mongo DB model
 * @name projetModel
 */
var projetModel = function () {

  var projetSchema = mongoose.Schema({
    identifiant: String,
    libelle: String,
    description: String,
    date: { type: Date, default: Date.now }
  });
 

  return mongoose.model('Projet', projetSchema);
};

module.exports = new projetModel();