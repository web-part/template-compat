/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 2FFFE12FD3011C870060E54626F6DA48
*
* source file: htdocs/views/master/product/list/Products/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Products/Header', function (require, module, panel) {

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

    panel.on('render', function (company) {

        panel.fill({
            'company': company.name
        });
    });

    return {
        setList: function setList(list) {
            var userInfo = User.get();

            panel.$.find('[data-type="add-bar"]').toggleClass('on', !!userInfo);
        }
    };
});