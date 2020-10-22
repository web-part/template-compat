
/**
* 应用模式
*/
KISP.panel('/AccountCreate/Type2/Content/Mode', function (require, module, panel) {
    var KISP = require('KISP');

    var toast = null;
    var tabs = null;

    //税率列表。
    var list = [
        { type: 0, value: 13, },
        { type: 1, value: 3, },
    ];

    var meta = {
        index: 0,
    };



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        toast = KISP.create('Toast', {
            icon: 'close',
            duration: 1500,
            width: 210,
        });

        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '[data-index]',
            activedClass: 'on',
            eventName: 'click',
            repeated: true,             //允许重复激活同一项。 主要为了恢复现场。
        });

        tabs.on('change', function (item, index) {
            meta.index = index;
            item = list[index];

            panel.$.find('[data-type="rate-input"]').val(item.value);
        });



        panel.$.on('keyup', '[data-type="rate-input"]', function (event) {
            this.value = this.value.replace(/\D/g, '');
        });

    });


    panel.on('render', function () {
        tabs.render();

        tabs.active(0);
        
    });





    return {
        get: function () {
            var txt = panel.$.find('[data-type="rate-input"]').get(0);
            var value = txt.value;

            if (value < 0 || value > 100 || !value) {

                toast.show('税率必须录入 0-100 的整数', function () {
                    txt.value = '';
                });

                return;
            }


            var item = list[meta.index];

            return {
                'tax_type': item.type,
                'tax_rate': value
            };
        },
    };



});






