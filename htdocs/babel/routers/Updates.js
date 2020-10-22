/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 7889FA90CFC95D7B5F08F2191C731B0B
*
* source file: htdocs/routers/Updates.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Updates', function (require, module) {

  return {

    /**
    * ����Ϣ�����ǻ�����ʾ�ġ�
    */
    'show': function show() {
      var Messages = module.require('Messages');
      Messages.hide();
    }

  };
});