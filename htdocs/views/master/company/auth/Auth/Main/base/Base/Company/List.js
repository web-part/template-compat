
/*
* 企业名称。
*/
KISP.panel('/Auth/Main/Base/Company/List', function (require, module, panel) {
    

    var toast = null;

    var list = [];

    panel.on('init', function () {
        panel.template({
            '': function (data, index) {
                return {
                    'index': index,
                    'companyName': data.companyName,
                }
            }
        });


        panel.$on('mousedown', {  //解决与input blur事件冲突
            '[data-index]': function (e) {
                var index = +this.getAttribute('data-index');
                panel.fire('chosed', [list[index]]);
            },

        });




    });

    panel.on('render', function (data) {
        list = data;
        panel.fill(list);
    });


    return {
        hide: function () { 
            panel.hide();
        }
    };


});





