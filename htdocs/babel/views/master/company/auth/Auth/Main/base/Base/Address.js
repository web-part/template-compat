/*
* babel time: 2020-10-19 16:41:38
*
* source md5: DD51DE4F644BB27A8BAF9AB91DD89081
*
* source file: htdocs/views/master/company/auth/Auth/Main/base/Base/Address.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 所属行业。
* 即行业分类。
*/
KISP.panel('/Auth/Main/Base/Address', function (require, module, panel) {
    var API = module.require('API');
    var Country = module.require('Country');
    var Province = module.require('Province');
    var City = module.require('City');
    var Town = module.require('Town');
    var More = module.require('More');

    var meta = {
        list: []
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        Country.on({
            'select': {
                'default': function _default() {
                    Province.hide();
                    City.hide();
                    Town.hide();
                    More.hide();
                },
                'china': function china() {
                    Province.render(meta.list);
                },
                'other': function other() {
                    Province.hide();
                    City.hide();
                    Town.hide();
                    More.render();
                }
            }
        });

        Province.on({
            'loading': function loading() {
                API.get();
            },
            'select': function select(item) {
                City.render(item.city);
            }
        });

        City.on({
            'select': function select(item) {
                Town.render(item.area);
            }
        });

        Town.on({
            'select': function select(item) {
                if (item.id == '0') {
                    More.hide();
                } else {
                    More.render();
                }
            }
        });

        API.on({
            'success': function success(list) {
                meta.list = list;
                Province.render(list);
            }
        });
    });

    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {

        Country.render();
    });

    return {
        get: function get() {
            var country = Country.get();
            var more = More.get();

            var list = [{ key: 'country', value: country }];

            if (country.id == '1') {
                var province = Province.get();
                var city = City.get();
                var town = Town.get();

                list = list.concat([{ key: 'province', value: province }, { key: 'city', value: city }, { key: 'town', value: town }]);
            }

            list.push({ key: 'more', value: more });

            return list;
        }
    };
});