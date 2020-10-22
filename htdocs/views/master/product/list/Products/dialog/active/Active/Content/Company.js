
/*
* 激活产品对话框。
*/
KISP.panel('/Products/Active/Content/Company', function (require, module, panel) {

    panel.on('init', function () {

        var status$text = {
            '0': '未认证',
            '1': '审核中',
            '2': '已认证',
            '3':'认证失败',
        };


        panel.template({
            '': function (data) {
                var status = data['org_status'];

                return {
                    'company': data.name,
                    'status': status$text[status] || '(未知状态)',
                };
            },
        });


       
    });

    panel.on('render', function (data) {
       
        panel.fill(data);

    });



});





