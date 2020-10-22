

KISP.panel('/Login/Main/Form/Footer', function (require, module, panel) {
    var KISP = require('KISP');



    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd]': function (event) {
                var cmd = this.dataset['cmd'];

                event.preventDefault();

                panel.fire(cmd);

            },
        });

    });




    panel.on('render', function (third) {
        var type = third ? third.type : 0;
        var hide = type == 5 || type == 6;  //这两种类型的，隐藏注册入口。


        panel.fill({
            'signup-display': hide ? 'display: none;' : '',
        });


    });


    return {
      

    };

   



});