/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 1E3F87963DD5074DA810BF075C09B969
*
* source file: htdocs/modules/account/create/AccountCreate/type2/Type2/Content/Period/Customize.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/AccountCreate/Type2/Content/Period/Customize', function (require, module, panel) {

    var KISP = require('KISP');
    var $String = KISP.require('String');
    var CustomizePeriod = require('CustomizePeriod');

    var meta = {
        sid: '', //传给 CustomizePeriod 用到。
        year: '', //选中的年份。
        years: [], //年份下拉列表中的数据。 传给公共的【自定义会计期间】对话框用到。
        form: null //【自定义会计期间】对话框点击 `确定` 后获得的数据。
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        panel.$on('click', {
            //自定义会计期间。
            '[data-cmd="customize"]': function dataCmdCustomize() {
                CustomizePeriod.render({
                    'sid': meta.sid,
                    'year': meta.year,
                    'years': meta.years
                });
            }
        });

        //自定义会计期间对话框点击确定后。
        CustomizePeriod.on({
            'ok': function ok(sid, data) {
                //只关注自己的会话。
                if (sid != meta.sid) {
                    return;
                }

                meta.form = data;
                panel.fire('ok', [data]);
            }
        });
    });

    /**
    * 渲染。
    *   data = {
    *       year: 2018,     //头部年份列表填充后，要选中的年份值。
    *       years: [],      //头部年份列表要填充数据。
    *   };
    */
    panel.on('render', function (data) {

        meta.year = data.year;
        meta.years = data.years;

        meta.sid = module.id + '-' + $String.random();
    });

    return {
        /**
        * 获取用于提交给后台的数据。
        */
        get: function get(data) {
            var form = meta.form;

            var api = form ? form.api : CustomizePeriod.getDefaultApiData(meta.year);

            data = Object.assign({}, api, data);

            return data;
        }
    };
});