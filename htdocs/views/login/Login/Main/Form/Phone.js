
/**
* 密码。
*/
KISP.panel('/Login/Main/Form/Phone', function (require, module, panel) {
    var KISP = require('KISP');


    var toast = null;


    panel.on('init', function () {

        panel.template().fix('readonly');

        toast = KISP.create('Toast', {
            container: `[data-panel="${module.parent.id}"]`,
            duration: 1500,
            //这里不要用 mask，免得影响注册页面。 
            //因为从登录页跳到注册页，会触发登录页的失焦，从而触发本 toast 的显示。
            //而本 toast 的这个 mask 延迟消失，会导致短时间内注册页无法点击。
            mask: false,
            icon: 'close',
        });


        panel.$bind('input', {
            'blur': function () {
                var regexp = /^1\d{10}$/;
                var txt = this;
                var value = txt.value;

                if (!value || regexp.test(value)) {
                    panel.fire('blur', [value]);
                    return;
                }
                
                toast.show('手机号非法', function () {
                    txt.value = '';
                    txt.focus();
                });
            },
        });

        
    });




    panel.on('render', function (value, readonly) {
        value = value || '';

        panel.fill({
            'value': value,
            'readonly': readonly ? 'readonly' : '',
            'title': value ? '预设手机号，不允许修改。' : '',
        });

        panel.fire('blur', [value]);
    });




    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            return value ? value : function () {
                toast.show('手机号必填', function () {
                    txt.focus();
                });
            };
        },

    };

   



});