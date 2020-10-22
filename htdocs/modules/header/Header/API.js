
define('/Header/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');

    var Emitter = KISP.require('Emitter');
    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });


    var defaults = KISP.data(module.id);


    return {
        'on': emitter.on.bind(emitter),



        /**
        * 获取跳转到 kis-o2o 的【订单列表】链接。
        */
        getUrl: function () {

            var api = new API('web/kiso2o/login_by_kisyun', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('加载中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var url = data.url;

                    emitter.fire('success', 'url', [url, defaults]);

                },

                'fail': function (code, msg, json) {

                    KISP.alert('获取跳转到 kis-o2o 的链接失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取跳转到 kis-o2o 的链接错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'type': 4,                          //后端已经增加一个新的type 4请求单点登录的时候会默认跳转我的订单页面。
                'test': defaults.test,              //为了区分跳到不同的环境。
            });
        },

    };


});