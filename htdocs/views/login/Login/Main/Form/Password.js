
/**
* 密码。
*/
KISP.panel('/Login/Main/Form/Password', function (require, module, panel) {
    var KISP = require('KISP');

    var toast = null;


    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            //这里不要用 mask，免得影响注册页面。 
            //因为从登录页跳到注册页，会触发登录页的失焦，从而触发本 toast 的显示。
            //而本 toast 的这个 mask 延迟消失，会导致短时间内注册页无法点击。
            mask: false,
            icon: 'close',
            container: `[data-panel="${module.parent.id}"]`,
        });
        
    });



    panel.on('render', function (value) {
        value = value || '';

        panel.fill({
            'value': value,
        });

        panel.fire('blur', [value]);
    });




    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;


            return value ? value : function () {
                toast.show('密码必填', function () {
                    txt.focus();
                });
            };
        },

    };

   



});