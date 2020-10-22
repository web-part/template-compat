

KISP.panel('/Register/Types', function (require, module, panel) {
    var KISP = require('KISP');
    

    var list = [
        { value: '0', },
        { value: '1', },
        { value: '2', },
        { value: '3', },
        
    ];


    var tabs = null;


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
            item = list[index];

            panel.fire('change', [item]);

        });



    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {
        tabs.reset();
        tabs.render();

    });





});