const fs = require('fs');

//                              WRITING IN FILE

//Syncronous function
//to create file of name test.txt
//with content as Ram Ram bhai sareya ne
// fs.writeFileSync("./test.txt","Ram Ram bhai sareya ne");

//Asyncronous function
// fs.writeFile("./test.txt","Ram Ram bhai sareya ne 2",(err) => {});



//                              READING FROM FILE

//Syncronous function
// const result = fs.readFileSync('./song.txt','utf-8');
// console.log(result);

//Asyncronous function
//asyncronous kucjj return ni krta
//syncronous krta h isliye uski value store krke print krdi
// fs.readFile('./song.txt','utf-8', (err,result) => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// });

//                              APPENDING IN FILE

//Syncronous function
fs.appendFileSync("./test.txt","Jai Shree Ram\n");

