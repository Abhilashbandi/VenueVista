const express=require('express')
const controller=require('../controller/eventController')
const router=express.Router();

//get /events
router.get('/',controller.index)

//get /events/bookahall
router.get('/bookahall',controller.new)

//post /events/create
router.post('/',controller.create)

//get /events/:id
router.get('/:id',controller.show)

//get /events/:id/edit
router.get('/:id/edit',controller.edit)

//put /events/:id
router.put('/:id',controller.update)

//delete /events/:id
router.delete('/:id',controller.delete);



module.exports = router;