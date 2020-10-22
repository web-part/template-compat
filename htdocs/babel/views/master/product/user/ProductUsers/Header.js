/*
* babel time: 2020-10-19 16:41:38
*
* source md5: E0C8F87F0BA8F8EF7FCB9764D9F7C8A9
*
* source file: htdocs/views/master/product/user/ProductUsers/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/ProductUsers/Header', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            }
        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {

        panel.fill({
            'company': data.company.name,
            'product': data.product.name
        });
    });
});