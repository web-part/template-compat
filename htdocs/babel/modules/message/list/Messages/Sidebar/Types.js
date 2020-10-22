/*
* babel time: 2020-10-19 16:42:32
*
* source md5: F28AFFDD100A873F15E0E6ADEF0948CF
*
* source file: htdocs/modules/message/list/Messages/Sidebar/Types.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Messages/Sidebar/Types', function (require, module, panel) {

    var $ = require('$');

    var list = [{ text: '未读消息', status: 0, checked: true }, { text: '已读消息', status: 1, checked: true }, { text: '系统消息', type: 1, checked: false }, { text: '个人消息', type: 2, checked: false }];

    function fire() {
        var checks = list.filter(function (item) {
            return item.checked;
        });

        panel.fire('change', [checks]);
    }

    panel.on('init', function () {
        panel.set('show', false); //禁止 render 后自动显示。

        panel.template(function (item, index) {
            return {
                'index': index,
                'text': item.text,
                'checked': item.checked ? 'on' : ''
            };
        });

        panel.$on('click', {
            'li[data-index]': function liDataIndex(event) {
                var index = +this.getAttribute('data-index');
                var item = list[index];
                var checked = item.checked = !item.checked;

                $(this).find('[data-cmd="check"]').toggleClass('on', checked);

                fire();
            }
        });
    });

    panel.on('render', function () {

        //重置一下，避免保留上次的现场。
        list[0].checked = true;
        list[1].checked = true;
        list[2].checked = false;
        list[3].checked = false;

        panel.fill(list);

        fire();
    });

    return {};
});