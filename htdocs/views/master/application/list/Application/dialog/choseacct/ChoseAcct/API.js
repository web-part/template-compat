
define('/Application/ChoseAcct/API', function (require, module, exports) {
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


        get: function (opt) {

            var api = new API('web/apply/myaccList', {
                'proxy': true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var list = data.list.map(function (item, index) {
                        return {
                            "origin": item,
                            "name": item['account_name'],
                            "number": item['account_no'],
                        }
                    })
                    emitter.fire('success', 'get', [list, {
                        'total': data.count,
                        'page': data.page,
                        'pagesize': data.pagesize,
                    }]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.product.origin.tid,	//企业id
                'prod_id': opt.product.origin.prod_id,	//产品实例id
                'page': opt.page,
                'pagesize': opt.pagesize,
            });

        },

      

    };


});