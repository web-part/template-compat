/*
* babel time: 2020-10-19 16:41:37
*
* source md5: E90E79C7AA74DB00643C24FCE9649B98
*
* source file: htdocs/views/master/application/list/Application/dialog/forbidden/Forbidden/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Forbidden/Content', function (require, module, panel) {
    var List = module.require('List');
    var Head = module.require('Head');

    var meta = {
        list: [] //最终要显示的用户列表。
    };

    panel.on('init', function () {
        Head.on({
            'check-all': function checkAll(checked) {
                List.checkall(checked);
            }
        });
        List.on({
            'allcheck': function allcheck(checked) {
                Head.checkall(checked);
            }
        });
    });

    panel.on('render', function (data, updateInfo) {
        List.render(data);
        Head.render(updateInfo);
    });

    return {
        get: List.get
    };
});