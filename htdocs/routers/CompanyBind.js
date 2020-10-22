/**
* 
*/
KISP.route('CompanyBind', function (require, module) {


    return {

        /**
        * 切换到企业注册视图。
        * 参数：
        *   third = {       //必选，第三方包，从后台取得。
        *       type: 2,    //必选，跳转类型。 `2` 会跳到企业注册。
        *       ...
        *   };
        */
        'register': function (third) {
            var Navigator = module.require('Navigator');
            Navigator.to('CompanyRegister', [third]);
        },


        /**
        * 绑定企业成功。
        * 根据后台返回的指令重新跳转。
        * 参数：
        *   third = {               //第三方包，从后台取得。
        *       type: 4,            //会跳到账套视图。
        *       user_open_id: '',   //
        *       rand_state: '',     //
        *   };
        */
        'success': function (third) {
            var Navigator = module.require('Navigator');
            Navigator.jump(third);

        },

        
    };
});
