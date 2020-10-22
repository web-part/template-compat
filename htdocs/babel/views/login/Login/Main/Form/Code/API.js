/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 98810FDE1B2644D8AAA2A5C2EA5746C7
*
* source file: htdocs/views/login/Login/Main/Form/Code/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Login/Main/Form/Code/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');
    var Query = KISP.require('Query');

    var emitter = new Emitter();
    var loading = KISP.create('Loading', {
        mask: 0
    });

    function done(json) {
        if (json.code != 200) {
            emitter.fire('check', [false]);
            return;
        }

        var data = json.data;
        var opt = API.sign(false);
        var url = Query.add(data.code, opt);

        emitter.fire('check', [{
            'url': url,
            'sessionId': data['session_id']
        }]);
    }

    return {

        /**
        * 刷新验证码图片。
        * 主要是更换 timestamp 和 state。
        */
        refresh: function refresh(url) {
            var opt = API.sign(false);
            url = Query.add(url, opt);
            return url;
        },

        /**
        * 根据用户名检查是否需要验证码。
        */
        check: function check(username) {
            if (!username) {
                emitter.fire('check', [false]);
                return;
            }

            var api = API.create('web/code/check_code', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    //loading.show('检验中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    done(json);
                },

                'fail': function fail(code, msg, json) {
                    done(json);
                },

                'error': function error() {
                    KISP.alert('检验错误: 网络繁忙，请稍候再试。');
                }
            });

            var opt = API.sign(false, {
                'user_name': username
            });

            api.post(opt);
        },

        on: emitter.on.bind(emitter)

    };
});