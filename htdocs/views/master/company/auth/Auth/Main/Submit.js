
/**
* 
*/
KISP.panel('/Auth/Main/Submit', function (require, module, panel) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');





    panel.on('init', function () {
        
        panel.$on('click', {
            '[data-cmd]': function (event) {
                //分两步触发事件。
                //首先触发统一的 click 事件，让外面进行预处理，接收到外面传来的 list。
                //然后再触发具体的 save 或 submit 事件，并且把 list 传过去。
                //因为 save 和 submit 都需要 list，所以预处理获取 list 的逻辑是公共的。
                //这种写法更优美些。
                var cmd = this.getAttribute('data-cmd');
                var values = panel.fire('click');
                var list = values[0];

                event.preventDefault();
                panel.fire(cmd, [list]);
                

            },
        });
    });




    panel.on('render', function () {



    });



});