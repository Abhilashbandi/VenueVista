const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title : {type:String, required:[true,'title is required']},
    name : {type:String,required:[true,'name is required']},
    date : {type:String,required:[true,'date is reuired']},
    starttime : {type:String,required:[true,'starttime is required']},
    endtime : {type:String,required:[true,'endtime is required']},
    details : {type:String,required:[true,'details is required'],
               minLength: [10,'details should have atleast 10 characters']},
    halltype : {type:String,required:[true,'halltype is required']},
    location : {type:String,required:[true,'location is required']},
    imageURL : {type:String,required:[true,'imageURL is required']}

});


module.exports = mongoose.model('event',eventSchema);