
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
            width: 150,
        });

        panel.$on('blur', {
            'input': function () {
               
                List.hide();
            },

        });
        panel.$on('input', {
            'input': function () {
                var value = this.value;
                API.get(value);
            },

        });
        List.on({
            'chosed': function (item) {
                panel.$.find('input').val(item.companyName);
                panel.fire('set-code', [item.creditCode]);
                List.hide();
            },
        });
        API.on({
            'success': function (list) {
                List.render(list);
            }
        })



    });

    panel.on('render', function (company) {
        panel.$.find('input').val(company.origin['name']);

    });


    return {
        get: function () {
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
        },
    };


});





