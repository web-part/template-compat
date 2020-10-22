

KISP.panel('/Accounts/Confirm/Content', function (require, module, panel) {


    panel.on('init', function () {


    });



    panel.on('render', function (data) {
        var bind$describe = {
            0: `你确认删除账套【${data.name}】吗`,
            1: '该账套已绑定纷享销客，删除账套将终止与纷享销客的同步服务，不允许再次绑定，请慎重操作！'
        };
        panel.fill({
            'describe': bind$describe[data.is_bind],
        });

    });



});






