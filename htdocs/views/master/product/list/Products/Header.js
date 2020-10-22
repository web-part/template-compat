
/*
* 
*/
KISP.panel('/Products/Header', function (require, module, panel) {
    
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


    panel.on('render', function (company) {

        panel.fill({
            'company': company.name,
        });


    });


    return {
        setList: function (list) {
            var userInfo = User.get();

            panel.$.find('[data-type="add-bar"]').toggleClass('on', !!userInfo);
        
        }
    }

});





