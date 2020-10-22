﻿

KISP.panel('/Accounts/Delete/Content', function (require, module, panel) {

    var KISP = require('KISP');
    var disabled = false;
   

    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });

        panel.$on('click', {
            '[data-cmd="send"]': function () {
                if (disabled) {
                    return;
                }

                panel.fire('send');
            },
        });

        panel.$on('blur', {
            '[name="code"]': function () {
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
            },
        });
      
    });



    panel.on('render', function (data) {
        
        data = data || {};
        disabled = false;

        panel.fill({
            'phone': data.phone || '',
            'code': '',
        });
      
    });


    return {

        get: function () {
            var $code = panel.$.find('[name="code"]');
            var code = $code.val();

            if (!code) {
                KISP.alert('请输入验证码', function () {
                    $code.focus();
                });
                return;
            }

            return {
                'code': code,
            };
        },


        /**
        * 倒计时。
        * 在发送短信验证码成功后，禁用发送按钮。 
        * 同时开始倒计时，归零后启用发送按钮。
        */
        countdown: function () {
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

        empty: function () {
            var $code = panel.$.find('[name="code"]');
            $code.val('');
        },


    };
});





