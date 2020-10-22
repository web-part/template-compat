
/*
* 
*/
KISP.panel('/Auth/Main', function (require, module, panel) {
    

    var API = module.require('API');    //
    var Base = module.require('Base');  //基础信息。
    var User = module.require('User');  //联系人信息。
    var Auth = module.require('Auth');  //认证信息。
 
    var Submit = module.require('Submit');  //保存和提交。


    var meta = {
        company: null,
    };


    panel.on('init', function () {
     
        Submit.on({
            //保存、提交的公共逻辑，预处理。
            'click': function () {
                var base = Base.get();
                var user = User.get();
                var auth = Auth.get();

                return { base, user, auth, };
            },

            //保存。 根据需求去掉保存
            // 'save': function (form) {
            //     API.save(meta.company, form);
            // },

            //提交。
            'submit': function (form) {
                var list = [...form.base, ...form.user, ...form.auth, ];

                var item = list.find(function (item) {
                    return typeof item.value == 'function';
                });


                if (item) {
                    item.value(); //错误处理。
                }
                else {
                    API.submit(meta.company, form);
                }
            },
        });

        Base.on({
            'set-code': function (data) {
                Auth.setCode(data);
            }
        });

        API.on('success', {
            'save': function () {

            },

            'submit': function () {
                panel.fire('submit');
            },
        });
    });



    panel.on('render', function (company) {
        meta.company = company;


        Base.render(company);
        User.render();
        Auth.render();
        Submit.render();


    });


});





