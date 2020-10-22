/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 16ACC3B7651A95D8D23349E2F61512CF
*
* source file: htdocs/views/login/Login/Main/DownLoad.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Login/Main/Download', function (require, module, panel) {
    var KISP = require('KISP');

    var list = [{
        name: 'Windows',
        url: 'http://downloads.cmcloud.cn/kis/kiscloud/stable/KISCloudClient.exe',
        title: '点击下载插件',
        icon: 'windows'
    }, {
        name: 'Mac',
        url: 'http://downloads.cmcloud.cn/kis/kiscloud/stable/KisyunClient.mac.dmg',
        title: '点击下载插件',
        icon: 'mac'
    }, {
        name: 'iPhone',
        url: '#',
        icon: 'iphone'
    }, {
        name: 'iPad',
        url: '#',
        icon: 'ipad'
    }, {
        name: 'Android',
        url: '#',
        icon: 'android'
    }];

    panel.on('init', function () {
        panel.template(function (item, index) {

            return {
                'name': item.name,
                'url': item.url,
                'title': item.title || '',
                'icon': item.icon,

                'show': item.url == '#' ? 'show' : ''
            };
        });
    });

    panel.on('render', function () {
        panel.fill(list);
    });

    return {};
});