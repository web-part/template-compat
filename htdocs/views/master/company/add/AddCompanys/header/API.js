
define('/AddCompanys/Header/API', function (require, module, exports) {
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



        post: function (list) {
            var api = new API('web/org/to_show', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    toast.show('添加成功', function () {
                        emitter.fire('success');
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('添加企业到常用企业列表中失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function () {
                    KISP.alert('添加企业到常用企业列表中错误: 网络繁忙，请稍候再试');
                },
            });

            list = JSON.stringify(list);
            list = encodeURIComponent(list);
            api.post({
                tid: list,
            });

        },
    };


});