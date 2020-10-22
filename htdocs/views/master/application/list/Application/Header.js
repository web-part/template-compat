
/*
* 
*/
KISP.panel('/Application/Header', function (require, module, panel) {
    
    var User = require('User');


    panel.on('init', function () {



        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.$.find('[data-type="add-bar"]').removeClass('on');
                panel.fire(cmd);
            },
        });




    });


    panel.on('render', function (data) {
        panel.fill({
            'company': data.company.name,
            'product': data.product.name,
        });


    });
    return {
        setList: function (list) {
            var userInfo = User.get();
            if (userInfo) {
                panel.$.find('[data-type="add-bar"]').addClass('on');
                return;
            }
            panel.$.find('[data-type="add-bar"]').removeClass('on');
        }
    }

});





