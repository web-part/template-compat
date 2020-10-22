/*
* babel time: 2020-10-19 16:41:38
*
* source md5: F923694B67C2EAA2E2B318F0705F8543
*
* source file: htdocs/views/master/company/auth/Auth/Main/base/Base/Scale.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 企业规模。
*/
KISP.panel('/Auth/Main/Base/Scale', function (require, module, panel) {

    var DropList = module.require('DropList');
    var API = module.require('API');

    var meta = {
        list: [],
        item: null //选中的 item。
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        DropList.on({
            'loading': function loading() {
                API.get();
            },
            'select': function select(item) {
                meta.item = item;
            }
        });

        API.on({
            'success': function success(list) {
                meta.list = list;

                DropList.render(list);
            }
        });
    });

    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {

        meta.item = null;

        DropList.render(meta.list);
    });

    return {
        get: DropList.get
    };
});