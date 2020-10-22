

KISP.panel('/Products/Trial/Content', function (require, module, panel) {

    var status$text = {
        '0': '未认证',
        '3': '未通过审核（认证失败）',
    };


    panel.on('init', function () {
       
      
    });



    panel.on('render', function (status) {

        var text = status$text[status];

        panel.fill({
            'text': text,
        });

    });



});






