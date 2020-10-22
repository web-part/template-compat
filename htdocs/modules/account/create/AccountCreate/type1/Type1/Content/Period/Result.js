
/**
* 
*/
KISP.panel('/AccountCreate/Type1/Content/Period/Result', function (require, module, panel) {

    var KISP = require('KISP');
    var $String = KISP.require('String');


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
        

    });


    /**
    *   data = {
    *       year: '',
    *       month: '',
    *   };
    */
    panel.on('render', function (data) {
        meta = data;
        panel.fill(data);

    });



    return {
        get: function () {

            var value = $String.format('{year}-{month}-01', meta);

            return value;

        },
    };




});






