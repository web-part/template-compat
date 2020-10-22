
define('/Navigator/Third/Info', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var Query = KISP.require('Query');


    var type$view = {
        1: 'Signup',
        2: 'CompanyRegister',
        3: 'CompanyBind',
        4: 'Accounts',
        5: 'Login',
        6: 'Subject',
    };




    return {

        /**
        * 
        */
        parse: function () {
            //这里需要先获取出字符串形式，再浅层次解析成对象。
            var qs = Query.get(location.href, '');
            var query = Query.parse(qs, true);             //true 表示浅层次解析成对象，即只解析一层，不进行递归解析。

            var openId = query['user_open_id'];
            var type = query['type'];

            var url = Query.remove(location.href);
            var index = url.indexOf('#');

            //如果有 hash，则移除。
            if (index > 0) {
                url = url.slice(0, index);
            }


            if (openId) {
                openId = encodeURIComponent(openId); //后台的原因，这里需要编码一下。
            }


     
            return {
                'view': type$view[type] || '',
                'url': url,

                'third': {
                    'type': type,
                    'user_open_id': openId,
                    'rand_state': query['rand_state'],
                    'phone': query['phone'] || '',      //可选，针对 Login 页的需要自动填充并禁用手机号输入框的情况。
                },
            };

        },

       

    };


});