


KISP.panel('/AccountBaks/Tabs', function (require, module, panel) {

    var KISP = require('KISP');

    var tabs = null;

    var meta = {
        index: 0,
    };

    var list = [
        { text: '公有云手动备份', cmd: 'manual', },
        { text: '公有云自动备份', cmd: 'auto', },
        { text: '私有云备份', cmd: 'private', },
    ];

    panel.on('init', function () {

        tabs = KISP.create('Tabs', {
            container: panel.$,             //页签的容器。
            selector: '>li',                //页签项的元素选择器。
            activedClass: 'on',             //激活项的 css 类名。
            eventName: 'click',             //监听的事件名。
            repeated: true,                 //允许重复点击。
        });

        //设定填充规则。
        tabs.template(function (item, index) {
            return {
                'index': index,
                'text': item.text,
            };
        });

        //绑定事件。
        tabs.on('change', function (item, index) {
            meta.index = index;

            panel.fire('change', item.cmd, [item]);
        });

    });


    panel.on('render', function (index) {
        if (typeof index == 'number') {
            meta.index = index;
        }
        else {
            index = meta.index;
        }

        tabs.render(list);
        tabs.active(index);
    });



    return {

    };

});