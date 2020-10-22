
/*
* 激活产品对话框。
* 即开通服务。
*/
KISP.panel('/Products/Active', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '开通服务',
            'width':560,
            'resizable': false,
            'z-index': 1023,
       
            'container': panel,
            'content': Content,
            'footer': Footer,
          
        });

      
        dialog.on({
            'render': function () {
                Content.render(meta.company.origin);
                Footer.render();
            },
        });

        API.on({
            'success': function () {
                dialog.close();
                panel.fire('success');
            },
        });


        Footer.on({
            'submit': function () {
                var form = Content.get();

                if (form) {

                    API.post({
                        'company': meta.company,
                        'product': meta.product,
                        'form': form,
                    });
                }
            },
        });

    });


    /**
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        meta = data;
        dialog.render();
       
    });



});





