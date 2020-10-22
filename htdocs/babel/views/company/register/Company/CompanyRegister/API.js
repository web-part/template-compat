/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 9BCDA3D47B1CC7EFBCB6BF2A61CC852F
*
* source file: htdocs/views/company/register/Company/CompanyRegister/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/CompanyRegister/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();
    var loading = KISP.create('Loading', {
        mask: 0
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0
    });

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 注册企业。
        *   opt = {
        *       name: '',   //必选，企业名称。
        *       item: {},   //必选，企业类型，列表中的项。
        *       third: {},  //必选，第三方来源数据包。
        *   };
        */
        post: function post(opt) {
            var api = new API('web/enterprise/reg_enterprise', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('注册中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    toast.show('注册企业成功', function () {
                        emitter.fire('success', 'post', [data]); //data 即为新的 third 包。
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('注册企业失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('注册企业错误: 网络繁忙，请稍候再试');
                }
            });

            //暂时未用到企业类型，即 opt.item 。
            var params = Object.assign({}, opt.third, {
                'enterprise_name': opt.name
            });

            api.post(params);
        }

    };
});