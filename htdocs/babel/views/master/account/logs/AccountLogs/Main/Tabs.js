/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 857F8277ED244662CE6E50118CAB0B6A
*
* source file: htdocs/views/master/account/logs/AccountLogs/Main/Tabs.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountLogs/Main/Tabs', function (require, module, panel) {
    var KISP = require('KISP');

    var list = [{ name: '账套', cmd: 'accounts' }, { name: '账套备份文件', cmd: 'baks' }];

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
            eventName: 'click'
        });

        tabs.on('change', function (item, index) {
            item = list[index];
            panel.fire(item.cmd);
        });
    });

    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (index) {
        index = index || 0;

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name
            };
        });

        tabs.active(index);
    });
});