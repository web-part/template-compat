
/*
* 
*/
KISP.panel('/Companys/Main', function (require, module, panel) {
    var KISP = require('KISP');

    var API = module.require('API');
    var List = module.require('List');

    var User = require('User');

    panel.on('init', function () {

        List.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
            'auth': function (item) {
                panel.fire('auth', [item]);
            },
            'delete': function (item) {
              
                KISP.confirm('确认要删除当前企业吗？删除后我的企业界面将不显示该企业信息，如要再次显示需重新添加',function () { 
                    API.delete(item);
                })
            }


        });

        API.on({
            'success': function (list) {
                if (!list.length) {
                    panel.fire('no-company');            //无添加企业则跳转到添加企业
                    return;
                }
                List.render(list);

                panel.$.toggleClass('no-company', list.length == 0);

            },
            'delete-success': function () {
                API.get();
            }

        });



        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.$.find('[data-type="company-list"]').removeClass('on');
                panel.fire(cmd);
            },
        });

    });


    panel.on('render', function () {
        API.get();
        var userInfo = User.get();
        if (userInfo) {
            panel.$.find('[data-type="register"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="register"]').removeClass('on');

    });



});





