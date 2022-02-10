const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
var mysql = require('mysql');
require('dotenv').config();
const webpush = require('web-push');
const nodemailer=require('nodemailer');
const path = require('path');

const schedule = require('node-schedule');



const publicVapidKey = 'BHhAMebCht6TAvEOoGU6oD9zd9ds8pCopmGXe7dHYyiRYXftJBET7EGLJiW-EgMX8FAvK6EUHu4II4i6vqNvI6A';
const privateVapidKey = 'RVNBXsuUj2BzEeC0gv07exljP58SH5_5Q4WaYnzNshM';

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  publicVapidKey,
  privateVapidKey
);



/*
var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");


 var firebaseConfig = {
    apiKey: "AIzaSyBgNuBH3dKrqpGemQ7DJSHjmzilrETYJuk",
    authDomain: "testing-d1e41.firebaseapp.com",
    projectId: "testing-d1e41",
    storageBucket: "testing-d1e41.appspot.com",
    messagingSenderId: "555228152363",
    appId: "1:555228152363:web:a6bfe11db4fd196007606e",
    measurementId: "G-QHRR5N88NB"
  };

  firebase.initializeApp(firebaseConfig);
*/
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');
var pool1      =    mysql.createPool({
  connectionLimit : 1000,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : "",
  database : process.env.DB_NAME,
  debug    :  false
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
      user: 'testsmtp.10001@gmail.com',
      pass: 'testsmtp@123'
  }
});


//adding
var bodyParser = require("body-parser");  

var login=require("./routes/routes")
const jwt = require('jsonwebtoken');
const upload=require("./images/uploadImages")

var multer  = require('multer');
const { PollyCustomizations } = require('aws-sdk/lib/services/polly');

var storage = multer.memoryStorage({
  
  destination: function(req, file, callback) {
      callback(null, './files/');

  }
});
var multipleUpload = multer({ storage: storage }).array('file');

//

const app = express();
const server = http.createServer(app);
const io = socketio(server, 
  {
    cors: {
      origin: '*',
    }
  });

app.use(cors());
app.use(router);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.bodyParser({limit: '50mb'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.static(path.join(__dirname, "client")))

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    var a = addUser({ id: socket.id, name, room });
    console.log("a", a);
    const { error, user } = a;

    if(error) return callback(error);

    socket.join(user.room);

    //socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    //socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if(user){
    io.to(user.room).emit('message', { user: user.name, text: message });
  

    pool1.getConnection(function(err,connection){
          if (err) {
            console.log(err);
            //connection.release();
            throw err;
          } 

          var users = {
          "sender": user.name,
          "message": message,
          "room": user.room

        }
        if((user.room !== undefined) || (user.room !== 'undefined')){
          connection.query('INSERT INTO chat_messages SET ?', users, function (error, results, fields) {
              console.log("msg saved");
          });
        }

    });
    console.log("message",user);
}
    


    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    console.log("removed user",user);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});




app.post('/subscribe', (req, res) => {
	const subscription = req.body.subscription;

  console.log('subscription',subscription);

  pool1.getConnection(function(err,connection){
          if (err) {
            console.log(err);
            //connection.release();
            throw err;
          } 

          var users = {
          "userId": req.body.userId,
          "subscription": JSON.stringify(subscription)

        }
          

          connection.query('select * from noti_subscription where userId = ?', req.body.userId, function (error, results, fields) {
                if(results.length > 0){

                  connection.query('update noti_subscription SET ? where userId = ?', [users, req.body.userId], function (error, results, fields) {
                        console.log("msg already saved");
                        connection.release();
                    });

                        
                }else{
                            connection.query('INSERT INTO noti_subscription SET ?', users, function (error, results, fields) {
                        console.log("msg saved");
                        connection.release();
                    });
                }

            });


          
        

    });


	res.status(201).json(subscription);

	
})


app.post('/pushNotification', (req, res) => {

      pool1.getConnection(function(err,connection){
          if (err) {
              console.log(err);
              //connection.release();
              throw err;
            } 
   
            connection.query('select * from noti_subscription where userId = ?', req.body.userId, function (error, results, fields) {
                console.log("msg get");

                const payload = JSON.stringify({title : 'Pushed Test', type:'PostmanTest', body:"This is a testing pushNotification from postman"});
                var subscriptionData = JSON.parse(results[0].subscription);
                webpush.sendNotification(subscriptionData, payload).catch(err => console.error(err));
                connection.release();  
            });
          

      });
  });


