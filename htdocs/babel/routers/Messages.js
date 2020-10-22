/*
* babel time: 2020-10-19 16:42:32
*
* source md5: A4EE8702B723BFB19B7D8791BE879E48
*
* source file: htdocs/routers/Messages.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Messages', function (require, module) {

    return {

        /**
        * �Ѷ�һ����Ϣ����ʱ��������µ�δ����Ϣ������
        */
        'read': function read() {
            var Message = module.require('Message');
            Message.getCount(); //��ȡ����δ����Ϣ������
        },

        /**
        * ��������־�ǻ�����ʾ�ġ�
        */
        'show': function show() {
            var Updates = module.require('Updates');
            Updates.hide();
        }

    };
});