const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const listeSchema = new Schema({
  tache: { type: String, required: true },
  date_fin: { type: Date, require: true},
  etat: { type: String, enum: ['à faire', 'complétée'], default: 'à faire' }
})

const MyList = mongoose.model('MyList',listeSchema);

module.exports = MyList;