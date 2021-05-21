var fs = require ('fs')
    fs.readFile("foox.txt", "utf-8", function (error, data) {
        if (error){
            throw error
        }
        console.log(data)
    })
/*process.on('uncaughtException', function(error) {
    console.log("the exception was caught")
})*/
