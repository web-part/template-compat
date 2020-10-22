
/**
* 自定义会计期间对话框。
* 该组件是单实例模式，意味着不允许同时打开多个。
*/
KISP.panel('CustomizePeriod', function (require, module, panel) {
    var KISP = require('KISP');
    var Dialog = require('Dialog');
    var Footer = module.require('Footer');
    var Content = module.require('Content');

    var dialog = null;

    var meta = {
        sid: '',    
    };




    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        dialog = Dialog.panel({
            'title': '自定义会计期间',
            'width': 566,
            'height': 560,
            'resizable': false,
            'z-index': 1026,

            'container': panel,
            'content': Content,
            'footer': Footer,
        });

        dialog.on({
            'render': function (data) {
                Content.render(data);
                Footer.render();
            },

        });

        Footer.on({
            'ok': function () {
                var data = Content.get();

                console.log(data);
                panel.fire('ok', [meta.sid, data]);
                dialog.close();
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    /**
    * 渲染。
    *   data = {
    *       sid: '',        //会话 id。 因为组件是单实例的，为了区分多个场景的调用，每个场景应指定专有的唯一 id 传进来。
    *       year: 2018,     //头部年份列表填充后，要选中的年份值。
    *       years: [],      //头部年份列表要填充数据。
    *   };
    */
    panel.on('render', function (data) {
        if (!data.sid) {
            throw new Error(`${module.id} 组件是单实例模式，必须在参数中指定 sid 字段。`);
        }

        //再次打开同一个会话 id 的，直接显示，以保留现场。
        if (data.sid == meta.sid) {
            dialog.show();
            return;
        }


        meta.sid = data.sid;

        dialog.render(data);
        Footer.render();


    });




    return {
        'getDefaultApiData': Content.getDefaultApiData,
    };


});






