const http = require('http');
const bodyparser = require('body-parser')
// or use import http from 'http';


/* your app config here */
const express = require('express')
app = express()

app.use(bodyparser.urlencoded({extended: true}))

app.post('/request', (oreq, ores) => {
    const dado = oreq.body
    const options = {
    // host to forward to
    host: '10.0.1.8',
    // port to forward to
    port: 3001,
    // path to forward to
    path: '/atendimentos',
    // request method
    method: 'POST',
    // headers to send
    headers: oreq.headers,
  };

  const creq = http
    .request(options, pres => {
      // set encoding
      pres.setEncoding('utf8');

      // set http status code based on proxied response
      ores.writeHead(pres.statusCode);

      // wait for data
      pres.on('data', chunk => {
        ores.write(chunk);
      });

      pres.on('close', () => {
        // closed, let's end client request as well
        ores.end();
      });

      pres.on('end', () => {
        // finished, let's finish client request as well
        ores.end();
      });
    })
    .on('error', e => {
      // we got an error
      console.log(e.message);
      try {
        // attempt to set error message and http status
        ores.writeHead(500);
        ores.write(e.message);
      } catch (e) {
        // ignore
      }
      ores.end();
    });

  creq.end();
});

app.listen(3120, () => {
    console.log('startign in 3120')
})