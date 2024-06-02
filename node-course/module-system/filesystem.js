const fs = require('fs')

console.log(fs.readdir('./', function(err, file){
    if(err) console.log('Error', err)
    else console.log(file);
}));