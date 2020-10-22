/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 9DCE2E078136EF3E92119D0B2D58D8AD
*
* source file: htdocs/lib/pager/Pager.defaults.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('Pager.defaults', {
    container: '', //组件的容器。
    total: 0, //总记录数。
    current: 1, //当前页码，从 1 开始。
    size: 20, //分页的大小，即每页的记录数。
    min: 0, //总页数小于该值时，分页器会隐藏。 如果不指定或指定为 0，则一直显示。
    sizes: [10, 20, 30, 40, 50] //可供选择的分页大小列表。
});