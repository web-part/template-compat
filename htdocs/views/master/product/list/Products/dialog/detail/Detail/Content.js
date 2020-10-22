

KISP.panel('/Products/Detail/Content', function (require, module, panel) {

    
    var API = module.require('API');


    panel.on('init', function () {
        panel.template({
            '': function (data) {
                
                return {
                    'proNum': data['product_sn'],
                    'proName': data['product_name'],
                    'startTime': data['active_time'],
                    'endTime': data['expire_time'],
                    'num': data['account_num'],
                    'userNum': data['user_num'],
                    'hasMode': data['buy_models'],
                    'noMode': data['other_models'],
                    'tip': data['remark'],
                }
            }
        });

    });



    panel.on('render', function (data) {

        panel.fill(data);

    });




});






