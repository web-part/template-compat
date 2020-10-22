
/**
* 
*/
KISP.panel('/AccountCreate/Type1/Content/Period/Year/List', function (require, module, panel) {

    


    var list = [];

    var meta = {
        index: 0,
        $el: null,
    };


   
    panel.set('show', false);



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        
        //今年。
        var current = new Date().getFullYear();

        for (var value = 1970; value <= 2050; value++) {

            list.push({
                'value': value,
            });

            if (value == current) {
                meta.index = list.length - 1;
            }
        }



        panel.$.on('click', 'li', function (event) {
            var index = +this.getAttribute('data-index');
            var item = list[index];

            meta.$el = $(this);
            panel.$.find('li').removeClass('on');
            meta.$el.addClass('on');

            //让视觉上有个选中的效果。
            setTimeout(function () {
                panel.fire('change', [item]);
            }, 100);
          

        });

    });


    panel.on('render', function () {
        panel.fill(list, function (item, index) {
            return {
                'index': index,
                'value': item.value,
            };
        });

        var el = '[data-index="' + meta.index + '"]';
        var $el = panel.$.find(el);

        $el.click();
    });



    panel.on('show', function () {
       
        meta.$el.get(0).scrollIntoViewIfNeeded();
        panel.fire('show');
    });





});






