/*
* babel time: 2020-10-19 16:41:38
*
* source md5: D8E03B6B2B868BCAD21B39F2C340A0F2
*
* source file: htdocs/views/master/product/list/Products/dialog/buy/Buy/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Buy/Content', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="verify"]': function dataCmdVerify() {
                var value = panel.$.find('input').val();

                if (!value) {
                    KISP.alert('请输入服务商编码。');
                    return;
                }

                panel.fire('verify', [value]);
            }
        });

        panel.$bind('input', {
            'input': function input() {

                panel.$.find('[data-id="name"]').hide();
            },

            //开始时设置为只读可以避开浏览器默认的自动填充功能。
            //点击后才设置成可输入状态。
            'click': function click() {
                if (this.readOnly) {
                    this.readOnly = false;
                }
            },
            'blur': function blur() {
                this.value = this.value.split(' ').join(''); //去掉空格。
                this.readOnly = true;
            }
        });
    });

    panel.on('render', function (data) {
        data = data || {};

        //清空上次可能留下的内容。
        panel.fill({
            'value': data.value || '',
            'name': data.name || '',
            'name-display': data.name ? '' : 'display: none;'
        });
    });

    return {
        get: function get() {
            var value = panel.$.find('input').val();

            return value || '';
        }
    };
});