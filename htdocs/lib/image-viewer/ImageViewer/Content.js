

KISP.panel('ImageViewer/Content', function (require, module, panel) {

    var KISP = require('KISP');

    var img = null;
    var step = 50;
    var width = 0;



    panel.on('init', function () {

        panel.$.on('mousewheel', function (event) {

            if (!img) {
                img = panel.$.find('img').get(0);
                width = img.width;
            }

            var isUp = event.originalEvent.deltaY < 0;
            var dw = isUp ? step : -step;

            width += dw;
            width = Math.max(width, 100);
            img.width = width;
          

            panel.fire('resize', [width]);


        });
    });



    panel.on('render', function (src) {

        img = null;
        width = 0;
        
        panel.fill({
            'src': src,
        });

    });




  

});






