/*
* babel time: 2020-10-19 16:42:31
*
* source md5: FA521A4DA4C56E89E2F9727543232280
*
* source file: htdocs/modules/account/create/AccountCreate/type2/Type2/Content/Subject/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 核算方式。
*/
KISP.panel('/AccountCreate/Type2/Content/Subject/List', function (require, module, panel) {
    var KISP = require('KISP');
    var DropList = require('DropList');
    var defaults = KISP.data(module.id);

    var list = [{ name: '企业会计制度', value: '1' }, { name: '小企业会计制度', value: '2' }, { name: '2013小企业会计准则', value: '4' }, { name: '新会计准则', value: '3' }, { name: '新会计准则（含明细科目）', value: '5' }, { name: '新会计准则科目（已执行新收入准则）', value: '12' }, //index = 5，这条特殊，仅测试环境需要用到。
    { name: '民间非营利组织', value: '11' }, { name: '不预设科目体系', value: '0' }];

    ////非测试环境，删除 list[5] 这项。
    //if (defaults.env != 'test') {
    //    list.splice(5, 1); 
    //}


    var droplist = null;
    var toast = null;

    var meta = {
        item: null //选中的项。
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            icon: 'close',
            duration: 1500
        });

        droplist = new DropList({
            'container': panel.$.find('[data-id="droplist"]'),
            'columns': ['name'],
            'empty': true,
            'custom': false, //允许自定义输入。
            'order': false,
            'maxLength': 20,

            'field': {
                //  id: 'code',
                text: 'name',
                focus: 'name',
                title: 'name'
            }
        });

        droplist.on({
            'select': function select(item, options) {
                item = item.item;
                meta.item = item;
                panel.fire('select-item', [item.value]);
            }
        });
    });

    panel.on('render', function () {
        droplist.render();
        droplist.fill(list);
        droplist.select(0);
    });

    return {
        get: function get() {
            return meta.item;
        }
    };
});