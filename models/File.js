var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var fileSchema = new Schema({
     name: String,
     size: Number,
     date: String,
     file: String
    });
    
module.exports =  mongoose.model('File', fileSchema);