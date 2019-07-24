const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoURI = 'mongodb://localhost:27017/' + 'qhtn';
const db = mongoose.connection;

mongoose.connect(mongoURI, { useNewUrlParser: true}, () =>{
    console.log("The connection works!!!")
});

const venueSchema = new Schema ({
    venueName : {
        type : String,
        required : true},
    address : String,
    phoneNum : String,
    capacity : Number,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
}, {timestamps: true});

const Venue = mongoose.model('venues', venueSchema);

module.exports = Venue;

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));