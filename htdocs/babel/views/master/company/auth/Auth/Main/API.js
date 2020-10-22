/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 1D267795D46FB05E6B0A4EC301B5036E
*
* source file: htdocs/views/master/company/auth/Auth/Main/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Auth/Main/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');
    var Form = module.require('Form');

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
        * 保存。
        */
        // save: function (company, form) {

        //     var api = new API('web/product/enterprise_auth', {
        //         //proxy: 'success.js',
        //     });

        //     api.on({
        //         'request': function () {
        //             loading.show('保存中...');
        //         },

        //         'response': function () {
        //             loading.hide();
        //         },

        //         'success': function (data, json, xhr) {
        //             toast.show('保存成功', function () {
        //                 emitter.fire('success', 'save', [data]);
        //             });
        //         },

        //         'fail': function (code, msg, json) {
        //             KISP.alert('保存企业认证失败: {0}', msg);
        //         },

        //         'error': function () {
        //             KISP.alert('保存企业认证错误: 网络繁忙，请稍候再试');
        //         },
        //     });


        //     form = Form.get(form);
        //     form['tid'] = company.origin['tid'];


        //     api.post(form);
        // },

        /**
        * 提交。
        */
        submit: function submit(company, form) {

            var api = new API('web/product/enterprise_auth', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('提交中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    toast.show('提交成功', function () {
                        emitter.fire('success', 'submit', [data]);
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('提交企业认证失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('提交企业认证错误: 网络繁忙，请稍候再试');
                }
            });

            form = Form.get(form);
            form['tid'] = company.origin['tid'];

            api.post(form);
        }

    };
});