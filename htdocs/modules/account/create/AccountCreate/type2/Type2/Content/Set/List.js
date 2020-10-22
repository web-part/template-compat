
/**
* 核算方式。
*/



/**
* 核算方式。
*/
KISP.panel('/AccountCreate/Type2/Content/Set/List', function (require, module, panel) {
    
        var KISP = require('KISP');
    
    
        var list = [
            { name: '记', value: '0', },
            { name: '收、付、转', value: '1', },
            { name: '现收、现付、银收、银付、转', value: '2', },
            { name: '建账后再设置', value: '3', },
        ];
        var tabs = null;
    
        var meta = {
            index: 0,
        };
    
    
    
        /**
        * 初始化时触发。
        * 即首次 render 之前触发，且仅触发一次。
        * 适用于创建实例、绑定事件等只需要执行一次的操作。
        */
        panel.on('init', function () {
            tabs = KISP.create('Tabs', {
                container: panel.$.get(0),
                selector: '[data-index]',
                activedClass: 'on',
                eventName: 'click',
            });
    
            tabs.on('change', function (item, index) {
                meta.index = index;
            });
    
    
        });
    
    
        panel.on('render', function () {
            meta.index = 0;
            tabs.render(list, function (item, index) {
                return {
                    'index': index,
                    'name': item.name,
                };
            });
    
            tabs.active(meta.index);
        });
    
    
    
    
    
        return {
            get: function () {
                return list[meta.index];
            },
        };
    
     
    
    });
    
    
    
    
    
    
    






