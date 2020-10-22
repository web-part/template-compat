/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 6A09B5F7347338BE24B69ED7234475B4
*
* source file: htdocs/views/master/company/auth/Auth/Main/API/Form/Base.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
define('/Auth/Main/API/Form/Base', function (require, module, exports) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');

    var key$process = {
        //企业名称。
        'company': function company(value) {
            return { 'name': value };
        },
        //所属行业。
        'industry': function industry(item) {
            return { 'industry_id': item.id };
        },
        //国家。
        'country': function country(item) {
            return { 'country_id': item.id };
        },
        //省份。
        'province': function province(item) {
            return { 'province_code': item.id };
        },
        //城市。
        'city': function city(item) {
            return { 'city_code': item.id };
        },
        //地区。
        'town': function town(item) {
            return { 'area_code': item.id };
        },
        //更多地址。
        'more': function more(value) {
            return { 'address': value };
        },
        //企业规模。
        'scale': function scale(item) {
            return { 'scale_id': item.id };
        }
    };

    return {
        get: function get(list) {
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
        }

    };
});