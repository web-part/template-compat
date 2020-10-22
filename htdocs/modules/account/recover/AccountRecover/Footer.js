
/*
* 恢复账套对话框。
*/
KISP.panel('/AccountRecover/Footer', function (require, module, panel) {
   
    // var API = module.require('API');

   
    panel.on('init', function () {
        // API.on('success', {
           
        // });
        panel.$.on('click', '[data-cmd]', function () { 
            var cmd = this.getAttribute('data-cmd');
            panel.fire(cmd);
        })

    });


    
    panel.on('render', function (data) {
       
        


    });



});





