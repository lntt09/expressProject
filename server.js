const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
// const mongoURI = 'mongodb://localhost:27017/' + 'qhtn';
// const db = mongoose.connection
const bandController = require('./controllers/bandController')
app.use(bodyParser.urlencoded({extended: true}))


// ----------------------------------------------------------------------------------

// mongoose.connect(mongoURI, {useNewUrlParser: true}, () => {
//     db.on ('connected', ()=> {
//         console.log('the mongo connection is established')
//     })
    
// })
// db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', mongoURI));
// db.on('disconnected', () => console.log('mongo disconnected'));

// db.on( 'open' , ()=>{
//   console.log('Connection made!');
// });

// ----------------------------------------------------------------------------------

app.use(methodOverride('_method'))
app.use("/band", bandController)
// ----------------------------------------------------------------------------------

// app.get("/", async (req, res)=>{
//     const band = await Band.find()
//     res.render("homePage.ejs", {
//         band: band
//     })
// })


app.listen(3000, () => {
    console.log("Working and ready to role through the server stuff")
})
