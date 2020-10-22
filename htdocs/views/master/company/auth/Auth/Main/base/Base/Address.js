
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
        list: [],
    };



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        Country.on({
            'select': {
                'default': function () {
                    Province.hide();
                    City.hide();
                    Town.hide();
                    More.hide();
                },
                'china': function () {
                    Province.render(meta.list);
                },
                'other': function () {
                    Province.hide();
                    City.hide();
                    Town.hide();
                    More.render();
                },
            },
        });

        Province.on({
            'loading': function () {
                API.get();
            },
            'select': function (item) {
                City.render(item.city);
            },
        });


        City.on({
            'select': function (item) {
                Town.render(item.area);
            },
        });

        Town.on({
            'select': function (item) {
                if (item.id == '0') {
                    More.hide();
                }
                else {
                    More.render();
                }
            },
        });

        API.on({
            'success': function (list) {
                meta.list = list;
                Province.render(list);
            },
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
        get: function () {
            var country = Country.get();
            var more = More.get();
           

            var list = [
                { key: 'country', value: country, },
            ];

            if (country.id == '1') {
                var province = Province.get();
                var city = City.get();
                var town = Town.get();


                list = list.concat([
                    { key: 'province', value: province, },
                    { key: 'city', value: city, },
                    { key: 'town', value: town, },
                ]);
            }

            list.push({ key: 'more', value: more, });


            
            return list;


        },
    };
});





