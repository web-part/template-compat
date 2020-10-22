/*
* babel time: 2020-10-19 16:42:31
*
* source md5: D2F6FA1DF7BAEF1F441FB363C675731E
*
* source file: htdocs/lib/period/CustomizePeriod/Content/Header/Nature.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('CustomizePeriod/Content/Header/Nature', function (require, module, panel) {

    var meta = {
        checked: false //记录选中状态。
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        panel.$.on('click', function () {
            var checked = meta.checked = !meta.checked;

            $(this).find('span').toggleClass('on', checked);
            panel.fire('change', [checked]);
        });

        /**
        * 渲染。
        *   data = {
        *       checked: true,  //是否选中。
        *   };
        */
        panel.on('render', function (data) {

            data = data || {};
            meta.checked = !data.checked; // 这里取反一次，是为了配合下面 click()。

            panel.$.click();
        });
    });
});