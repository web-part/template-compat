/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 389CA3E62FC968076069F0742163AE08
*
* source file: htdocs/modules/navitagor/Navigator/Third.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 针对从第三方平台跳进来的。
* 通过外部带有查询字符串跳进来的，形式为携带 query 部分，通过指定 type 为不同的值，可跳到不同的视图。
* 如 `?type=1&...` 可以跳到用户注册视图。
* 解析出指令和设置数据，再跳到相应的视图。
*/
KISP.panel('/Navigator/Third', function (require, module, panel) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');
    var Query = KISP.require('Query');
    var API = module.require('API');
    var Info = module.require('Info');

    /**
    * 
    */
    panel.on('init', function () {});

    /**
    * 
    */
    panel.on('render', function () {
        var info = Info.parse();
        var third = info.third; //第三方包。
        var view = info.view;

        switch (view) {
            //不需要进行第三方跳转的。
            case '':
                panel.fire('none');
                break;

            case 'Accounts':
                //先请求接口，让后台进行登录，以获得用户、企业、产品三个信息。
                //再让 Master 恢复现场，进入账套列表页。
                API.getForAccount(third, function (data) {
                    panel.fire('jump', [info.url, {
                        'fire': 'account', //控制外部要对外触发的事件。
                        'data': data // data = { user, company, product, };
                    }]);
                });
                break;

            //要跳到工作台的。
            case 'Subject':
                API.getForSubject(third, function (data) {
                    panel.fire('jump', [info.url, {
                        'fire': 'subject', //控制外部要对外触发的事件。
                        'data': data // data = { user, };
                    }]);
                });
                break;

            //跳到登录页，参数形式有点不同。
            case 'Login':
                panel.fire('jump', [info.url, {
                    'view': view,
                    'args': [{ 'third': third }]
                }]);
                break;

            //普通的跳转。
            default:
                panel.fire('jump', [info.url, {
                    'view': view,
                    'args': [third]
                }]);
                break;
        }
    });

    return {

        /**
        * 
        */
        jump: function jump(query) {
            Query.set(location, query);
        }

    };
});