

KISP.panel('/AccountCreate/Type4/Content', function (require, module, panel) {


    var Form = module.require('Form');
    var Store = module.require('Store');


    panel.on('init', function () {
      
    });



    panel.on('render', function (data) {
        Form.render(data);
        Store.render();
    });


    return {
        /**
        * 获取用于提交给后台的数据。
        */
        get: function () {

            var data = {};

            var modules = [
                Form,
                Store,
            ];


            //依次去获取对应的值，如果有非法的，则提前返回。

            var M = modules.find(function (M) {
                var item = M.get();

                if (!item) {
                    return true;
                }


                Object.assign(data, item);
            });

            //M 非空，说明它返回的值就是非法的。
            return M ? null : data;

        },
    };



});






