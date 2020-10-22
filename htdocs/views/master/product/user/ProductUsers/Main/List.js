

KISP.panel('/ProductUsers/Main/List', function (require, module, panel) {
    

    var list = [];

    var meta = {
        keyword: '',
    };


    panel.on('init', function () {

        function highlight(value) {
            var keyword = meta.keyword;

            if (!keyword || !value) {
                return value;
            }

            value = value.split(keyword).join(`<span class="keyword">${keyword}</span>`);
            return value;
        }


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
                  

                    return {
                        'index': index,
                        'phone': highlight(item.phone),
                        'name': highlight(item.name),
                        'account': highlight(item.account),
                        'product': highlight(item.product),
                    };

                },
            },
        });
    });


    panel.on('init', function () {

       

        panel.$on('click', {
            '[data-cmd]': function () {
                var index = +this.getAttribute('data-index');
                var cmd = this.getAttribute('data-cmd');
                var item = list[index];

                panel.fire('cmd', cmd,  [item]);

            },

        });

    });



    /**
    *   items = [
    *       {},
    *   ];
    */
    panel.on('render', function (items, keyword) {

        list = items;
        meta.keyword = keyword || '';

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);

       

    });


    return {
        
    };




});