/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 466096F142F19D6848502A8A758E155B
*
* source file: htdocs/lib/pager/Pager/Regions.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('Pager/Regions', function (require, module) {

    var $ = require('$');

    /**
    * 根据总页数和当前页计算出要填充的区间。
    * @param {number} count 总页数。
    * @param {number} no 当前激活的页码。
    * @return {Array} 返回一个区间描述的数组。
    */
    function get(count, no) {

        if (count <= 10) {
            return [{
                'from': 1,
                'to': count,
                'more': false
            }];
        }

        if (no <= 3) {
            return [{
                'from': 1,
                'to': 5,
                'more': true
            }];
        }

        if (no <= 5) {
            return [{
                'from': 1,
                'to': no + 2,
                'more': true
            }];
        }

        if (no >= count - 1) {
            return [{
                'from': 1,
                'to': 2,
                'more': true
            }, {
                'from': count - 5,
                'to': count,
                'more': false
            }];
        }

        return [{
            'from': 1,
            'to': 2,
            'more': true
        }, {
            'from': no - 2,
            'to': no + 2,
            'more': no + 2 != count
        }];
    }

    return {
        'get': get
    };
});