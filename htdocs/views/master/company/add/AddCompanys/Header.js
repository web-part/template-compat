

KISP.panel('/AddCompanys/Header', function (require, module, panel) {

    var KISP = require('KISP');


    var API = module.require('API');

    panel.on('init', function () {


        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },
            '[data-type="search"]': function () {
                var keyword = panel.$.find('[data-type="txt"]').val();
                panel.fire('search', [keyword]);
            }
        });

        panel.$.find('[data-type="txt"]').on({
            'keypress': function () {
                if (event.keyCode === 13) {
                    var keyword = panel.$.find('[data-type="txt"]').val();
                    panel.fire('search', [keyword]);
                }
            }
        });

        API.on({
            'success': function () {
                panel.fire('add-success');
            }
        })

    });



    panel.on('render', function () {

    });

    return {
        'postData': function (list) {
            if (!list.length) {
                return KISP.alert('请至少选择一项。');
            }
            API.post(list);
        }
    };


});


