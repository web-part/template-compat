/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 6EFFD01094F2729807904421FDB7106A
*
* source file: htdocs/views/master/application/list/Application/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Application/Header', function (require, module, panel) {

    var User = require('User');

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');
                panel.$.find('[data-type="add-bar"]').removeClass('on');
                panel.fire(cmd);
            }
        });
    });

    panel.on('render', function (data) {
        panel.fill({
            'company': data.company.name,
            'product': data.product.name
        });
    });
    return {
        setList: function setList(list) {
            var userInfo = User.get();
            if (userInfo) {
                panel.$.find('[data-type="add-bar"]').addClass('on');
                return;
            }
            panel.$.find('[data-type="add-bar"]').removeClass('on');
        }
    };
});