router.post('/upload',multipleUpload,upload.upload);
router.get('/', function(req, res) {
  //res.sendFile('client/index.html');
  res.sendFile(__dirname + '/client/index.html');

});





const job = schedule.scheduleJob('*/5 * * * *', function(){

pool1.getConnection(function(err,connection){
    if (err) {
         console.log(err);
              //connection.release();
         throw err;
     } 
  
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      connection.query('SELECT a.*, b.name, b.email FROM booking_property as a, users as b where a.toDate < ? and a.userId = b.id and a.isReviewEmailSent = 0', date, function (error, results, fields) {
     
            for(var i =0; i<results.length; i++){

            

            var msg = '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="x-apple-disable-message-reformatting"><title></title><link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet"><style>html,body{margin:0 auto !important;padding:0 !important;height:100% !important;width:100% !important;background:#f1f1f1}*{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}div[style*="margin: 16px 0"]{margin:0 !important}table,td{mso-table-lspace:0pt !important;mso-table-rspace:0pt !important}table{border-spacing:0 !important;border-collapse:collapse !important;table-layout:fixed !important;margin:0 auto !important}img{-ms-interpolation-mode:bicubic}a{text-decoration:none}*[x-apple-data-detectors], .unstyle-auto-detected-links *,.aBn{border-bottom:0 !important;cursor:default !important;color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important}.a6S{display:none !important;opacity:0.01 !important}.im{color:inherit !important}img.g-img+div{display:none !important}@media only screen and (min-device-width: 320px) and (max-device-width: 374px){u ~ div .email-container{min-width:320px !important}}@media only screen and (min-device-width: 375px) and (max-device-width: 413px){u ~ div .email-container{min-width:375px !important}}@media only screen and (min-device-width: 414px){u ~ div .email-container{min-width:414px !important}}</style><style>.primary{background:#17bebb}.bg_white{background:#fff}.bg_light{background:#f7fafa}.bg_black{background:#000}.bg_dark{background:rgba(0,0,0,.8)}.email-section{padding:2.5em}.btn{padding:10px 15px;display:inline-block}.btn.btn-primary{border-radius:5px;background:#17bebb;color:#fff}.btn.btn-white{border-radius:5px;background:#fff;color:#000}.btn.btn-white-outline{border-radius:5px;background:transparent;border:1px solid #fff;color:#fff}.btn.btn-black-outline{border-radius:0px;background:transparent;border:2px solid #000;color:#000;font-weight:700}.btn-custom{color:rgba(0,0,0,.3);text-decoration:underline}h1,h2,h3,h4,h5,h6{font-family:serif;color:#000;margin-top:0;font-weight:400}body{font-family:serif;font-weight:400;font-size:15px;line-height:1.8;color:rgba(0,0,0,.4)}a{color:#17bebb}table{}.logo h1{margin:0}.logo h1 a{color:#17bebb;font-size:24px;font-weight:700;font-family:serif}.hero{position:relative;z-index:0}.hero .text{color:rgba(0,0,0,.3)}.hero .text h2{color:#000;font-size:34px;margin-bottom:15px;font-weight:300;line-height:1.2}.hero .text h3{font-size:24px;font-weight:200}.hero .text h2 span{font-weight:600;color:#000}.product-entry{display:block;position:relative;float:left;padding-top:20px}.product-entry .text{width:calc(100% - 125px);padding-left:20px}.product-entry .text h3{margin-bottom:0;padding-bottom:0}.product-entry .text p{margin-top:0}.product-entry img, .product-entry .text{float:left}ul.social{padding:0}ul.social li{display:inline-block;margin-right:10px}.footer{border-top:1px solid rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.footer .heading{color:#000;font-size:20px}.footer ul{margin:0;padding:0}.footer ul li{list-style:none;margin-bottom:10px}.footer ul li a{color:rgba(0,0,0,1)}@media screen and (max-width: 500px){}</style></head><body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;"><center style="width: 100%; background-color: #f1f1f1;"><div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;"> &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div><div style="max-width: 600px; margin: 0 auto;" class="email-container"><table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;"><tr><td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td class="logo" style="text-align: left;"><h1><a href="#">Checkin</a></h1></td></tr></table></td></tr><tr><td valign="middle" class="hero bg_white" style="padding: 2em 0 2em 0;"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding: 0 2.5em; text-align: left;"><div class="text"><h2>Hello '+results[i].name+',</h2><h3>Please share your experience by filling reviews for your last visited place.</h3><h3>Please login to Checkin!</h3><h3><a href="http://13.233.154.141/reviews/'+results[i].userId+'/'+results[i].propertyId+'">Click here!</a></h3></div></td></tr></table></td></tr></table><table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;"><tr><td valign="middle" class="bg_light footer email-section"><table><tr><td valign="top" width="33.333%" style="padding-top: 20px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="text-align: left; padding-right: 10px;"><h3 class="heading">About</h3><p>Lorem ipsum Lorem ipsum.</p></td></tr></table></td><td valign="top" width="33.333%" style="padding-top: 20px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="text-align: left; padding-left: 5px; padding-right: 5px;"><h3 class="heading">Contact Info</h3><ul><li><span class="text">Lorem ipsum, USA</span></li><li><span class="text">+* *** *** ****</span></a></li></ul></td></tr></table></td><td valign="top" width="33.333%" style="padding-top: 20px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="text-align: left; padding-left: 10px;"><h3 class="heading">Useful Links</h3><ul><li><a href="#">Lorem1</a></li><li><a href="#">Lorem2</a></li><li><a href="#">Lorem3</a></li><li><a href="#">Lorem4</a></li></ul></td></tr></table></td></tr></table></td></tr></table></div></center></body></html>';
              //var msg = "<p>Testing Schedular</p>";  
                  var iid = results[i].id;
                              transporter.sendMail({
                                from:"testsmtp.10001@gmail.com",
                                to:results[i].email,
                                subject:"Checkin : Reviews and Feedback",
                                text:"scheduler",
                                html:msg
                              },(err,info)=>{
                                if(err){
                                  console.log(err)
                                }else{
                                  console.log(info);

                                  connection.query('update booking_property SET isReviewEmailSent = ? where id = ?', [1, iid], function (error, results, fields) {
                                      console.log("status updated");
                                      connection.release();



                                  });


                                  
                                }
                              });

             }                 


      });
          

  });


  
});





