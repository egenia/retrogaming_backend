var mongoose = require('mongoose');

/**
 * User 정보를 담기 위한 Mongo DB model
 * @name noteModel
 */
var noteModel = function () {

  var noteSchema = mongoose.Schema({
    feed_id: String,
    type: String,
    texte: String,
    date: { type: Date, default: Date.now }
  });
 

  return mongoose.model('Note', noteSchema);
};

module.exports = new noteModel();