

KISP.panel('/Products/Delete/Content', function (require, module, panel) {

    panel.on('init', function () {
       
      
    });



    panel.on('render', function (product) {
        
        panel.fill({
            'name': product.name,
        });

    });

});






