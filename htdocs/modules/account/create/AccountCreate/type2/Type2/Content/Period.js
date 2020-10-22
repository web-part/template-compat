
/**
* 会计期间。
*/
KISP.panel('/AccountCreate/Type2/Content/Period', function (require, module, panel) {
    
    var Customize = module.require('Customize');
    var Year = module.require('Year');
    var Month = module.require('Month');


    var meta = {
        month: '',      //选中的月份。
    };




    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        Year.on({
            'change': function (item, list) {
                Customize.render({
                    'year': item.value,
                    'years': list,
                });
            },
        });

        Month.on({
            'change': function (value) {
                meta.month = value;
            },
        });

        //自定义会计期间对话框点击确定后。
        Customize.on({
            'ok': function (data) {
                Year.active(data.year);
            },
        });


    });


    /**
    * 
    */
    panel.on('render', function () {
        Year.render();
        Month.render();
    });



    return {
        /**
        * 获取用于提交给后台的数据。
        */
        get: function () {

            var api = Customize.get({
                'start_period': meta.month,
            });
            
            return api;
           
        },
    };



});






