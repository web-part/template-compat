
define('/AddCompanys/Content/API', function (require, module, exports) {
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



        get: function (opt, list) {
            
            var api = new API('web/org/org_list', {
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
                    var list = data.map(function (item) {

                        return {
                            'tid':item.tid,
                            'name': item.name,
                            'num': item.use_prod_num,
                            'phone': item.admin_mobile,
                            'status':item.org_status,
                            'creatName': item.admin_name,
                            'ifChecked': item.is_show?true:false,
                        };

                    });
                    emitter.fire('success', [list]);


                },

                'fail': function (code, msg, json) {

                    KISP.alert('获取企业列表失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function () {
                    KISP.alert('获取企业列表失败错误: 网络繁忙，请稍候再试');
                },
            });
            api.post({

            });

        },
    };


});