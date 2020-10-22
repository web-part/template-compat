/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 589F7E76D0535AB6773D5A8882B37E89
*
* source file: htdocs/views/master/company/auth/Auth/Main/base/Base/Company.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 企业名称。
*/
KISP.panel('/Auth/Main/Base/Company', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');
    var API = module.require('API');
    var List = module.require('List');

    var toast = null;

    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150
        });

        panel.$on('blur', {
            'input': function input() {

                List.hide();
            }

        });
        panel.$on('input', {
            'input': function input() {
                var value = this.value;
                API.get(value);
            }

        });
        List.on({
            'chosed': function chosed(item) {
                panel.$.find('input').val(item.companyName);
                panel.fire('set-code', [item.creditCode]);
                List.hide();
            }
        });
        API.on({
            'success': function success(list) {
                List.render(list);
            }
        });
    });

    panel.on('render', function (company) {
        panel.$.find('input').val(company.origin['name']);
    });

    return {
        get: function get() {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (value) {
                return value;
            }

            return function () {
                toast.show('请填写企业名称');
                txt.focus();

                Flash.start(panel.$, 'warning');
            };
        }
    };
});