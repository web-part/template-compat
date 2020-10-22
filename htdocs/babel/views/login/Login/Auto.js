/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 39ED8BDB4DB9CDC8E421E32AD8DE229D
*
* source file: htdocs/views/login/Login/Auto.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 通过云之家扫码跳进来后的自动登录。
* 即检测 url 中是否带了 appid、ticket、expiretime 和 state 参数。 
* 如： http://localhost/Web/kis-cloud/htdocs/index.html?appid=10666&ticket=APPURLWITHTICKET1e5120405334ea6a935d75f17d8838d3&expiretime=3597&state=0C866A1E5BF9
*/
KISP.panel('/Login/Auto', function (require, module, panel) {
    var KISP = require('KISP');
    var Query = KISP.require('Query');
    var API = module.require('API');

    panel.on('init', function () {

        API.on({
            'success': function success(data) {
                panel.fire('success', [data]);
            },

            'fail': function fail() {
                panel.fire('fail');
            }
        });
    });

    panel.on('render', function () {
        var query = Query.get(window) || {};
        var keys = ['appid', 'ticket', 'expiretime', 'state'];

        //只要有一个 key 非法，就当作普通的登录。
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (!query[key]) {
                panel.fire('none');
                return;
            }
        }

        //state 中的首位字符即是用户角色。
        var role = query.state[0];

        API.login({
            'appid': query.appid,
            'ticket': query.ticket,
            'role': role
        });
    });
});