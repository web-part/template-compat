/**
* 
*/
KISP.route('Reset', function (require, module) {


    return {
        'render': function () {
            
        },

        /**
        * 转到登录视图。
        *   data = {
        *       phone: '',      //可选，手机号。
        *       third: {},      //可选，第三方包。
        *   };
        */
        'login': function (data) {
            var Navigator = module.require('Navigator');

            Navigator.to('Login', [data]);
        },
    };
});
