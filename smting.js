diretorio = '/Users/reinaldo.filho/Desktop/node-book/foox.txt'

const fs = require('fs')
function voltaValor(){
    return new Promise(resolve => {
    fs.readFile(diretorio, "utf-8", function (error, data) {
        if (error){
            throw error
        }
        resolve (data)
    })
})
}

async function retorno(){
    let a = await voltaValor()
    return a
}

retorno().then(x => {console.log(x)})