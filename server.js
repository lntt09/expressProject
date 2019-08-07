const express = require('express');
const app = express();

app.use(express.static("public"));

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

const venueController = require('./controllers/venueController');
const userController = require('./controllers/userController');
const bandController = require('./controllers/bandController');

app.use(session({
    secret: "KeepItSecret",
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



app.listen(3000,()=>{
    console.log("This Application is Running");
  })