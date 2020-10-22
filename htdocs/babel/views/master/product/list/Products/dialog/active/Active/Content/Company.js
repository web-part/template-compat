/*
* babel time: 2020-10-19 16:41:38
*
* source md5: BE3F334DD18F17CD5D99B2CA49F831A2
*
* source file: htdocs/views/master/product/list/Products/dialog/active/Active/Content/Company.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 激活产品对话框。
*/
KISP.panel('/Products/Active/Content/Company', function (require, module, panel) {

    panel.on('init', function () {

        var status$text = {
            '0': '未认证',
            '1': '审核中',
            '2': '已认证',
            '3': '认证失败'
        };

        panel.template({
            '': function _(data) {
                var status = data['org_status'];

                return {
                    'company': data.name,
                    'status': status$text[status] || '(未知状态)'
                };
            }
        });
    });

    panel.on('render', function (data) {

        panel.fill(data);
    });
});