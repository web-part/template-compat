

KISP.panel('/AccountUsers/Selector/Content/Add', function (require, module, panel) {
    var API = module.require('API');
    var Phone = module.require('Phone');
    var Name = module.require('Name');
    var User = require('User');


    var meta = {
        company: null,  //企业信息。
        users: [],      //云之家用户列表中的记录。
        accounts: [],   //已存在的账套用户列表。
    };



    panel.on('init', function () {

        Phone.on({
            'change': function (phone) {

                var existed = Phone.checkExist(meta);
                if (existed) {
                    return;
                }
                API.get(phone);
            },
            'empty': function () {
                Name.render();
            },
        });

        panel.$.on('click', '[data-type="add"]', function () {
            panel.$.addClass('show');
            panel.$.find('[data-type="add"]').removeClass('on');
        });

        panel.$.on('click', '[data-cmd="return"]', function () {
            panel.$.removeClass('show');
        });

        panel.$.on('click', '[data-cmd="add"]', function () {
            var phone = Phone.get();
            var name = Name.get();

            var fn = [phone, name].find(function (item) {
                return typeof item == 'function';
            });

            if (fn) {
                fn();
                return;
            }

            var existed = Phone.checkExist(meta);

            if (existed) {
                return;
            }

            panel.$.removeClass('show');

            API.post({
                'companyId': meta.company.origin['tid'],
                'phone': phone,
                'name': name,
            });

        });





        API.on('success', {
            'get': function (user) {
                Name.render(user.name);
            },

            'post': function (item) {
                Phone.render();
                Name.render();

                panel.fire('ok', [item]);
            },
        });


    });





    /**
    *   data = {
    *       company: {},        //企业信息。
    *       users: [],          //云之家用户列表中的记录。
    *       accounts: [],       //已存在的账套用户列表。
    *   };
    */
    panel.on('render', function (data) {

        meta = data;

        Phone.render();
        Name.render();
        var userInfo = User.get();
        // && !meta.users.length
        if (userInfo) {
            // panel.$.find('[data-type="phone"]').addClass('on');
            panel.$.find('[data-type="add"]').addClass('on');
            return;
        }
        // panel.$.find('[data-type="phone"]').removeClass('on');
        panel.$.find('[data-type="add"]').removeClass('on');

    });




});