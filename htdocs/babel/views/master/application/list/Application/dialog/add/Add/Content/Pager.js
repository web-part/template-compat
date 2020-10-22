/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 3D46FF69947786446E7538D879B5B77E
*
* source file: htdocs/views/master/application/list/Application/dialog/add/Add/Content/Pager.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Application/Add/Content/Pager', function (require, module, panel) {
    var KISP = require('KISP');
    var Pager = require('Pager');

    var pager = null;

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        pager = new Pager({
            container: panel.$.find('>div'), //分页控件的容器。这里要套多一层，避免 panel 与 pager 争取 $ 的显示和隐藏。
            min: 2, //总页数小于该值时，分页器会隐藏。 如果不指定，则一直显示。
            total: 123, //总的记录数，应该从后台取得该值
            size: 10, //每页的大小，即每页的记录数
            sizes: [10, 20, 30, 40, 50, 60, 70]
        });

        pager.on({
            //翻页时会调用该方法，参数 no 是当前页码。
            //前端应根据当前页码去拉后台数据。
            'change': function change(no, size) {

                panel.fire('change', [{
                    'no': no,
                    'size': size
                }]);
            },

            //控件发生错误时会调用该方法，比如输入的页码有错误时
            'error': function error(msg) {
                KISP.alert(msg);
            }
        });
    });

    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    *   options = {
    *       total: 123,     //总记录数。
    *       size: 10,       //每页的记录数。
    *       no: 1,          //当前页码。
    *   };
    */
    panel.on('render', function (options) {
        pager.render(options);
    });
});