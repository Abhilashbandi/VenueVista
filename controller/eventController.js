const model = require('../model/event')

exports.index=(req,res,next)=>{
    model.find()
    .then((events)=>{
        res.render('./events/index',{events})
    })
    .catch(err=>next(err))
}

exports.new=(req,res,next)=>{
    res.render('./events/bookahall')
}

exports.create = (req,res,next)=>{
    let event = new model(req.body);
    event.save()
    .then(()=>{
        res.redirect('./events');
    })
    .catch(err => {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err)
    });
    
}

exports.show=(req,res,next)=>{
    let id=req.params.id

    if(!id.match(/^[0-9a-zA-Z]{24}$/)){
        let err = new Error('Invalid Story id');
        err.status = 400;
        next(err)

    }
    model.findById(id)
    .then((event)=>{
        if(event){
            res.render('./events/show',{event})
           }
           else{
            let err = new Error("Cannot find event with id:"+ id)
            err.status = 404
            console.log(err)
            next(err)
           }
    })
    .catch(err=>next(err))
    

}

exports.edit=(req,res,next)=>{
    let id=req.params.id

    if(!id.match(/^[0-9a-zA-Z]{24}$/)){
        let err = new Error('Invalid Story id');
        err.status = 400;
        next(err)

    }
    model.findById(id)
    .then((event)=>{
        if(event){
            res.render('./events/edit',{event})
           }
           else{
            let err = new Error("Cannot find event with id:"+ id)
            err.status = 404
            next(err)
           }
    })
    .catch(err => {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err)
    });
}

exports.update=(req,res,next)=>{
    let id=req.params.id
    let info=req.body

    if(!id.match(/^[0-9a-zA-Z]{24}$/)){
        let err = new Error('Invalid Story id');
        err.status = 400;
        next(err)

    }
    model.findByIdAndUpdate(id,info,{runValidators:true})
    .then((details)=>{
        if(details){
            res.redirect('/events/'+id)
        }
        else{
            let err = new Error("Cannot find event with id:"+ id)
        err.status = 404
        next(err)
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err)
    });
  
}

exports.delete=(req,res,next)=>{
    let id=req.params.id
    if(!id.match(/^[0-9a-zA-Z]{24}$/)){
        let err = new Error('Invalid Story id');
        err.status = 400;
        next(err)

    }
    model.findByIdAndDelete(id)
    .then((details)=>{
        if(details){
            res.redirect('/events')
        }
        else{
        let err = new Error("Cannot find event with id:"+ id)
        err.status = 404
        next(err)
        }
    })
    .catch(err=>next(err))
}