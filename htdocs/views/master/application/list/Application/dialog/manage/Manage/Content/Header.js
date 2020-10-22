﻿

KISP.panel('/Application/Manage/Content/Header', function (require, module, panel) {

    var listData = [];  //列表数据

    function Search(keyword) {
        var searchList = [];
        listData.map(function (item, index) {
            if (item.mobile.indexOf(keyword) != -1 || item.name.indexOf(keyword) != -1) {
                searchList.push(item);
            }
        });
        panel.fire('search', [searchList]);
    }
    panel.on('init', function () {

        panel.$on('click', {
            '[data-type="search"]': function () {
                var keyword = panel.$.find('[data-type="txt"]').val();
                Search(keyword);
            }
        });

    })


    panel.on('render', function (numInfo, list) {
        listData = list;
        panel.fill(numInfo, function () {
            return {
                'used': numInfo.used,
                'total': numInfo.total,
            }
        });
        panel.$.find('[data-type="txt"]').keypress(function () {
            if (event.keyCode === 13) {
                var keyword = panel.$.find('[data-type="txt"]').val();
                Search(keyword);

            }
        });
    });
    return {

    }



});





