
/*
* 主控制器。
*/
KISP.launch(function (require, module, nav) {
    var API = require('API');
    var Loading = module.require('Loading');

   

    API.on({
        'session-timeout': function () {
            var Login = module.require('Login');
            Login.logout();

            //这里要刷新一下。 
            //因为超时退出的，可能是由 Master 里的弹出对话框弹出对话框触发的。
            //刷新可以统一关闭对话框，从而避免在登录页显示了 Master 里的弹出对话框。
            location.reload(); 
        },
    });





    
  

    Loading.on({
        'hide': function () {
            var env = KISP.data('env');

            module.render('Header', env);
            module.render('Navigator');
        },
    });


    //启动。
    Loading.hide();



});



