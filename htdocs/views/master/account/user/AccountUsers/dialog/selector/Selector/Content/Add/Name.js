

KISP.panel('/AccountUsers/Selector/Content/Add/Name', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');


    var toast = null;



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


            var invalid =
               value.includes('"') ||
               value.includes("'") ||
               value.includes('=') ||
               value.includes(' ') ||
               value.includes('--');

            if (invalid) {
                toast.show('姓名不能包含特殊字符', function () {
                    txt.focus();
                });
                return;

            }



        });
    });





  
    panel.on('render', function (value) {
        value = value || '';
        var title = value ? '该手机号已注册云之家用户，无法重复填写姓名' : '';

        panel.$.val(value);
        panel.$.attr('readonly', !!value);
        panel.$.attr('title', title);


        
    });



    return {
        get: function () {
            var txt = panel.$.get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('姓名必填', function () {
                        txt.focus();
                    });
                };
            }

            var invalid =
              value.includes('"') ||
              value.includes("'") ||
              value.includes('=') ||
              value.includes(' ') ||
              value.includes('--');


            if (invalid) {
                return function () {
                    toast.show('姓名不能包含特殊字符', function () {
                        txt.focus();
                        txt.select();
                    });
                };
            }


            return value;

        },
    };


});