/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 0D1D044AFFBDF918E4726EE34FAAD6CD
*
* source file: htdocs/modules/account/recover/AccountRecover/Content/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 恢复账套对话框。
*/
KISP.panel('/AccountRecover/Content/Header', function (require, module, panel) {

    var DropList = module.require('DropList');
    var API = module.require('API');

    var meta = {
        list: [],
        currentItem: '' //当前选中产品
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        DropList.on({
            'loading': function loading() {
                API.get(meta.currentItem);
            },
            'select': function select(item) {
                meta.currentItem = item;
                panel.fire('select', [item]);
            }
        });

        API.on({
            'success': function success(list) {
                meta.list = list;
                DropList.render(meta);
            }
        });
    });

    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (data) {
        meta.currentItem = data;
        DropList.render();
        API.get(meta.currentItem);
    });
});