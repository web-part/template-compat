
/*
* 
*/
KISP.panel('/Messages/Main/Detail', function (require, module, panel) {
  




    panel.on('init', function () {

      
    });



    panel.on('render', function (data) {

        panel.fill({
            'title': data.title,
            'content': data.content,
            'team': data.team,
            'time': data.time,
        });

        panel.$.toggleClass('personal', data.type == 2); //type 为 2 的，表示个人消息，隐藏一些字段。

    });


    return {

    };

});



