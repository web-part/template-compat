
define('/CompanyBind/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();
    var loading = KISP.create('Loading', {
        mask: 0,
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });



    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取企业列表及其它信息。
        * 参数：
        *   third: {},  //第三方平台跳进来时的 third 包，用于获取企业列表及其它信息。
        */
        get: function (third) {
            var api = new API('web/enterprise/get_enterprise_list', {
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

                    emitter.fire('success', 'get', [{
                        'companys': data['enterprise_list'],    //企业列表。
                        'bind': data['band_enter'],             //用于进一步提交绑定时的 third 数据包。
                        'register': data['reg_enter'],          //用于切换到注册企业时的 third 数据包。
                    }]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取企业列表失败: {0}', msg);

                },

                'error': function () {
                    KISP.alert('获取企业列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(third);

        },


        /**
        * 绑定企业。
        *   opt = {
        *       third: {},  //必选，用于提交绑定的第三方包，由后台返回取得。 即 get 方法中的 `band_enter` 字段。
        *       item: {},   //必选，企业列表中选中的项。
        *   };
        */
        post: function (opt) {
            var api = new API('web/enterprise/band_enterprise', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('绑定中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('绑定企业成功', function () {
                        emitter.fire('success', 'post', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('绑定企业失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('绑定企业错误: 网络繁忙，请稍候再试');
                },
            });


            var params = Object.assign({}, opt.third, {
                'tid': opt.item['tid'],
            });

            api.post(params);

        },

    };


});