
/*
* 商贸版。
*/
KISP.panel('/AccountCreate/Type1', function (require, module, panel) {
    

    var Content = module.require('Content');
    var Footer = module.require('Footer');

    var Dialog = require('Dialog');
    var dialog = null;


    panel.set('show', false);

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '创建账套',
            'width': 560,
            'height':580,
            'resizable': false,
            'z-index': 1023,

            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function (data) {
                Content.render(data);
                Footer.render(1);
            },

        });
        Content.on({
            'chose-step': function (index) {
                Content.active(index);
                Footer.setStatus(index);
            },
        });

        Footer.on({
            'next': function (step) {
                return Content.check(step);
            },

            'step': function (step) {
                Content.active(step);
            },

            'create': function () {
                var data = Content.get();

                //说明有数据非法。
                if (!data) {
                    return;
                }

                panel.fire('submit', [data]);
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
        dialog.render(data);
    });


    return {
        close: function () {
            dialog.close();
        },
    };

});





