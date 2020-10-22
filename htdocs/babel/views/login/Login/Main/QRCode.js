/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 3FB464FDC57E6F0D743B4B3673A8D7C5
*
* source file: htdocs/views/login/Login/Main/QRCode.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 二维码。
*/
KISP.panel('/Login/Main/QRCode', function (require, module, panel) {
    var KISP = require('KISP');
    var $String = KISP.require('String');
    var Query = KISP.require('Query');
    var Url = KISP.require('Url');

    var url = 'https://www.yunzhijia.com/opencloud/openthird/qrconnet?appid=10666&redirect_uri=xxxxxx&state=xxxxxxx';
    var dest = Url.root() + 'index.html';

    panel.on('init', function () {});

    panel.on('render', function (data) {
        //把用户角色放在 state 里。
        //扫码成功后，会自动跳回来，并且原样带回 state 参数在 url 中。
        //从而可以解析出扫码之前选中的用户角色。
        var random = $String.random();
        var role = data.role.value;
        var state = role + '-' + random;

        var src = Query.add(url, {
            'appid': 10666,
            'redirect_uri': dest,
            'state': state
        });

        panel.$.find('iframe').attr('src', src);
    });
});