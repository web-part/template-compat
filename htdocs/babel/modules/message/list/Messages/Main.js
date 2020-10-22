/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 511A857283455742F23402C4AD5C609F
*
* source file: htdocs/modules/message/list/Messages/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Messages/Main', function (require, module, panel) {
    var API = module.require('API');
    var Detail = module.require('Detail');

    panel.on('init', function () {

        API.on('success', {
            'get': function get(data, item) {
                Detail.render(data);

                panel.$.removeClass('empty');
                panel.fire('read', [item]);
            }
        });
    });

    panel.on('render', function (item) {

        panel.$.addClass('empty');

        if (item) {
            API.get(item);
        }
    });

    return {};
});