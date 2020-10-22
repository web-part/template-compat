
KISP.panel('/Auth/Main/Base/Address/Country', function (require, module, panel) {
    var KISP = require('KISP');
    var DropList = require('DropList');


    var droplist = null;
    var toast = null;

    var list = [
        { id: '0', name: '请选择国家', type: 'default', },
        { id: '1', name: '中国', type: 'china', },
        { id: '2', name: '国外及港澳台地区', type: 'other', },
    ];

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        droplist = new DropList({
            'container': panel.$.get(0),
            'columns': ['name'],
            'empty': false,
            'readonly': true,
            'field': {
                id: 'id',
                text: 'name',
                focus: 'name',
                title: 'name',
            },
        });

        droplist.on({
            'select': function (item, opt) {
                var oItem = item.item;
          
                panel.fire('select', oItem.type, [oItem]);
                panel.fire('select', [oItem]);
            },

        });


    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {
        droplist.render();
        droplist.fill(list);
        droplist.select(0);
        
    });


    return {
        get: function () {
            var item = droplist.get();

            if (item.id != '0') {

                return item;
            }


            return function () {
                toast.show(item.item.name, function () {
                    droplist.$.find('input').focus();
                });
            };

        },

    };
  

});