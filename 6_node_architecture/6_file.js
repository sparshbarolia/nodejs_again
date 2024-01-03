const fs = require('fs');
const os = require('os');

console.log("Hi I am 1");

// //              BLOCKING OPERATION(sync)
// const result = fs.readFileSync('./content.txt','utf-8');
// console.log(result)

//              NON-BLOCKING OPERATION(async)
fs.readFile('./content.txt','utf-8',(err,result) => {
    if(err){
        console.log(err);
    }
    else{ 
        console.log(result);
    }
});

console.log("Hi I am 2");
console.log("Hi I am 3");

//Default thread pool size = 4
//max can be = number of cores/CPU in system
console.log("Number of core/CPU in my system are",os.cpus().length);