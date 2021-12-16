const express = require('express');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const http = require('http');
const multer= require('multer');
const host = 'localhost';
const uuid = require('uuid').v4;
const nodemailer = require("nodemailer");
const route = express.Router();
const port = 3000;
const bodyparser = require('body-parser');


const storage  = multer.diskStorage({
    destination:(req,file,cb)=>{
        // modyfy cb to mail order
        cb(null,'public/supplyOrders')
    },
    filename:(req,file,cb) =>{
        const { originalname} = file;
        cb(null,`${req.body.sender}-${uuid()}-${originalname}`);
    }
});

const app = express();
app.use(express.static(__dirname+'/public'));
const upload = multer({storage:storage}).array('supplyOrder');
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

// upload and senddmail
app.post('/supplyOrder',(req,res)=>{ 
    upload(req,res,(err)=>{
        if(err){
            return res.json(err);
        }
        else{
            var mailOptions = {
                from: '10zinjts@gmail.com',
                to: '10zinjts@gmail.com',
                subject: 'Supply-Order',
                text: `sender:-${req.body.sender}\nEmail: ${req.body.email}}`
                };  
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, 
                auth: {
                    user: 'sandwizardyoebar@gmail.com',
                    pass: 'ibyioovmdpogafxf'
                }
                });
            console.log(mailOptions);
            transporter.sendMail(mailOptions,(err,info)=>{ 
                console.log('sending mail');
                if (err) {
                    console.log('here');
                    res.send(err);
                }else{
                    console.log('Email sent: ' + info.response);
                    return res.redirect('/index.html')                    
                }                      
            });
        }
        

    })
    
    // console.log(req);
   
   
});






const server = http.createServer(app);
server.listen(port,host,()=>{
    console.log(`server running at http://${host}:${port}`);
});