
/**
* 验证码。
*/
KISP.panel('/Signup/Form/Code', function (require, module, panel) {
    var KISP = require('KISP');
    
    var meta = {
        counting: false, //是否正在倒计时。
    };

    var regexp = /^\d{6}$/;


    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });


        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

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

        panel.$on('click', {
            '[data-cmd="send"]': function (event) {
                event.preventDefault();
                panel.$.find('input').val(''); //清空上次留下的。
                panel.fire('send');
            },
        });

        panel.$on('input', {
            'input': function (event) {
                var value = this.value;
                var valid = regexp.test(value);
                panel.fire('change', [valid, value]);
            },
        });
    });




    panel.on('render', function () {

        panel.fill({}); //清空上次留下的。

    });





    return {
        enable: function (valid) {
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
        countdown: function (count) {
            var $btn = panel.$.find('[data-cmd="send"]');
            var $code = panel.$.find('input');
            var html = $btn.html();

            var tid = setInterval(function () {
                count--;
                setHtml();

                //倒计时归零。
                if (count <= 0) {
                    disabled = false;
                    $btn.attr('disabled', false);   //发送按钮可用。
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
            $btn.attr('disabled', true);    //发送按钮禁用。
            $code.attr('disabled', false);  //输入框启用。
            disabled = true;
            setHtml();
        },
    };


});