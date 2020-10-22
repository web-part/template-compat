/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 48CE2CD03C6515A1B6371266DE9D3F46
*
* source file: htdocs/lib/table/Table/Reaction.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

define('Table/Reaction', function (require, module, exports) {

    var $ = require('$');
    var KISP = require('KISP');
    var Emitter = KISP.require('Emitter');
    var $Array = KISP.require('Array');
    var $String = KISP.require('String');
    var $Object = KISP.require('Object');
    var Defaults = require('Defaults');

    function _set(name$column, name, deps, change) {
        var _column$deps;

        var column = name$column[name];

        if (!column) {
            console.warn('不存在名为 ' + name + ' 的列。');
            return;
        }

        if (change) {
            column.change = change;
        }

        if (!deps) {
            return;
        }

        //因为单元格直接引用了列中的 deps 对象，
        //这里要直接修改原对象，而不能设置为新的引用。
        //下面的 col.infers 也如此。
        column.deps.splice(0); //清空原数组。
        (_column$deps = column.deps).push.apply(_column$deps, _toConsumableArray(deps)); //压进新元素。

        //反写到受影响的列中。
        deps.map(function (dep) {
            var _col$infers;

            var col = name$column[dep];
            if (!col) {
                console.warn('不存在名为 ' + name + ' 的列。');
                return;
            }

            var infers = col.infers;

            infers = new Set(infers);
            infers.add(name);

            //infers = [...infers].map(function (name) {

            //});

            col.infers.splice(0);
            (_col$infers = col.infers).push.apply(_col$infers, _toConsumableArray(infers));
        });
    }

    return {
        /**
        * 设置列的单元格监听规则和处理函数。
        * 已重载 set({ name: { deps: [], change: fn } }); 批量混写的情况 。
        * 已重载 set({ name: deps }); 批量设置 deps 数组的情况。
        * 已重载 set({ name: change }); 批号设置 change 函数的情况。
        * 已重载 set(name, { deps: [], change: fn }); 单个混写的情况。
        * 已重载 set(name, change); 单个设置 change 函数的情况。
        * 已重载 set(name, deps); 单个设置 deps 数组的情况。
        */
        set: function set(name, deps, change) {
            var name$column = this;

            //重载 set({  }); 批量的情况。
            if ($Object.isPlain(name)) {
                $Object.each(name, function (name, opt) {

                    //重载 set({ name: [] });
                    if (Array.isArray(opt)) {
                        _set(name$column, name, opt, null);
                        return;
                    }

                    //重载 set({ name: function });
                    if (typeof opt == 'function') {
                        _set(name$column, name, null, opt);
                        return;
                    }

                    _set(name$column, name, opt.deps, opt.change);
                });

                return;
            }

            //重载 set(name, { }); 单个混合的情况。
            if ($Object.isPlain(deps)) {
                var opt = deps;
                _set(name$column, name, opt.deps, opt.change);
                return;
            }

            //重载 set(name, change); 的情况。
            if (typeof deps == 'function') {
                change = deps;
                deps = null;
            }

            //单个分开的情况。
            _set(name$column, name, deps, change);
        }

    };
});