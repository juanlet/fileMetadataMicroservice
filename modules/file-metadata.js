var mongoose = require('mongoose');
var assert = require('assert');
var util = require('util');
var File=require('./../models/File.js');
const Promise = require("bluebird");

module.exports={
    
  getFileMetadata:function(db,file,next){
  
  //build the file metadata object
  
       var fileDetails = {
        name: file.originalname,
        size: file.size,
        date: new Date().toLocaleString(),
        file: file.filename
        };
     
     var fileObject=new File(fileDetails);
     
  //save metadata to db
     fileObject.save(function(err,doc) {
         if(err){
         throw new Error('Object could not be saved');
         }
         console.log("File saved to mongo DB: "+doc.name);
      });
  
  
  //return json 
   return fileDetails; 
    
 }
    
    
};