router.get('/host',login.getHost);


router.post('/host',login.host);

router.post('/editListing',login.editListing);
router.post('/deleteListing',login.deleteListing);

router.post('/register',login.register);
router.post('/socialAuth',login.socialAuth);
router.post('/login',login.login);

app.use(cors());

app.use('/api', router);

router.get("/test",(req,res)=>{
  res.send({
    "Sucess":"Sucess"
  })
})

router.get('/user',login.user);
app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})



router.post('/forgot',login.sendMail);
router.post('/verifyOtp',login.verifyOtp);
router.post('/resetPassword',login.resetPassword);

router.post('/updatePassword',login.forgotPassword);

router.post('/changePassword',login.changePassword);

router.post('/updateProfile',login.updateProfile);

router.post('/updateProfilePic',login.updateProfilePic);

router.post('/updateGovtId',login.updateGovtId);

router.get('/host/:id',login.hostId);


router.get('/carHost',login.getAllCarHost);

router.post('/carHost',login.carHost);

router.get('/carHost/:id',login.carHostId);

router.get('/getCarListingByUserId/:id',login.getCarListingByUserId);

router.post('/editCarHostListing',login.editCarHostListing);

router.post('/deleteCarHostListing',login.deleteCarHostListing);


//property booking apis

router.post('/bookProperty',login.bookProperty);

router.post('/getListofBookings',login.getListofBookings);

router.post('/bookingHistory',login.bookingHistory);

router.post('/getListofBookingsByHost',login.getListofBookingsByHost);

router.post('/bookingHistoryByHost',login.bookingHistoryByHost);


//car booking apis

router.post('/bookCar',login.bookCar);

router.post('/getListofBookingsCars',login.getListofBookingsCars);

router.post('/bookingHistoryCars',login.bookingHistoryCars);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  console.log(token);

  if(token===process.env.ACCESS_TOKEN_SECRET){
    next();
  }else{
    
    res.send({
      "code":500,
      "message":"Unauthorized"
    })
  }



}
router.get("/search/:city",login.searchByAdress);

router.get("/host/userId/:id",login.userHost);
router.get('/saved',login.saved);
router.get("/dislike",login.dislike);
router.post('/like',login.like);
router.post('/review',login.review);

router.post('/reviewsByHostingId',login.reviewsByHostingId);

router.get("/isDocVerified/:id",login.isDocVerified);

router.get("/listConnections/:id",login.listConnections);

router.post("/addConnection",login.addConnection);

router.post("/getRoomMessages",login.getRoomMessages);

router.post('/updateDocs',login.updateDocs);


router.post('/sendVerificationCode',login.sendVerificationCode);
router.post('/verifyCode',login.verifyCode);


//Admin api

router.post('/changeHostDocStatus',login.changeHostDocStatus);
router.get('/getAllUsers',login.getAllUsers);




server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));