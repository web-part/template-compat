/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 9F6D6A52F25D49B78EC446F927D7C410
*
* source file: htdocs/modules/message/list/Messages/Sidebar/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Messages/Sidebar/List', function (require, module, panel) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');

    var list = [];
    var tabs = null;

    panel.on('init', function () {
        tabs = KISP.create('Tabs', {
            container: panel.$,
            selector: '>li',
            activedClass: 'on',
            eventName: 'click',
            repeated: true
        });

        tabs.on('change', function (item, index) {

            panel.fire('item', [item]);
        });
    });

    panel.on('init', function () {

        var type$text = {
            1: '系统消息',
            2: '个人消息'
        };

        var type$class = {
            1: 'system',
            2: 'personal'
        };

        var status$class = {
            0: 'unread', //未读。
            1: 'read' //已读。
        };

        var weekdays = ['日', '一', '二', '三', '四', '五', '六'];

        tabs.template(function (item, index) {
            var type = item.type;
            var status = item.status;
            var date = $Date.parse(item.date);
            var day = date.getDay(); //0-6

            return {
                'index': index,
                'type-class': type$class[type],
                'status-class': status$class[status],
                'type-text': type$text[type],
                'date': item.date,
                'summary': item.summary,
                'weekday': weekdays[day]
            };
        });
    });

    /**
    * 渲染。
    *   items: [],      //必选，要填充的列表。
    *   openItem: {},   //可选，填充完成后，要打开的某一项。 
    */
    panel.on('render', function (items, openItem) {
        list = items;
        tabs.render(list);

        panel.fire('render');

        //如果指定了要打开某一项，则找到它。
        if (openItem) {
            var index = items.findIndex(function (item, index) {
                return item.id == openItem.id;
            });

            if (index < 0) {
                KISP.alert('\u6253\u5F00\u6307\u5B9A\u6D88\u606F\u5931\u8D25\uFF1A\u6D88\u606F\u5217\u8868\u4E2D\u4E0D\u5B58\u5728 id \u4E3A ' + openItem.id + ' \u8BB0\u5F55\u3002');
                return;
            }

            //存在，则激活它，并滚动到可视范围内。
            tabs.active(index);
            panel.$.find('li[data-index="' + index + '"]').get(0).scrollIntoView();
        }
    });

    return {
        read: function read(item) {

            var index = list.findIndex(function (oItem, index) {
                return item.id == oItem.id;
            });

            if (index < 0) {
                return;
            }

            var $li = panel.$.find('li[data-index="' + index + '"]');

            item = list[index];
            item.status = 1;

            $li.removeClass('unread');
            $li.addClass('read');
        }
    };
});