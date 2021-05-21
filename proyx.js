const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express')
const app = express()

const HOST = "localhost"
const API_SERVICE_URL = "http://10.0.1.8:3001"
const API_SERVICE_URL2 = "http://10.0.1.8:3002"

app.get('/', (req,res) => {
    res.send('ola')
})

app.use('/atendimentos', createProxyMiddleware({
    target: API_SERVICE_URL
}))

app.use('/mostrar', createProxyMiddleware({
    target: API_SERVICE_URL2
}))

app.listen(3012, () =>{
    console.log('running in 3012')
})