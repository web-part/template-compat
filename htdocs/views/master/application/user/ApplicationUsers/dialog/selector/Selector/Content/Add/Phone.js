

KISP.panel('/ApplicationUsers/Selector/Content/Add/Phone', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');


    var regexp = /^1\d{10}$/;
    var toast = null;

    var meta = {
        value: '', //记录上一次的值，用于对比。
    };

    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });

        panel.$.on('blur', function () {
            var txt = this;
            var value = txt.value;

            if (!value) {
                return;
            }


            if (!regexp.test(value)) {
                toast.show('手机号非法', function () {
                    txt.focus();
                });

                return;
            }


        });

        panel.$.on('change', function () {
            var txt = this;
            var value = txt.value;

            if (!value) {
                meta.value = value;
                panel.fire('empty', [value]);
                return;
            }


            var valid = regexp.test(value);
     
            if (valid && value != meta.value) {
                meta.value = value;
                panel.fire('change', [value]);
            }
        });
    });





  
    panel.on('render', function () {
        meta.value = '';
        panel.$.val('');
    });



    return {
        get: function () {
            var txt = panel.$.get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('手机号必填', function () {
                        txt.focus();
                    });
                };
            }

            if (!regexp.test(value)) {
                return function () {
                    toast.show('手机号非法', function () {
                        txt.focus();
                        txt.select();
                    });
                };
            }

            return value;

        },
        /**
        * 检查当前手机号是否已存在于云之家列表或账套列表中。
        * 如果已存在，则返回 true。
        *   opt = {
        *       users: [],      //云之家用户列表中的记录。
        *       applications: [],   //已存在的应用用户列表。
        *   };
        */
        checkExist: function (opt) {
            var txt = panel.$.get(0);
            var phone = txt.value;


            if (find(opt.users)) {
                return show('云之家');
            }

            if (find(opt.applications)) {
                return show('账套');
            }


            function find(list) {
                return list.find(function (item) {
                    return item.phone == phone;
                });
            }

            function show(type) {
                var msg =
                    type + '用户列表中已存在该手机号:' +
                    '<div style="color: red; margin: 10px 0px;">' + phone + '</div>';

                KISP.alert(msg, function () {
                    txt.focus();
                    txt.select();
                });

                return true;
            }
        },
    };


});