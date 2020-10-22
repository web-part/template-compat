

KISP.panel('/Products/Buy/Footer', function (require, module, panel) {


    panel.on('init', function () {
       
      

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.dataset['cmd'];

                panel.fire(cmd);
            },
        });
    });



    panel.on('render', function () {

    });


});





