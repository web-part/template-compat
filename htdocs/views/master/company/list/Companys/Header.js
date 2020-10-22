
/*
* 
*/
KISP.panel('/Companys/Header', function (require, module, panel) {
    


    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },
        });



    });


    panel.on('render', function () {
    });



});





