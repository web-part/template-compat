
define('/Login/Main/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var RSA = require('RSA');
    var Emitter = KISP.require('Emitter');
    var MD5 = KISP.require('MD5');
    

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
        container: `[data-panel="${module.parent.id}"]`,
    });




    return {
        'on': emitter.on.bind(emitter),

        /**
        * 登录。
        *   //必选，
        *   form = {
        *       
        *   };
        *
        *   //可选，
        *   third: {
        *       
        *   },
        */
        login: function (form, third) {

            var api = API.create('web/login/login', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('登录中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    //如果指定了第三方，则直接使用后台返回的结构，
                    //此时结构为 { type, rand_state, ..., } 以进一步的跳转。

                    //否则，就是内部的普通登录，转换一下结构。
                    if (!third) {
                        data.role = form.role; //增加一个字段：用户角色。
                    }


                    emitter.fire('login', 'success', [data]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('登录失败: {0}', msg, code);
                    emitter.fire('login', 'fail');
                },

                'error': function () {
                    KISP.alert('登录错误: 网络繁忙，请稍候再试');
                },
            });



            //RSA 加密。
            var password = RSA.encrypt(form.password);

            //合并+签名，即使 third 为 null 也无妨。
            var params = API.sign({
                'user_name': form.username,
                'password': password,
                'code': form.code.value,
                'session_id': form.code.sessionId,
                'role': form.role,

            }, third); //third 放后面会安全点，因为它可能为 null、false 之类的。
            

            api.post(params);

        },

       

      

    };


});