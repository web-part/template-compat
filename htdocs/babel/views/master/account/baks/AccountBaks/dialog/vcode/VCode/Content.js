/*
* babel time: 2020-10-19 16:41:37
*
* source md5: E6A6880FB92B153B272964432B455FE9
*
* source file: htdocs/views/master/account/baks/AccountBaks/dialog/vcode/VCode/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountBaks/VCode/Content', function (require, module, panel) {

    var KISP = require('KISP');
    var disabled = false;

    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close'
        });

        panel.$on('click', {
            '[data-cmd="send"]': function dataCmdSend() {
                if (disabled) {
                    return;
                }

                panel.fire('send');
            }
        });

        panel.$on('blur', {
            '[name="code"]': function nameCode() {
                var txt = this;
                var value = txt.value;
                var regexp = /^\d{4}$/;

                if (!value) {
                    return;
                }

                if (regexp.test(value)) {
                    return;
                }

                toast.show('验证码非法', function () {
                    txt.value = '';
                    txt.focus();
                });
            }
        });
    });

    /**
    * 已重载 render(action);   //传入一个字符串。
    * 已重载 render(data);     //传入一个对象。
    *
    * 参数：
    *   data = {
    *       action: '', //必选，动作类型的描述文本，如 `删除` 或 `下载`。
    *       phone: '',  //可选，要填充的手机号。
    *   };
    */
    panel.on('render', function (data) {
        //重载 render(action);
        if (typeof data == 'string') {
            data = { 'action': data };
        }

        disabled = false;

        panel.fill({
            'action': data.action,
            'phone': data.phone || '',

            'code': ''
        });
    });

    return {

        /**
        * 设置手机号。
        */
        set: function set(phone) {
            panel.$.find('input[name="phone"]').val(phone);
        },

        get: function get() {
            var $code = panel.$.find('[name="code"]');
            var code = $code.val();

            if (!code) {
                KISP.alert('请输入验证码', function () {
                    $code.focus();
                });
                return;
            }

            return {
                'code': code
            };
        },

        /**
        * 倒计时。
        * 在发送短信验证码成功后，禁用发送按钮。 
        * 同时开始倒计时，归零后启用发送按钮。
        */
        countdown: function countdown() {
            var count = 60;
            var $btn = panel.$.find('[data-cmd="send"]');
            var $code = panel.$.find('[name="code"]');

            var html = $btn.html();

            var tid = setInterval(function () {
                count--;
                setHtml();

                if (count <= 0) {
                    disabled = false;
                    $btn.removeClass('disabled');
                    $btn.html(html);
                    clearInterval(tid);
                }
            }, 1000);

            function setHtml() {
                var text = '等待 ' + count + 's';
                $btn.html(text);
            }

            $code.attr('disabled', false);
            disabled = true;
            setHtml();
            $btn.addClass('disabled');
        },

        empty: function empty() {
            var $code = panel.$.find('[name="code"]');
            $code.val('');
        }

    };
});