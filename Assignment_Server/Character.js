const mongoose = require('mongoose');
const db = 'mongodb://junming:abc123@ds141043.mlab.com:41043/movie';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  my_id: { type: Number }, //make change
  name: { type: String },
  gender: { type: String },
  culture: { type: String },
  born: { type: String },

  aliases: { type: String },
  father: { type: String },
  mother: { type: String },
  spouse: { type: String },
  character_image: { type: String }
});

const Character = mongoose.model('Character', schema, 'character_collection');

module.exports = Character;
