// function add(a,b){
//     return a+b;
// }

// const sub = (a,b) => {
//     return a-b;
// }

// //way to export multiple functions
// module.exports = {
//     addFn : add,
//     subFn : sub
// };

                                        //OR

exports.addFn = (a, b) => a + b;

exports.subFn = (a, b) => a - b;