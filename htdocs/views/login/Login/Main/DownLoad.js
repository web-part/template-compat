

KISP.panel('/Login/Main/Download', function (require, module, panel) {
    var KISP = require('KISP');

    var list = [
        {
            name: 'Windows',
            url: 'http://downloads.cmcloud.cn/kis/kiscloud/stable/KISCloudClient.exe',
            title: '点击下载插件',
            icon: 'windows',
        },
        {
            name: 'Mac',
            url: 'http://downloads.cmcloud.cn/kis/kiscloud/stable/KisyunClient.mac.dmg',
            title: '点击下载插件',
            icon: 'mac'
        },
        {
            name: 'iPhone',
            url: '#',
            icon: 'iphone',
        },
        {
            name: 'iPad',
            url: '#',
            icon: 'ipad'
        },
        {
            name: 'Android',
            url: '#',
            icon: 'android'
        },
    ];


    panel.on('init', function () {
        panel.template(function (item, index) {

            return {
                'name': item.name,
                'url': item.url,
                'title': item.title || '',
                'icon': item.icon,

                'show': item.url == '#' ? 'show' : '',
            };
        });
    });





    panel.on('render', function () {
        panel.fill(list);

    });




    return {

    };




});