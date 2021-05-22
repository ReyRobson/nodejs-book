const express = require('express')
const app = express()

app.get('/api/Holly', (req,res) => {
    res.status(200).send('Holly molly')
})

module.exports = app