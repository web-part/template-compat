/*
* babel time: 2020-10-19 16:42:32
*
* source md5: FF8FCC303185669372F50679D2AFED30
*
* source file: htdocs/views/login/Login/Storage.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Login/Storage', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var User = require('User');

    var storage = KISP.create('SessionStorage', module.id);

    return {

        clear: function clear() {
            API.clear();
            storage.clear();
        },

        set: function set(data) {

            //配置到公共模块 API 中，以便后续的接口发起中能自动带上。
            API.set({
                'token': data['token'],
                'uid': data['uid']
            });

            storage.set(data);

            User.set(data);
        },

        get: function get() {
            return storage.get();
        }

    };
});