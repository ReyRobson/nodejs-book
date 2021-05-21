const fs = require('fs')
var diretorio = '/Users/reinaldo.filho/Desktop/node-book/foox.txt'
var asd

function voltaValor(){
    return new Promise ( resolve => {
fs.readdir(diretorio, (err, items) => {
    if (err){
        resolve (err)
    }else{
        fs.readFile("foox.txt", "utf-8", function(error, data) {
            resolve (data)
        })
    }
})
})
}

async function retorno(){
    let a = await voltaValor()
    return a
}

retorno().then(x => {asd = x ; console.log(asd)})