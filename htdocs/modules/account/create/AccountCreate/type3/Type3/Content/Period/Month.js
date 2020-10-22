
/**
* 
*/
KISP.panel('/AccountCreate/Type3/Content/Period/Month', function (require, module, panel) {

    var KISP = require('KISP');
    var List = module.require('List');



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
       
        var masker = KISP.create('Mask', {
            opacity: 0,
            volatile: true,
            container: panel.$.get(0).parentNode,
        });

        masker.on({
            'hide': function () {
                List.hide();
            },
        });


        List.on({
            'show': function () {
                masker.show();
                masker.$.css('left', 0); //这里调整一下。
            },

            'change': function (item) {
                var value = item.value;
                masker.hide();
                panel.$.find('button').html(value);
                panel.fire('change', [value]);
            },
        });

        panel.$.on('click', 'button', function () {
            List.show();
        });

    });


    panel.on('render', function () {
        List.render();
    });






});






