const express = require("express")
const app = express()
const router = express.Router()
const Band = require('../models/bandDb')
const test = require('../public/js/app-q')
console.log("TIME FOR IT TIME TIME ")
// const link = bar();
// Index Route

router.get('/', (req, res)=>{
    console.log("Testing Route")
    console.log(test)
    Band.find({}, (err, bands)=>{
        res.render('bands/index.ejs', {
            bandsOnPage : bands
            
        })
    })
})

//New Route
router.get('/new', (req, res)=>{
    res.render('bands/new.ejs')
})

//Create Route
router.post('/', (req, res)=>{
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
})

//Show Route
router.get('/:id', async(req,res)=>{
    try{

        
        const seeBand = await Band.findById(req.params.id)
        const video = await seeBand.video
        const vid = test(video)
        res.render('bands/show.ejs',{
            oneBand : seeBand,
            myVid : vid
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
    try{
        Band.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,foundBand)=>{
            res.redirect('/band') 
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }

  })




module.exports = router