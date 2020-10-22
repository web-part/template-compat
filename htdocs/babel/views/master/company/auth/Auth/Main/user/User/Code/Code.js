/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 7D605527E3849C49711C18BC8F2452E7
*
* source file: htdocs/views/master/company/auth/Auth/Main/user/User/Code/Code.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 手机验证码。
*/
KISP.panel('/Auth/Main/User/Code/Code', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');
    var API = module.require('API');

    var meta = {
        counting: false //是否正在倒计时。
    };

    var toast = null;
    var regexp = /^\d{6}$/;

    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close'
        });

        panel.$on('blur', {
            'input': function input() {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    return;
                }

                if (!regexp.test(value)) {
                    toast.show('验证码非法');
                    Flash.start(panel.$, 'warning');
                    return;
                }
            }
        });

        panel.$on('click', {
            '[data-cmd="send"]': function dataCmdSend(event) {
                event.preventDefault();
                panel.$.find('input').val(''); //清空上次留下的。
                panel.fire('send');
            }
        });
    });

    panel.on('render', function () {
        meta = {
            counting: false //是否正在倒计时。
        };

        panel.fill({}); //清空上次留下的。
    });

    return {
        enable: function enable(valid) {
            //正在倒计时，不允许外部修改状态。
            if (meta.counting) {
                return;
            }
            panel.$.find('[data-cmd="send"]').attr('disabled', !valid);
        },

        /**
        * 倒计时。
        * 在发送短信验证码成功后，禁用发送按钮。 
        * 同时开始倒计时，归零后启用发送按钮。
        */
        countdown: function countdown(count) {
            var $btn = panel.$.find('[data-cmd="send"]');
            var $code = panel.$.find('input');
            var html = $btn.html();

            var tid = setInterval(function () {
                count--;
                setHtml();

                //倒计时归零。
                if (count <= 0) {
                    disabled = false;
                    $btn.attr('disabled', false); //发送按钮可用。
                    $btn.html(html);
                    clearInterval(tid);
                    meta.counting = false;
                }
            }, 1000);

            function setHtml() {
                var text = '等待 ' + count + 's';
                $btn.html(text);
            }

            meta.counting = true;
            $btn.attr('disabled', true); //发送按钮禁用。
            $code.attr('disabled', false); //输入框启用。
            disabled = true;
            setHtml();
        },

        get: function get() {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('请填写验证码');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (!regexp.test(value)) {
                return function () {
                    toast.show('验证码非法');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            return value;
        }
    };
});