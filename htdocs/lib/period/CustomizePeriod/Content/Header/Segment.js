
/*
* 分段期间。
* 12 期或 13 期。
*/
KISP.panel('CustomizePeriod/Content/Header/Segment', function (require, module, panel) {

    var KISP = require('KISP');


    var list = [
       { value: 12, },  // value 要用数字，不要用字符串，因为外面会进行计算。
       { value: 13, },
    ];

    var tabs = null;


    var meta = {
        disabled: false,
    };



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
       
        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '>li',
            activedClass: 'on',
            eventName: 'click',
        });

        tabs.on('change', function (item, index) {
            //已禁用。
            if (meta.disabled) {
                tabs.active(0); 
                return;
            }

            item = list[index];
            panel.fire('change', [item.value]);
        });




    });


    /**
    * 渲染。
    *   data = {
    *       disabled: true,  //是否启用。
    *   };
    */
    panel.on('render', function (data) {
        data = data || {};
        meta.disabled = !!data.disabled;

        panel.$.toggleClass('gray', meta.disabled);

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'value': item.value,
            };
        });

        tabs.active(0);

    });





});





