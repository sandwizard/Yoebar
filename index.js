const express = require('express');
const compression = require('compression');
var fs = require('fs');

const http = require('http');
const https = require('https');
const multer= require('multer');
const host = 'localhost';
const uuid = require('uuid').v4;
const nodemailer = require("nodemailer");
const route = express.Router();
const port = process.env.PORT||3000;
const Sport = process.env.PORT||443;
const bodyparser = require('body-parser');
const ssl = __dirname + "/ssl"
var options = {
    key: fs.readFileSync(ssl +"/server.key"),
    cert: fs.readFileSync(ssl +"/server.crt"),
  };

const storage  = multer.diskStorage({
    destination:(req,file,cb)=>{
        // modyfy cb to mail order
        cb(null,'supplyOrders')
    },
    filename:(req,file,cb) =>{
        const {originalname} = file;
        cb(null,`${req.body.sender}-${uuid()}-${originalname}`);
    }
});


const app = express();
app.use(express.static(__dirname+'/public'));
const upload = multer({storage:storage});
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
app.use(express.json());
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'sandwizardyoebar@gmail.com',
        pass: 'ibyioovmdpogafxf'
    }
    });
// upload and senddmail
app.post('/supplyOrder',upload.array('supplyOrder'),(req,res)=>{ 
    
   
    var mailOptions = {
        from: req.body.email,
        to: 'thindorji@gmail.com',
        subject: 'Supply-Order',
        text: `sender:-${req.body.sender}\nEmail: ${req.body.email}`,
        attachments: req.files
        };  
            
    console.log(mailOptions);
    transporter.sendMail(mailOptions,(err,info)=>{ 
        console.log('sending mail');
        if (err) {
            console.log('here');
            res.send(err);
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success');                  
        }                      
    });    
    // console.log(req);   
   
});

app.post('/contact',(req,res)=>{ 
    console.log(req.body);  
    var mailOptions = {
        from: req.body.email,
        to: 'thindorji@gmail.com',
        subject: req.body.subject,
        text: `name:-${req.body.name}\nEmail: ${req.body.email}\n\n${req.body.message}`,
        };              
    console.log(mailOptions);
    transporter.sendMail(mailOptions,(err,info)=>{ 
        console.log('sending mail');
        if (err) {
            console.log('here');
            res.send(err);
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success');                  
        }                      
    });    
    // console.log(req);     
});


const server = http.createServer(app);
server.listen(port,()=>{
    console.log(`listening on port${port}`);
});
const httpsServer = https.createServer(options,app);
httpsServer.listen(Sport,()=>{

     console.log(`listening on port${Sport}`);
});
