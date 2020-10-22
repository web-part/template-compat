/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 8CD5F0014D4CD0A74224922AF6A96B49
*
* source file: htdocs/views/master/account/logs/AccountLogs/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountLogs/Header', function (require, module, panel) {

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
    *   };
    */
    panel.on('render', function (data) {

        panel.fill({
            'company': data.company.name
        });
    });
});