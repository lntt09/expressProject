require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.static("public"));

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

const venueController = require('./controllers/venueController');
const userController = require('./controllers/userController');
const bandController = require('./controllers/bandController');

const PORT = process.env.port || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'qhtn';


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }))
  
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next)=>{
  res.locals.currentUser = req.session.userID
  if(req.session.message){
    res.locals.message = req.session.message
    req.session.message = null;
  }
  next();
})

app.get('/', (req,res)=>{
  res.render('index.ejs');
})

app.use('/venues', venueController);
app.use('/users', userController);
app.use('/band', bandController);



// app.listen(3000,()=>{
//     console.log("This Application is Running");
//   })

  app.listen(PORT, () => {
    console.log('listening on port 3000');
  })


const mongoURI = process.env.MONGODB_URI;
const db = mongoose.connection;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.once("open", () => {
 console.log("connected to mongoose");
});