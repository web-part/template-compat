/*
* babel time: 2020-10-19 16:41:38
*
* source md5: C5872D77F4EF0461BF6AFB1BD1116CEE
*
* source file: htdocs/views/master/product/list/Products/Main/News.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Main/News', function (require, module, panel) {

    /**
    *
    */
    panel.on('init', function () {});

    /**
    *
    */
    panel.on('render', function (list) {
        var hasInfo = false;
        var num = 0;
        var msgs = list.map(function (item, index) {
            var msg = item.warnMsg;

            if (msg) {
                num++;
                hasInfo = true;
            }

            return msg ? num + '\u3001' + msg : ''; //加上序号。
        });

        var text = hasInfo ? msgs.join('<span></span>') : '暂无相关信息提示';

        panel.$.find('marquee').html(text);
        panel.$.toggleClass('hide', !text);
    });
});