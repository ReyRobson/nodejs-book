const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
let n = 3

function choose(n){
    if(n == undefined){
        return 'nao é numero'
    }else{
        verify(n)
    }
}

async function verify(){
    let a = await random(1,5)
    if(a == n){
        return "congrats"
    }else{
        return "try again"
    }
}

choose()

module.exports = choose