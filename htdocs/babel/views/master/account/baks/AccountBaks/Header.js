/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 652C98B193DC09FC9A9A1D23379402C7
*
* source file: htdocs/views/master/account/baks/AccountBaks/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountBaks/Header', function (require, module, panel) {

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