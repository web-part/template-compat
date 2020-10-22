
/**
* 验证码。
*/
KISP.panel('/Login/Main/Form/Code', function (require, module, panel) {
    
    var API = module.require('API');
  
    //验证码图片地址。


    var meta = {
        sessionId: '',
    };


    panel.set('show', false);

    panel.on('init', function () {
        
        API.on('check', function (data) {
            if (data) {
                meta.sessionId = data.sessionId;
                panel.fill({ 'src': data.url, });
                panel.show();
            }
            else {
                panel.hide();
            }
        });

        //点击切换图片
        panel.$.on('click', 'img', function () {
            this.src = API.refresh(this.src);
        });

    });




    panel.on('render', function (username) {

        //先清空之前可能留下的输入值。
        panel.$.find('input').val('');
        meta = {};

        API.check(username);
    });




    return {
        get: function () {
            var value = panel.$.find('input').val();

            return {
                'value': value || '',
                'sessionId': meta.sessionId,
            };

        },

    };

   



});