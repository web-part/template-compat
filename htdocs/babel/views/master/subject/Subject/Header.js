/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 7B252AF2DEFBD3F81F1A5F31D65CD1D3
*
* source file: htdocs/views/master/subject/Subject/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Subject/Header', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {
        panel.set('show', false);

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');

                panel.fire(cmd);
            }

        });
    });

    /**
    * 渲染。
    *   account = { //后台返回的当前使用的账套数据。
    *       
    *   };
    */
    panel.on('render', function (account) {
        if (!account) {
            panel.hide();
            return;
        }

        panel.fill({
            'name': account.name
        });

        panel.show();
    });

    return {
        /**
        * 根据外面的内容的显示状态来激活 `on` 类。
        * 以使图标向下或向上。
        */
        active: function active(visible) {
            panel.$.find('[data-cmd="main"]').toggleClass('on', !!visible);
        }
    };
});