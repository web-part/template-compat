
define('/AccountCreate/API', function (require, module, exports) {
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
        * 检测能否创建账套。
        */
        check: function (opt) {
          
            var api = new API('web/product/check_is_can_create_account', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('检测中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var allow = data['is_can'] == 1;
                    var msg = json.msg;

                    //////////
                    //var allow = true;

                    if (allow) {
                        emitter.fire('success', 'check', []);
                    }
                    else {
                        KISP.alert(msg);
                    }

                },

                'fail': function (code, msg, json) {
                    KISP.alert('检测创建账套失败:', msg);
                },

                'error': function () {
                    KISP.alert('检测创建账套错误: 网络繁忙，请稍候再试');

                },
            });


            api.post({
                'tid': opt.company.origin['tid'],              //用户企业ID
                'prod_id': opt.product.origin['prod_id'],      //产品ID
                'prod_code': opt.product.origin['prod_code'],  //产品编码
            });

        },

        /**
        * 创建账套。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *       data: {},       //表单数据。
        *   };
        */
        create: function (opt) {

            var api = new API('web/product/create_account', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('创建中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var failed = data['is_can'] == 0;

                    if (failed) {
                        KISP.alert('创建账套失败: {0}', json.msg, function () { 
                            emitter.fire('fail', 'create');
                        });
                        return;
                    }

                    toast.show('创建成功', function () {
                        emitter.fire('success', 'create', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    //emitter.fire('success', 'create', [data]);
                    //return;

                    if (code == 408) {
                        toast.show('账套创建中', function () {
                            emitter.fire('success', 'create', [data]);
                        });
                    }
                    else {
                        KISP.alert('创建账套失败: {0}', msg, function () { 
                            emitter.fire('fail', 'create');
                        });
                    }
                },

                'error': function () {
                    KISP.alert('创建账套错误: 网络繁忙，请稍候再试', function () { 
                        emitter.fire('fail', 'create');
                    });
                },
            });


            var company = opt.company.origin;
            var product = opt.product.origin;
            var data = opt.data;
            data = JSON.stringify(data);
            data = encodeURIComponent(data);
         

            var form = {
                'tid': company['tid'],                  //用户企业ID。
                'prod_id': product['prod_id'],          //产品ID。
                'prod_code': product['prod_code'],      //产品编码。
                'product_id': product['product_id'],    //产品类型ID（商贸版：S1S052S001、专业版：S1S052S002、旗舰版：S1S052S003）。
                'account_data': data,                   //表单数据。
            };

            console.log(form);

            api.post(form);

        },


    };


});