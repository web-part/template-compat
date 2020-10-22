
/**
* 重置密码。
*/
KISP.view('/Reset', function (require, module, view) {
    var Indicator = module.require('Indicator');
    var Step1 = module.require('Step1');
    var Step2 = module.require('Step2');
    var Step3 = module.require('Step3');
    var Footer = module.require('Footer');
    


    var meta = {
        third: null,    //外面传进入的第三方包。 用于原样传回给登录页。
        form: null,     //第一步和第二步中收集到的表单信息。
    };



    view.on('init', function () {
        
        Step1.on({
            'render': function () {
                Indicator.render(1);
            },

            'next': function (form) {
                Step2.render(form);
            },
        });

        Step2.on({
            'render': function () {
                Indicator.render(2);
            },
            'next': function (form) {
                meta.form = form;

                Step3.render(meta.third);
            },
        });


        Step3.on({
            'render': function () {
                var third = meta.third;

                Indicator.render(3);

                if (third && third.phone) {
                    Footer.hide();
                }
                else {
                    Footer.show();
                }
            },

            'done': function () {
                var third = meta.third;

                view.hide();


                if (third && third.phone) {
                    view.fire('login', [{
                        'third': third,
                    }]);
                }
                else {
                    view.fire('login', [{
                        'phone': meta.form.phone,
                    }]);
                }

            },
        });




        Footer.on({
            //最底部的、一直显示的 `返回登录` 按钮。
            'login': function () {
                Step1.removeClass();
                Step2.removeClass();
                Step3.removeClass();

                view.hide();

                view.fire('login', [{
                    'third': meta.third,
                }]);
            },
        });

    });



    /**
    * 渲染。
    * 参数：
    *   third = { //可选，由第三方平台进来时的数据。 用于跳回登录时传来传去的。
    *       
    *       phone: '',  //
    *   }; 
    */
    view.on('render', function (third) {
        meta.third = third;
        meta.form = null;

        Step1.render(third);
        Footer.render();


    });





});