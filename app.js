const express = require('express');
const morgan= require('morgan');
const methodOverride=require('method-override')
const mongoose = require('mongoose')
const eventRoutes=require('./routes/eventRoutes')
const mainRoutes=require('./routes/mainRoutes')

const app=express();
let url = 'mongodb://127.0.0.1:27017/NBAD'
let port=3000;
let host="localhost"

mongoose.connect(url)
.then(()=>{
    app.listen(port,host,()=>{
        console.log("Server is running at 3000");
    })
})
.catch(err => next(err))

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use('/events',eventRoutes)
 app.use('/',mainRoutes)

app.use((req,res,next)=>{
    let err = new Error("The Server cannot locate "+req.url )
    err.status = 404
    next(err)
})

app.use((err,req,res,next)=>{
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error")
    }

    res.status(err.status);
    res.render('error',{error:err});
});
