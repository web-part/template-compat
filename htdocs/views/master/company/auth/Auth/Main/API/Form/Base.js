
/**
* 
*/
define('/Auth/Main/API/Form/Base', function (require, module, exports) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');

    var key$process = {
        //企业名称。
        'company': function (value) {
            return { 'name': value, };
        },
        //所属行业。
        'industry': function (item) {
            return { 'industry_id': item.id, };
        },
        //国家。
        'country': function (item) {
            return { 'country_id': item.id, };
        },
        //省份。
        'province': function (item) {
            return { 'province_code': item.id, };
        },
        //城市。
        'city': function (item) {
            return { 'city_code': item.id, };
        },
        //地区。
        'town': function (item) {
            return { 'area_code': item.id, };
        },
        //更多地址。
        'more': function (value) {
            return { 'address': value, };
        },
        //企业规模。
        'scale': function (item) {
            return { 'scale_id': item.id, };
        },
    };

    return {
        get: function (list) {
            var form = {};

            list.forEach(function (item) {
                var value = item.value;

                if (typeof value == 'function') {
                    return;
                }

                var key = item.key;
                var process = key$process[key];
                var data = process ? process(value) : null;

                Object.assign(form, data);
            });

            return form;
        },

    };


});