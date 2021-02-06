const winston = require('winston');
const mongoose = require("mongoose");

module.exports = function() {
  mongoose
  .connect(
    "mongodb://localhost/moviezone",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => winston.info("Connected with MovieZone DataBase"))

// mongoose.connect(config.get('db'), {useNewUrlParser: true}, { useUnifiedTopology: true })
//   .then(() => console.log('Connected with MovieZone DataBase'))
//   .catch(err => console.error('Could not connect with mongoDB'));
}