

KISP.panel('/AddCompanys/Content', function (require, module, panel) {

    var List = module.require('List');
    var Header = module.require('Header');
    var API = module.require('API');
    var meta = {
        origin: [],
        now: [],
    };
    var allData = [];

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="register"]': function () {
                panel.fire('register');
            }
        })

        API.on({
            'success': function (list) {
                allData = list;
                DealData(list)
            }
        });
        Header.on({
            'all-chosed': function (status) {
                List.setStatus(status);
            },
            'ok': function (list) {
                API.post(list);
            }
        });
        List.on({
            'chose-status': function (status) {
                Header.allChosed(status);
            },

        })

    });

    function DealData(list) {
        var allChosed = true;

        meta.origin = JSON.parse(JSON.stringify(list));
        meta.now = list;
        if (list.length) {
            list.forEach(function (item, index) {
                if (!item.ifChecked) {
                    allChosed = false;
                }
            });
        } else {
            allChosed = false;
        }



        Header.render({
            'allChosed': allChosed,
            'list': meta,
        });
        List.render(meta);
    }

    panel.on('render', function (keyword) {
        if (keyword !== undefined && allData.length) {
            var searchList = [];
            allData.map(function (item, index) {
                if (item.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
                    searchList.push(item);
                }
            });
            DealData(searchList);
            return;
        }

        if (keyword == undefined) {
            API.get();
        }

    });

    return {
        'get': List.get,
    };


});






