module.exports = (x,y,callback)=>{
    execallbck(x,y,callback);

}

execallbck = function(x,y,callback){
    callback({
        area:()=>(x*y)
    });

}