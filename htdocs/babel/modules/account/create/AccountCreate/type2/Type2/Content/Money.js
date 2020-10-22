/*
* babel time: 2020-10-19 16:42:31
*
* source md5: ABD7CCC8FC816676EE827164B634E5D4
*
* source file: htdocs/modules/account/create/AccountCreate/type2/Type2/Content/Money.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 本位币。
*/
KISP.panel('/AccountCreate/Type2/Content/Money', function (require, module, panel) {

    var KISP = require('KISP');
    var DropList = require('DropList');
    var Precision = module.require('Precision');

    //记账本位币：
    //名称：默认显示人民币，下拉框中显示美元、港币、欧元、英镑和日元
    //代码：人民币-RMB，美元-USD，港币-HKD，欧元-EUR，英镑-GBP，日元-JPY
    //同时允许用户手工输入本位币名称和本位币代码。
    //本位币名称长度不能超过20个字符，本位币代码不能超过8个
    var list = [{ name: '人民币', code: 'RMB' }, { name: '美元', code: 'USD' }, { name: '港币', code: 'HKD' }, { name: '欧元', code: 'EUR' }, { name: '英镑', code: 'GBP' }, { name: '日元', code: 'JPY' }];

    var droplist = null;
    var toast = null;

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
            'columns': ['name', 'code'],
            'empty': true,
            'custom': true, //允许自定义输入。
            'order': false,
            'maxLength': 20,

            'field': {
                id: 'code',
                text: 'name',
                focus: 'name',
                title: 'name'
            }
        });

        droplist.on({
            'select': function select(item, options) {
                var code = item.item.code;
                panel.$.find('[data-id="code"]').val(code);
            }
        });
        panel.$.on('blur', '[data-id="code"]', function (event) {
            this.value = this.value.replace(/[^a-zA-Z]/g, '');
        });
    });

    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {
        droplist.render();
        droplist.fill(list);
        droplist.select(0);

        Precision.render();
    });

    return {
        get: function get() {
            var name = droplist.$.find('input').val();
            var code = panel.$.find('[data-id="code"]').val();
            var precision = Precision.get();

            if (!name) {
                toast.show('记账本位币的名称必填', function () {
                    droplist.$.find('input').focus();
                });
                return false;
            }

            if (!code) {
                toast.show('记账本位币的代码必填', function () {
                    panel.$.find('[data-id="code"]').focus();
                });
                return false;
            }

            if (precision < 0 || precision > 4 || precision === '') {
                toast.show('金额小数位必须在 0-4 之间', function () {
                    panel.$.find('[data-id="precision"]').focus();
                });
                return false;
            }

            return {
                'currency_name': name,
                'currency_code': code,
                'currency_scale': Number(precision)
            };
        }
    };
});