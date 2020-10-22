/**
* 
*/
KISP.route('CompanyRegister', function (require, module) {


    return {

        /**
        * 注册企业成功。
        * 根据后台的指令重新跳转。
        * 参数：
        *   third = {               //必选，第三方包，从后台取得。
        *       type: 4,            //必选，跳转类型。 `4` 会跳到账套视图。
        *       ...,                //
        *   };
        */
        'success': function (third) {
            var Navigator = module.require('Navigator');
            Navigator.jump(third);
        },
        
    };
});
