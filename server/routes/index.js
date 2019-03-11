const router = require('express').Router()
const { Place, Restaurant, Hotel, Activity } = require('../models')
router.get('/', async (req, res, next) => {
    const allAttractions = {}
    try {
        allAttractions.hotels = await Hotel.findAll({ include: [{ all: true }] })
        allAttractions.restaurants = await Restaurant.findAll({ include: [{ all: true }] })
        allAttractions.activities = await Activity.findAll({ include: [{ all: true }] })
    } catch (e) {
        next(e)
    }
    res.json(allAttractions)
})



module.exports = router