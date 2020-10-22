/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 605CE30F5C2D75FEF4ADF02245CCAE18
*
* source file: htdocs/views/master/company/add/AddCompanys/content/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AddCompanys/Content/Header', function (require, module, panel) {

    var list = {};
    var _allChosed = false;

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="check-all"]': function dataCmdCheckAll(event) {

                list.now.forEach(function (item, index) {
                    if (!list.origin[index].ifChecked) {
                        item.ifChecked = !_allChosed;
                    }
                });
                _allChosed = !_allChosed;

                $(this).toggleClass('on', _allChosed);

                panel.fire('all-chosed', [_allChosed]);
            }
        });
    });

    panel.on('render', function (data) {
        list = data.list;
        _allChosed = data.allChosed;
        panel.$.find('[data-cmd="check-all"]').toggleClass('on', _allChosed);
    });

    return {
        'allChosed': function allChosed(status) {
            _allChosed = status;
            panel.$.find('[data-cmd="check-all"]').toggleClass('on', _allChosed);
        }
    };
});