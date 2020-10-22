
define('/Login/Storage', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var User = require('User');

    
    var storage = KISP.create('SessionStorage', module.id);


    return {

        clear: function () {
            API.clear();
            storage.clear();
        },

        set: function (data) {

            //配置到公共模块 API 中，以便后续的接口发起中能自动带上。
            API.set({
                'token': data['token'],
                'uid': data['uid'],
            });

            storage.set(data);

            User.set(data);
        },




        get: function () {
            return storage.get();
        },


    };


});