

KISP.panel('/Login/Main/Form/Role', function (require, module, panel) {
    var KISP = require('KISP');
    var LocalStorage = KISP.require('LocalStorage');


    var list = [
       { name: '普通用户', value: '1', },
       { name: '管理员用户', value: '2', },
    ];

    var tabs = null;
    var storage = null;

    var meta = {
        index: 0, //当前选中的 index。
    };


    panel.on('init', function () {
        storage = new LocalStorage(module.id);

        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '>span',
            activedClass: 'on',
            eventName: 'click',
        });

        tabs.on('change', function (item, index) {
            storage.set('index', index);
            meta.index = index;

            item = list[index];

            panel.fire('change', [item]);
        });

    });




    panel.on('render', function (index) {
        if (typeof index == 'number') {
            meta.index = index;
        }
        else {
            meta.index = index = storage.get('index') || 0;
        }


        tabs.render();
        tabs.active(index);
    });




    return {
        get: function () {
            return list[meta.index];
        },
    };

   



});