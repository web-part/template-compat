/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 913CDA55CF7AC16F1B3503670C22A963
*
* source file: htdocs/modules/account/create/AccountCreate/type2/Type2/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountCreate/Type2/Content', function (require, module, panel) {
    var Form = module.require('Form');
    var Mode = module.require('Mode');
    var Money = module.require('Money');
    var Subject = module.require('Subject');
    var Set = module.require('Set');
    var Period = module.require('Period');

    panel.on('init', function () {
        panel.$on('click', {
            '[data-step]': function dataStep() {
                var index = +this.getAttribute('data-step');

                panel.$.find('[data-step]').removeClass('on');
                $(this).addClass('on');
                panel.fire('chose-step', [index]);
            }
        });
    });

    panel.on('render', function (data) {
        Form.render(data);
        Mode.render();
        Money.render();
        Subject.render();
        Set.render();
        Period.render();
    });

    return {
        /**
        * 激活指定的步骤。
        */
        active: function active(step) {
            panel.$.find('[data-step]').removeClass('on');
            panel.$.find('[data-step="' + step + '"]').addClass('on');
        },

        /**
        * 检查第 n 步是否能通过。
        * 如果不能通过，请显式地返回 false。
        */
        check: function check(step) {
            //这里不需要检查第二步，因为它是单选和复选的，肯定有数据。
            switch (step) {
                case 1:
                    var form = Form.get();
                    return !!form;

                case 2:
                    var mode = Mode.get();
                    return !!mode;
            }
        },

        /**
        * 获取用于提交给后台的数据。
        */
        get: function get() {

            var data = {};

            var modules = [Form, Mode, Money, Set, Subject, Period];

            //依次去获取对应的值，如果有非法的，则提前返回。
            var M = modules.find(function (M) {
                var item = M.get();
                if (!item) {
                    return true;
                }

                Object.assign(data, item);
            });

            //M 非空，说明它返回的值就是非法的。
            return M ? null : data;
        }
    };
});