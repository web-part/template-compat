
/**
* 应用模式
*/
KISP.panel('/AccountCreate/Type1/Content/Mode', function (require, module, panel) {

    var KISP = require('KISP');


    var tabs = null;

    var list = [
        { value: 0, },
        { value: 1, },
    ];

    var meta = {
        index: 0,
    };


    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '[data-index]',
            activedClass: 'on',
            eventName: 'click',
        });

        tabs.on('change', function (item, index) {
            meta.index = index;
        });

      
    });


    panel.on('render', function () {
        var index = meta.index = 0;
        tabs.render();
        tabs.active(index);
    });





    return {
        get: function () {
            var item = list[meta.index];

            return {
                'GLAndJXCUnite': item.value,
            };
        },
    };

 

});






