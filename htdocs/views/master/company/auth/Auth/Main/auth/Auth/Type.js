
/*
* 企业类型。
*/
KISP.panel('/Auth/Main/Auth/Type', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');

   
    //id 是后台用到的，前端不用。
    var list = [
       { id: '1', name: '法人企业', value: '0', },
       { id: '2', name: '个体工商户', value: '0', },
       { id: '4', name: '个人', value: '2', },
       { id: '3', name: '其它组织', value: '3', },
    ];


    var tabs = null;
    var toast = null;

    var meta = {
        item: null,
    };

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

        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '>li',
            activedClass: 'on',
            eventName: 'click',
        });

        tabs.on('change', function (item, index) {
            meta.item = item = list[index];
            panel.fire('change', [item]);

        });





    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (index) {
        //index = index || 0;

        meta.item = null;

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });

        //tabs.active(index);

    });



    return {
        get: function () {
            var item = meta.item;

            if (item) {
                return item;
            }

            return function () {
                toast.show('请选择企业类型');
                Flash.start(panel.$, 'warning');

            };
        },
    };
});





