const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const bandSchema = new Schema({
    bandName: String,
    genre: String,
    description: String,
    priceRange: String,
    image: String,
    song: String,
    video: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
      }
}, {timestamps: true});

    



const Band = mongoose.model('bands', bandSchema);

module.exports = Band;

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));