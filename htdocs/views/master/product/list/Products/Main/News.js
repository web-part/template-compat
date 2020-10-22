

KISP.panel('/Products/Main/News', function (require, module, panel) {

    /**
    *
    */
    panel.on('init', function () {
     
    });


    /**
    *
    */
    panel.on('render', function (list) {
        var hasInfo = false;
        var num = 0;
        var msgs = list.map(function (item, index) {
            var msg = item.warnMsg;

            if (msg) {
                num ++;
                hasInfo = true;
            }

            return msg ? `${num}、${msg}` : ''; //加上序号。
        });


        var text = hasInfo ? msgs.join('<span></span>') : '暂无相关信息提示';

        panel.$.find('marquee').html(text);
        panel.$.toggleClass('hide', !text);


    });




});