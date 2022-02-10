var multer  = require('multer');
var uuid = require('uuid-random');


require('dotenv').config();
var AWS = require('aws-sdk');



// var upload = multer({ storage: storage }).single('file');
const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
exports.upload = async function (req, res) {

     console.log(req);
  
  var file = req.files;
  
 
let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
s3bucket.createBucket(async function () {
      let Bucket_Path = BUCKET_NAME;
      //Where you want to store your file
      var ResponseData = [];
  

file.map((item) => {
    console.log("itemppp",item);
      var params = {
        Bucket: Bucket_Path,
        Key: `${uuid()}${item.originalname}`,
        Body: item.buffer,
        ContentType:item.mimetype,
        ACL: 'public-read'
  };
   s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log(err); 
         res.json({ "error": true, "Message": err});
        }else{
            ResponseData.push(data);
            if(ResponseData.length == file.length){
              res.json({ "error": false, "Message": "File Uploaded SuceesFully", Data: ResponseData});
            }
          }
       });
     });
   });
};
