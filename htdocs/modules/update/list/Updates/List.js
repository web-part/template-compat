
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
                'cover': item.cover,
            };
        });

        panel.$on('click', {
            'li[data-index]': function (event) {
                var index = +this.getAttribute('data-index');
                var item = list[index];

                panel.fire('item', [item]);
            },
        });
    });

   



    panel.on('render', function (items) {
        list = items;

        panel.fill(list);

    });


    return {
        
    };


});



