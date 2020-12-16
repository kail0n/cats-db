const express = require('express');
const router = express.Router();

const Cat = require('../models/cats')

// cats index route
router.get('/', async (req, res) => {
    try {
        const cats = await Cat.all
        res.json({cats})
    } catch(err) {
        res.status(500).json({err})
    }
})

// cats show route
router.get('/:id', async (req, res) => {
    try {
        const cat = await Cat.findById(parseInt(req.params.id))
        res.json(cat)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Create cat route
router.post('/', async (req, res) => {
    try {
        const cat = await Cat.create(req.body.name, req.body.age)
        res.json(cat)
    } catch(err) {
        res.status(404).json({err})
    }
})

// cats update route
router.patch('/:id', async (req, res) => {
    try {
        const cat = await Cat.findById(parseInt(req.params.id))
        const updatedCat = await cat.update(req.body.name, req.body.age)
        res.json({cat: updatedCat})
    } catch(err) {
        res.status(500).json({err})
    }
})

// delete cat route
router.delete('/:id', async (req, res) => {
    try {
        const cat = await Cat.findById(parseInt(req.params.id))
        await cat.destroy()
        res.status(204).json('Cat deleted')
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router;