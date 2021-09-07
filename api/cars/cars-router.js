const express = require('express')

const Cars = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} =require('./cars-middleware')

const router = express.Router()

router.get('/', async (req, res, next)=> {
    try{
        const cars = await Cars.getAll()
        res.json(cars)
        }catch(err){
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next)=> {
    try{
        const car = await Cars.getById(req.params.id)
        if (!car){
          next({status: 404, message: 'not found'})
        }else{
          res.json(car)
        }
      }catch(err){
        next(err)
      }
})

router.post('/', 
 checkCarPayload,
 checkVinNumberValid,
 checkVinNumberUnique, 
 async (req, res, next)=> {
    try{
        const car = await Cars.create(req.body)
        res.json(car)
    }catch(err){
        next(err)
    }
})



module.exports = router