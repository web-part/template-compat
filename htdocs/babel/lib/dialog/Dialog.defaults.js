/*
* babel time: 2020-10-19 16:42:31
*
* source md5: FF8443F2AAE441E34669D6277479C74D
*
* source file: htdocs/lib/dialog/Dialog.defaults.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('Dialog.defaults', {
    cssClass: '',

    /**
    * 是否启用 mask 层。
    */
    mask: true,

    /**
    * 组件的标题文本。
    */
    title: '',

    /**
    * 组件的内容文本。
    */
    content: '',

    /**
    * 组件宽度（单位为像素）。
    */
    width: 0,

    /**
    * 组件高度（单位为像素）。
    */
    height: 0,

    'z-index': 1024,

    maxWidth: 0,
    maxHeight: 0,

    minWidth: 200,
    minHeight: 160,

    dragable: true,
    resizable: true,

    autoClose: true, //点击底部任一按钮时自动关闭组件。

    attributes: {},

    footer: {
        content: '',
        buttons: []
    }
});