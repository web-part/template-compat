
/**
* 
*/
KISP.panel('/Reset/Footer', function (require, module, panel) {



    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="login"]': function (event) {
                event.preventDefault();
               
                panel.fire('login', []);
            },
        });
    });



    /**
    * 
    *
    */
    panel.on('render', function () {


       


    });



    return {
      
    };




});