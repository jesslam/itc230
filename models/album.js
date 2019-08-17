const mongoose = require("mongoose");
const credentials = require("../lib/credentials");
const library = require("../models/album.js")

mongoose.connect(credentials.connectionString, { dbName: 'ITC230', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define album model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
    artist: { type: String, required: true },
    song: String,
    album: { type: String, required: true },
   }, 
  {collection: 'Albums'}); 

   //insert new records

module.exports = mongoose.model('album', mySchema);