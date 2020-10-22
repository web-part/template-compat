/*
* babel time: 2020-10-19 16:41:38
*
* source md5: FC1050A2BCBD8B0DC4119672A9E9E464
*
* source file: htdocs/views/master/product/list/Products/dialog/buy/Buy.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

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
        product: null //外面传进来的产品信息。
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
            'footer': Footer

        });

        dialog.on({
            'render': function render() {
                Content.render();
                Footer.render();
            }
        });

        Content.on({
            'verify': function verify(value) {

                API.verify({
                    'value': value, //`30755021`
                    'product': meta.product
                });
            }
        });

        Footer.on({
            'cancel': function cancel() {
                dialog.close();
            },

            'submit': function submit() {
                var value = Content.get();

                var form = {
                    'value': value, //`30755021`
                    'product': meta.product //产品信息。
                };

                //没有输入值，直接获取 url。
                if (!value) {
                    API.getUrl(form); //
                    return;
                }

                //输入了值，则先校验。
                API.verify(form, function (data) {
                    //传了回调函数，则不会再触发事件。
                    Content.render(data);

                    setTimeout(function () {
                        API.getUrl(form); //
                    }, 500);
                });
            }
        });

        API.on('success', {

            //校验编码成功。
            'verify': function verify(data) {

                Content.render(data);
            },

            //校验商机成功。
            'check': function check(data) {
                var code = data ? data.code : ''; //如果是商机类产品会返回伙伴编码，单点登录需要传递。

                var msg = data ? '\u6B64\u8BA2\u5355\u5C06\u7531\u91D1\u8776\u5B98\u65B9\u6388\u6743\u670D\u52A1\u5546\u3010' + data.name + '\u3011\u4E3A\u60A8\u63D0\u4F9B\u670D\u52A1\u3002' : '<span style="color: red;">\u6B64\u8BA2\u5355\u5C06\u7531\u91D1\u8776\u4E3A\u60A8\u5206\u914D\u5B98\u65B9\u6388\u6743\u670D\u52A1\u5546\uFF0C</span><p>\u8BF7\u5728\u8BA2\u5355\u652F\u4ED8\u5B8C\u6210\u540E\u5728\u8BA2\u5355\u8BE6\u60C5\u4E2D\u8FDB\u884C\u67E5\u770B\u3002</p>';

                KISP.confirm(msg, function () {

                    API.getUrl({
                        'value': code, //伙伴编码，如 `30755021`
                        'product': meta.product //产品信息。
                    });
                });
            },

            //获取跳转地址成功。
            'url': function url(_url, defaults) {
                dialog.close();

                if (defaults.test == 1) {
                    window.open(_url);
                } else {
                    console.log(_url);
                }
            }

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
                'product': product
            });

            panel.hide();
        } else {
            dialog.render();
            panel.show();
        }
    });
});