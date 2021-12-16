const express = require('express');
const res = require('express/lib/response');
const http = require('http');

const host = 'localhost';

const port = 3000;

const app = express();

app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    res.sendStatus=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>load valid page</h1></body></html>');
});
app.post('/supplyOrder,')
const server = http.createServer(app);

server.listen(port,host,()=>{
    console.log(`server running at http://${host}:${port}`);
});