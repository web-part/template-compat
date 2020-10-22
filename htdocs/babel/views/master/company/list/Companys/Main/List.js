/*
* babel time: 2020-10-19 16:41:38
*
* source md5: C3D89AE0364758DBE0955ECA4F9E948A
*
* source file: htdocs/views/master/company/list/Companys/Main/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Companys/Main/List', function (require, module, panel) {

    var User = require('User');

    var list = [];

    panel.on('init', function () {
        panel.template(function (item, index) {
            return {
                'index': index,
                'avatar': item.avatar || 'style/img/bk1.png',
                'name': item.name,
                'count': item.count,
                'status': item.status,
                'show': item.proNum ? '' : 'show'
            };
        });
    });

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd(event) {
                event.stopPropagation();

                var index = +this.getAttribute('data-index');
                var type = this.getAttribute('data-cmd');
                var item = list[index];

                panel.fire(type, [item]);
            },

            'li[data-index]': function liDataIndex(event) {
                var index = +this.getAttribute('data-index');
                var item = list[index];

                panel.fire('item', [item]);
            }

        });
    });

    /**
    */
    panel.on('render', function (items) {

        list = items;
        panel.fill(list);
        var userInfo = User.get();
        if (userInfo) {
            panel.$.find('[data-type="0"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="0"]').removeClass('on');
    });
});