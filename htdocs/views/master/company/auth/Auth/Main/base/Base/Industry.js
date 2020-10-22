﻿
/*
* 所属行业。
* 即行业分类。
*/
KISP.panel('/Auth/Main/Base/Industry', function (require, module, panel) {
    
    var DropList = module.require('DropList');
    var API = module.require('API');

    var meta = {
        list: [],
    };


    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
  
        DropList.on({
            'loading': function () {
                API.get();
            },
            'select': function (item) {
                
            },
        });
  

        API.on({
            'success': function (list) {
                meta.list = list;

                DropList.render(list);
            },
        });

    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {

        DropList.render(meta.list);

    });




    return {
        get: DropList.get,
    };


});





