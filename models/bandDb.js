const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoURI = 'mongodb://localhost:27017/' + 'qhtn';
const db = mongoose.connection;


const bandSchema = new Schema({
    bandName: String,
    genre: String,
    description: String,
    priceRange: Number,
    image: String,
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Band = mongoose.model('bands', bandSchema);

module.exports = Band;

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));