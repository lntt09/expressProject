const express = require("express")
const app = express()
const router = express.Router()
const Band = require('../models/bandDb')
const loginRequired = require('../middleware/loginRequired');

// Index Route

router.get('/', (req, res)=>{
    Band.find({}, (err, bands)=>{
        res.render('bands/index.ejs', {
            bandsOnPage : bands
        })
    })
})

//New Route
router.get('/new', loginRequired, (req, res)=>{
    res.render('bands/new.ejs')
})

//Create Route
router.post('/', (req, res)=>{
    if(!req.session.userID){
        res.redirect("/users/login");
    }
    else{
        try{
            req.body.creator = req.session.userID;
            Band.create(req.body, (err, createBand)=>{
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    console.log(createBand);
                    res.redirect('/band');
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
        const seeBand = await Band.findById(req.params.id).populate('creator')
        res.render('bands/show.ejs',{
            oneBand : seeBand
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//Delete Route
router.delete('/:id', (req,res)=>{
    Band.findOneAndDelete({_id:req.params.id},(err, deletedBand)=>{
        res.redirect('/band');
    })
})

//Edit Route
router.get('/:id/edit', (req, res)=>{
    Band.findById(req.params.id,(err, foundBand)=>{
        res.render('bands/edit.ejs',{
            oneBand : foundBand
        })
    })
})

//Put Route
router.put('/:id', async (req,res)=>{
    const bands = await Band.findById(req.params.id);
    if(bands.creator.toString() !== req.session.userID){
      req.session.message = "Priviledge to edit is invalid";
      res.redirect(`/band/${req.params.id}`)
    }
    else{
      Band.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,foundBand)=>{
          res.redirect('/band') 
      })
    }  
  })

module.exports = router;