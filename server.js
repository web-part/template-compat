
const express = require('express');
const app = express();
const port = 8000;

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

let msg = `webpart dev-server is running at 
    local: http://localhost:${port}/ 
    network: http://${host}:${port}/ 
`;


app.use(express.static('./'));


app.get('/', (req, res) => {
    res.send(msg);
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


app.listen(port, () => {
    console.log(msg);
});
