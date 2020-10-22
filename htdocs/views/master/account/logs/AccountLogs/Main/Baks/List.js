﻿

KISP.panel('/AccountLogs/Main/Baks/List', function (require, module, panel) {
    
    

    var list = [];



    panel.on('init', function () {
        panel.template({
            '': function (data) {
                var table = this.fill('table', data);

                return {
                    'table': table,
                };
            },

            'table': {
                '': function (data) {
                    var rows = this.fill('row', data.items);

                    return {
                        'rows': rows,
                    };
                },

                'row': function (item, index) {

                    return Object.assign({}, item, {
                        'index': index,

                    });

                },
            },
        });
    });


 


    /**
    */
    panel.on('render', function (items) {

        list = items;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);

    });

   


});