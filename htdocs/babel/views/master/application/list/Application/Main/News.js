/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 0E42F9D5B7F9F7A2F4E156C3EED3CB8C
*
* source file: htdocs/views/master/application/list/Application/Main/News.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Main/News', function (require, module, panel) {

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