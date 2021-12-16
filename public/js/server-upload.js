// const express = require('express');
// const multer = require('multer');
// const uuid = require('uuid').v4;

// const app = express();
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/supplyOrders')
//     },
//     filename:(req,file,cb)=>{
//         const { originalname } = file;
//         cb(null,originalname);

//     }

// });
// const upload = multer({storage});
// const port = 3000
// app.use(express.static('../'))
// app.post('/upload',upload.single('supplyOrder'),(req,res)=>{
//     return res.json({
//         status:'ok'
//     });

// });
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const rect = require('./rectangle.js');

let solverect = function(x,y){
    rect(x,y,(rectangle)=>{
        console.log(rectangle.area());
    })
}
solverect(4,8);