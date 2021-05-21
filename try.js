const express = require ('express')
const app = express()
const port = 4030
const { initialize } = require('unleash-client');
const unleash = initialize({
  url: 'http://10.0.1.8:4242/api/',
  appName: 'openornot',
  instanceId: '1'
});

let estaAtivo = new Promise((estaT, estaF) => {
        if (unleash.isEnabled) {
            console.log('ativo')
            estaT(true)
        } else {
            console.log('desativado')
            estaF(false)
        }
})

estaAtivo.then(
    function(arroz) {}
)

app.listen(port, () => {
    console.log('running in 4030')
})
