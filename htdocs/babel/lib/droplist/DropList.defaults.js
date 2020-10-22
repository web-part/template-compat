/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 60C6404818C3702146CA2C44DC8739CD
*
* source file: htdocs/lib/droplist/DropList.defaults.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('DropList.defaults', {
    cssClass: 'DropList',
    tableClass: '',
    text: '',
    readonly: false,
    disabled: false,
    custom: false,
    order: false, //是否自动增加一列作为序号列。
    empty: false, //是否允许为空。
    mask: 0,
    dialog: document.body,
    columns: [],
    field: null,
    filters: true,
    container: null,

    tabIndex: '',
    maxLength: 0 //0 表示不限制。
});