const express = require('express');
const router = express.Router();

const Owner = require('../models/owner')

// owners show route
router.get('/:id', async (req, res) => {
    try {
        const owner = await Owner.findById(parseInt(req.params.id))
        res.json(owner)
    } catch (err) {
        res.status(400).send({err})
    }
})

// owners dogs route
router.get('/:id/cats', async (req, res) => {
    try {
        const owner = await Owner.findById(parseInt(req.params.id))
        console.log(owner)
        const dogs = await owner.cats
        console.log(cats)
        res.json(cats)
    } catch(err) {
        res.status(404).send({err}) 
    }
})

module.exports = router;