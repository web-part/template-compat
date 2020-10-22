
/**
* 科目体系。
*/
KISP.panel('/AccountCreate/Type1/Content/Subject', function (require, module, panel) {

    
    var List = module.require('List');

    var index$href = {
        '0': '105',
        '1': '106',
        '2': '107',
        '3': '108',
    }

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        List.on({
            'select-item': function (index) {
                panel.$.find('[data-cmd="subject-href"] a')[0].href = `http://kisdep.kingdee.com:8181/docs/show/${index$href[index]}`;
            }
        })
    });



    panel.on('render', function () {
        List.render();
    });





    return {
        get: function () {
            var item = List.get();

            return {
                'acct_type': item.value,
            };
        },
    };



});






