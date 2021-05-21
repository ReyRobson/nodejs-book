var fs = require('fs')

fs.readFile('foox.txt', 'utf-8', function(error, data) {
   if (error)
        throw error
    console.log(data)
})
console.log("lendo o arquivo...")