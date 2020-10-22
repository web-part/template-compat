/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 2001EAC92008C8FFCA2F4103D8EED5A5
*
* source file: htdocs/modules/update/list/Updates/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Updates/List', function (require, module, panel) {
    var KISP = require('KISP');

    var list = [];

    panel.on('init', function () {

        panel.template(function (item, index) {
            return {
                'index': index,
                'title': item.title,
                'version': item.version,
                'subTitle': item.subTitle,
                'time': item.time,
                'desc': item.desc,
                'url': item.url,
                'cover': item.cover
            };
        });

        panel.$on('click', {
            'li[data-index]': function liDataIndex(event) {
                var index = +this.getAttribute('data-index');
                var item = list[index];

                panel.fire('item', [item]);
            }
        });
    });

    panel.on('render', function (items) {
        list = items;

        panel.fill(list);
    });

    return {};
});