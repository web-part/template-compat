
const qr = require('qr-image');
const express = require('express');

let app = express();

app.get('/', (req, res) => {
    let image = qr.image('http://localhost:3000', {
        type: 'png',
    });

    image.pipe(res);
});