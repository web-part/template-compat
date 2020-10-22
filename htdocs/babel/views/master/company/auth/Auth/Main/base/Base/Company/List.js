/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 3B071F197D9979940367C34B4CE09E41
*
* source file: htdocs/views/master/company/auth/Auth/Main/base/Base/Company/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 企业名称。
*/
KISP.panel('/Auth/Main/Base/Company/List', function (require, module, panel) {

    var toast = null;

    var list = [];

    panel.on('init', function () {
        panel.template({
            '': function _(data, index) {
                return {
                    'index': index,
                    'companyName': data.companyName
                };
            }
        });

        panel.$on('mousedown', { //解决与input blur事件冲突
            '[data-index]': function dataIndex(e) {
                var index = +this.getAttribute('data-index');
                panel.fire('chosed', [list[index]]);
            }

        });
    });

    panel.on('render', function (data) {
        list = data;
        panel.fill(list);
    });

    return {
        hide: function hide() {
            panel.hide();
        }
    };
});