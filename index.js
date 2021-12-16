const express = require('express');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const http = require('http');
const multer= require('multer');
const host = 'localhost';
const uuid = require('uuid').v4;
const nodemailer = require("nodemailer");
const route = express.Router();
const port = process.env.PORT||3000;
const bodyparser = require('body-parser');


const storage  = multer.diskStorage({
    destination:(req,file,cb)=>{
        // modyfy cb to mail order
        cb(null,'public/supplyOrders')
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
        to: '10zinjts@gmail.com',
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






const server = http.createServer(app);
server.listen(port,host,()=>{
    console.log(`server running at http://${host}:${port}`);
});