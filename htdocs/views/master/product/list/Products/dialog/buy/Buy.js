
/*
* 【我要购买】对话框。
* 即输入服务商编码。
*/
KISP.panel('/Products/Buy', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;


    var meta = {
        product: null,  //外面传进来的产品信息。
    };


    panel.set('show', false);


    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '我要购买',
            'width': 412,
            'resizable': false,
            'z-index': 1023,
       
            'container': panel,
            'content': Content,
            'footer': Footer,
          
        });

      
        dialog.on({
            'render': function () {
                Content.render();
                Footer.render();
            },
        });



        Content.on({
            'verify': function (value) {

                API.verify({
                    'value': value,             //`30755021`
                    'product': meta.product,
                });
            },
        });


        Footer.on({
            'cancel': function () {
                dialog.close();
            },

            'submit': function () {
                var value = Content.get();

                var form = {
                    'value': value,             //`30755021`
                    'product': meta.product,    //产品信息。
                };

                //没有输入值，直接获取 url。
                if (!value) {
                    API.getUrl(form);   //
                    return;
                }


                //输入了值，则先校验。
                API.verify(form, function (data) { //传了回调函数，则不会再触发事件。
                    Content.render(data);

                    setTimeout(function () {
                        API.getUrl(form);   //
                    }, 500);
                });   


            },
        });


        API.on('success', {

            //校验编码成功。
            'verify': function (data) {
                
                Content.render(data);
            },

            //校验商机成功。
            'check': function (data) {
                var code = data ? data.code : '';   //如果是商机类产品会返回伙伴编码，单点登录需要传递。

                var msg = data ? `此订单将由金蝶官方授权服务商【${data.name}】为您提供服务。` : 
                        `<span style="color: red;">此订单将由金蝶为您分配官方授权服务商，</span><p>请在订单支付完成后在订单详情中进行查看。</p>`;

                KISP.confirm(msg, function () {

                    API.getUrl({
                        'value': code,              //伙伴编码，如 `30755021`
                        'product': meta.product,    //产品信息。
                    });
                });
                
            },



            //获取跳转地址成功。
            'url': function (url, defaults) {
                dialog.close();

                if (defaults.test == 1) {
                    window.open(url);
                }
                else {
                    console.log(url);
                }
            },

        });



    });


    /**
    * 渲染。
    *   opt = {
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (opt) {
        var product = meta.product = opt.product.origin;
        var id = product['product_id'];


        //旗舰版，直接获取 url，不显示对话框。
        if (id == 'S1S052S003') {
            API.check({
                'product': product,
            });

            panel.hide();
        }
        else {
            dialog.render();
            panel.show();
        }

        
       
    });



});





