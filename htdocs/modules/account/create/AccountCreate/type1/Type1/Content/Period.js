
/**
* 会计期间
*/
KISP.panel('/AccountCreate/Type1/Content/Period', function (require, module, panel) {

    
    var Year = module.require('Year');
    var Month = module.require('Month');
    var Result = module.require('Result');

    var meta = {
        year: '',
        month: '',
    };


    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
      
        Year.on({
            'change': function (value) {
                meta.year = value;
                Result.render(meta);
            },
        });

        Month.on({
            'change': function (value) {
                meta.month = value;
                Result.render(meta);
            },
        });

    });



    panel.on('render', function () {
        Year.render();
        Month.render();
    });





    return {
        get: function () {

            var result = Result.get();

            return {
                'start_year': meta.year,
                'start_period': meta.month,
                'period_date': result,
            };
        },
    };

 

});






