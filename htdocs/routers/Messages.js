/**
* 
*/
KISP.route('Messages', function (require, module) {


    return {
      
        /**
        * �Ѷ�һ����Ϣ����ʱ��������µ�δ����Ϣ������
        */
        'read': function () {
            var Message = module.require('Message');
            Message.getCount(); //��ȡ����δ����Ϣ������
        },

        /**
        * ��������־�ǻ�����ʾ�ġ�
        */
        'show': function () {
            var Updates = module.require('Updates');
            Updates.hide();

        },
      
    };
});
