const winston = require('winston');
const mongoose = require("mongoose");
const config = require('config');

module.exports = function() {
  const db = config.get('db');
  mongoose
  .connect(
    db,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => winston.info(`Connected with ${db}`))

// mongoose.connect(config.get('db'), {useNewUrlParser: true}, { useUnifiedTopology: true })
//   .then(() => console.log('Connected with MovieZone DataBase'))
//   .catch(err => console.error('Could not connect with mongoDB'));
}