/**
* 
*/
KISP.route('Messages', function (require, module) {


    return {
      
        /**
        * 已读一条消息详情时，获得最新的未读消息条数。
        */
        'read': function () {
            var Message = module.require('Message');
            Message.getCount(); //获取最新未读消息条数。
        },

        /**
        * 跟更新日志是互斥显示的。
        */
        'show': function () {
            var Updates = module.require('Updates');
            Updates.hide();

        },
      
    };
});
