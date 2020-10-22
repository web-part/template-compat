
/**
* 核算方式。
*/
KISP.panel('/AccountCreate/Type1/Content/Types/List', function (require, module, panel) {

    

    var list = [];

    var origins = [
        //使用分仓核算 默认值 1。（总仓0，分仓1）
        {
            key: 'muti_stock_calculate',
            checked: true,
            title: '使用分仓核算',
            desc: [
                '选定则每个仓库独立核算成本，不选，则所有仓库的相同货品成本相同。',
                '<span class="warning">（建账后不可修改）<span>',
            ],
        },

        //允许负库存出库 默认值 0。 (0，不允许；1，允许)
        {
            key: 'under_stock_out',
            checked: false,
            title: '允许负库存出库',
            desc: '选择此选项后，业务处理中录入销售单或出库类单据时，如果某个商品没有库存数量，仍然允许单据保存和审核。',
        },

        //允许负库存结账 默认值 1。（0，不允许；1，允许）
        {
            key: 'under_stock_close',
            checked: true,
            title: '允许负库存结账',
            desc: '某个库存商品期末的库存数量和金额出现负数时，用户依然可以进行期末结账处理。',
        },
    ];




    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
       
        panel.$on('click', {
            '[data-index]': function (event) {
                var index = +this.getAttribute('data-index');
                var item = list[index];
                var checked = item.checked = !item.checked;

                $(this).toggleClass('on', checked);
            },
        });
      
    });


    panel.on('render', function () {
        
        //每次都恢复到默认值，避免受从上次的现场开始。
        list = JSON.stringify(origins);
        list = JSON.parse(list);


        panel.fill(list, function (item, index) {

            var desc = item.desc;

            if (Array.isArray(desc)) {
                desc = desc.join('<br />');
            }

            return {
                'index': index,
                'title': item.title,
                'desc': desc,
                'checked': item.checked ? 'on' : '',
            };
        });
    });





    return {
        get: function () {

            var items = list.map(function (item) {
                return {
                    'key': item.key,
                    'value': item.checked ? 1 : 0,
                };
            });

            return items;
        },
    };

 

});






