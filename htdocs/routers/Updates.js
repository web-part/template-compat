/**
* 
*/
KISP.route('Updates', function (require, module) {


    return {
      
        /**
        * ����Ϣ�����ǻ�����ʾ�ġ�
        */
        'show': function () {
            var Messages = module.require('Messages');
            Messages.hide();

        },
      
    };
});
