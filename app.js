var express=require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fileMetadataProvider=require('./modules/file-metadata');
var mongoose=require('mongoose');
process.on('uncaughtException', console.error);
require('dotenv').config({
  silent: true
});;


var app = express();

// Path to our public directory

var pub = __dirname;
app.use(express.static(pub));

var mongouri = process.env.MONGOLAB_URI || "mongodb://" + process.env.IP + ":27017/img-sal";
    
mongoose.connect(mongouri)    
    .then(()=>console.log("connected"));


// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({ extended: true }))

/* GET home page. */
app.get('/',function(req,res,next){

    res.render('index', { title: 'Express' });

});


app.post('/upload', upload.single('file'),function(req, res, next) {

     var file=req.file;
     var fileData=fileMetadataProvider.getFileMetadata(mongoose,file,next);
     res.json(fileData);
});


app.listen(process.env.PORT || 5000);