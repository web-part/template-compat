/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 921967851469C4C8EE8C9A0093E05B51
*
* source file: htdocs/lib/Defaults.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 模块使用的默认配置管理器。
* @namespace
* @name Defaults
*/
define('Defaults', function (require, module, exports) {

            var $Object = KISP.require('Object');

            return exports = {

                        get: function get(mod) {

                                    //重载 get(name)，传进来的是一个公共模块的名称。
                                    if (typeof mod == 'string') {
                                                var name = mod + '.defaults';
                                                var defaults = require(name);
                                                return defaults;
                                    }

                                    //传进来的是一个具体的模块。
                                    var name = mod.name + '.defaults';
                                    var parent = mod.parent;

                                    var defaults = parent ? parent.require(name) : // 'User/API'
                                    require(name); // 'User'

                                    return defaults;
                        },

                        clone: function clone(name, target, target1, targetN) {

                                    var defaults = exports.get(name);
                                    var args = Array.from(arguments).slice(1);

                                    args = [{}, defaults].concat(args);
                                    defaults = $Object.extendDeeply.apply(null, args);

                                    return defaults;
                        }

            };
});