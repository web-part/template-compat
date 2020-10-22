
/**
* 注册企业。
* 针对第三方平台跳过来的。
*/
KISP.view('/CompanyRegister', function (require, module, view) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Name = module.require('Name');
    var Footer = module.require('Footer');


    var meta = {
        third: null,    //外面传进来的数据。
        item: null,     //企业类型，当前选中的项。
        name: '',       //企业名称。
    };




    view.on('init', function () {

        function check() {
            //只要有一项为空，即为非法。
            var invalid =
                !meta.item ||
                !meta.name ||
                !meta.third;

            Footer.render(!invalid);
        }


        Footer.on({
            //提交注册。
            'submit': function () {
                API.post(meta);
            },
        });

        List.on({
            //选择企业类型。
            'change': function (item) {
                meta.item = item;
                check();
            },
        });

        Name.on({
            //输入企业名称。
            'change': function (value) {
                meta.name = value;
                check();
            },
        });


        API.on('success', {
            //注册成功。
            'post': function (third) {
                view.fire('success', [third]); //后台返回新的 third 包。
            },
        });

    });

    

    /**
    * 渲染。
    * 参数：
    *   third: {                //必选，第三方平台的信息。
    *       type: 2,            //必选，跳转类型，即第三方请求来源类型，用于给后台验证。          
    *       user_open_id: '',   //
    *       rand_state: '',     //
    *   },
    */
    view.on('render', function (third) {
        meta.third = third;

        List.render();
        Name.render();
        Footer.render(false);

    });






    return {

    };





});