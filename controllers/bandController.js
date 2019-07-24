const express = require("express")
const app = express()
const router = express.Router()
const Band = require('../models/bandDb')

// Index Route

router.get('/', (req, res)=>{
    console.log("Testing Route")
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





module.exports = router