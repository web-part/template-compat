
define('/Navigator/Third/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');

    var loading = KISP.create('Loading', {
        mask: 0,
    });

  



    return {

        /**
        * 获取用于进入账套列表所需要的第三方登录信息。
        * 包括：用户信息、企业信息、产品信息。
        */
        getForAccount: function (third, done) {

            var api = new API('web/enterprise/get_account', {
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
                    var user = data['user_info'];
                    var company = data['company_info'];
                    var product = data['product_info'];


                    user.role = 2; //进入管理中心。

                    company = {
                        'avatar': company['avatar'],        //企业头像。
                        'name': company['name'],            //企业名字。
                        'tid': company['tid'],              //企业 id。
                        'status': company['org_status'],    //企业认证状态。
                        'origin': company,
                    };

                    product = {
                        'name': product['product_name'],
                        'status': product['status'],        //正在使用产品状态，0为禁用，1为启用(正常使用)。
                        'origin': product,
                    };

                    done({ user, company, product, });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取第三方登录信息失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取第三方登录信息错误: 网络繁忙，请稍候再试');
                },
            });


            api.post(third);


        },


        /**
        * 获取用于进入工作台所需要的第三方登录信息。
        * 包括：用户信息。
        */
        getForSubject: function (third, done) {

            var api = new API('web/enterprise/get_user_account', {
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
                    var user = data['user_info'];

                    user.role = 1; //进入工作台。

                    done({ user, });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取第三方登录信息失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取第三方登录信息错误: 网络繁忙，请稍候再试');
                },
            });


            api.post(third);


        },



    };


});