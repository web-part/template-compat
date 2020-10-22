/*
* babel time: 2020-10-19 16:42:32
*
* source md5: EFB4143C9DDF1D012D32933E22F7EE98
*
* source file: htdocs/modules/update/list/Updates/More.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Updates/More', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {

        panel.set('show', false); //不要自动显示。

        panel.$on('click', {
            'button': function button(event) {
                panel.fire('submit');
            }
        });
    });

    panel.on('render', function (page) {
        var count = Math.ceil(page.total / page.size); //总页数。
        var isLastPage = count == page.no; //是否为最后一页。


        panel.toggle(!isLastPage); //非最后一页时可见。 即最后一页时，隐藏 `加载更多`。

    });

    return {};
});