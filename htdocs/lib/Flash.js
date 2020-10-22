
/**
* 闪烁特定的 DOM 节点。
*
*/
define('Flash', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');

    var defaults = {
        class: 'warning',
        interval: 250,
        count: 3,
        last: false,
        done: function () {

        },
    };

    return {
        /**
        * 开始闪烁。
        *   opt = {
        *       class: '',   //高亮时的 css 类名。
        *       interval: 200,  //时间间隔。
        *       count: 3,       //要闪烁的次数。
        *       last: false,    //最后一次是否为高亮。
        *       done: fn,       //闪烁完成的回调函数。
        *   };
        */
        start: function (element, opt) {

            if (typeof opt == 'string') {
                opt = { class: opt, };
            }

            opt = Object.assign({}, defaults, opt);


            var $el = $(element);
            var count = 0;
            var max = opt.count * 2;

            var tid = setInterval(function () {
                count++;

                $el.toggleClass(opt.class, count % 2 == 1);


                if (count >= max) {
                    clearInterval(tid);

                    $el.toggleClass(opt.class, !!opt.last);
                    opt.done && opt.done();
                }


            }, opt.interval);


            $el.get(0).scrollIntoViewIfNeeded();


        },

    };

 


});