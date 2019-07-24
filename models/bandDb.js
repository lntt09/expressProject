const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoURI = 'mongodb://localhost:27017/' + 'qhtn';
const db = mongoose.connection;

mongoose.connect(mongoURI, { useNewUrlParser: true}, () =>{
    console.log("The connection works!!!")
});

const bandSchema = new Schema({
    bandName: String,
    genre: String,
    description: String,
    priceRange: String,

})

const Band = mongoose.model('bands', bandSchema);

module.exports = Band;

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));