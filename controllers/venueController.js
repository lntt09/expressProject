const express = require('express');
const router = express.Router();
const Venue = require('../models/venues');
const loginRequired = require('../middleware/loginRequired');


//Index Route
router.get('/', (req, res)=>{
    console.log("Testing Route")
    Venue.find({}, (err, venues)=>{
        res.render('venues/index.ejs', {
            venuesOnPage : venues
        })
    })
})

//New Route
router.get('/new', loginRequired, (req, res)=>{
    res.render('venues/new.ejs')
})

//Create Route
router.post('/', (req, res) => {
    if(!req.session.userID){
      res.redirect("/users/login");
    }
    else{
      try{
        req.body.creator = req.session.userID;
        Venue.create(req.body,(err,createVenue)=>{
          if(err){
            console.log(err);
            res.send(err);
          }
          else{
            console.log(createVenue);
            res.redirect('/venues');
          }
        })
      }
      catch(err){
        console.log(err)
        res.send(err)
      }
    }
  });

//Show Route
router.get('/:id', async(req,res)=>{
    try{
        const foundVenue = await Venue.findById(req.params.id).populate('creator')
        res.render('venues/show.ejs',{
            oneVenue : foundVenue
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//Delete Route
router.delete('/:id', (req,res)=>{
    Venue.findOneAndDelete({_id:req.params.id},(err, deletedVenue)=>{
        res.redirect('/venues');
    })
})

//Edit Route
router.get('/:id/edit', (req,res)=>{
    Venue.findById(req.params.id, (err, foundVenue)=>{
        res.render('venues/edit.ejs',{
            oneVenue : foundVenue
        })
    })
})

//Put Route
router.put('/:id', async (req,res)=>{
  const venue = await Venue.findById(req.params.id);
  if(venue.creator.toString() !== req.session.userID){
    req.session.message = "Priviledge to edit is invalid";
    res.redirect(`/venues/${req.params.id}`)
  }
  else{
    Venue.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,foundVenue)=>{
        res.redirect('/venues') 
    })
  }  
})

module.exports = router;