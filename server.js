
const path = require('path');
const express = require('express');
const app = express();
const { port, dir, } = require('./config').server;

function getHost() {
    var os = require('os');
    var name$list = os.networkInterfaces();
    var all = [];

    for (var name in name$list) {
        var list = name$list[name];
        all = all.concat(list);
    }

    var item = all.find(function (item, index) {
        return !item.internal &&
            item.family == 'IPv4' &&
            item.address !== '127.0.0.1'
    });

    return item ? item.address : '';

}


let host = getHost();

let msg = `
webpart dev-server is running at 
    local: http://localhost:${port}/
    network: http://${host}:${port}/
`;

let dirs = Array.isArray(dir) ? dir : [dir];

dirs.forEach((dir) => {

    let sdir = path.join(__dirname, `./${dir}`);
    console.log(dir, sdir)

    app.use(`/${dir}/`, express.static(sdir));
});

app.use(express.static('./'));


app.get('/', (req, res) => {
    res.send(msg);
});

app.listen(port, () => {
    console.log(msg);
});



app.get('/qr', (req, res) => {
    const qr = require('qr-image');
    let query = req.query;
    let size = Number(query.size); 

    let image = qr.image(`http://${host}:${port}/htdocs/index.html`, {
        type: 'png',
        size: size || 10,   //默认是 5。
    });


    res.setHeader('Content-type', 'image/png');

    image.pipe(res);
});