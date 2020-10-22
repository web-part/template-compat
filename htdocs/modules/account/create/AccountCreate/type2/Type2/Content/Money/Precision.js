﻿
/**
* 精度
*/
KISP.panel('/AccountCreate/Type2/Content/Money/Precision', function (require, module, panel) {

    var KISP = require('KISP');

    var toast = null;



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            icon: 'close',
            duration: 1500,
            width: 210,
        });

        panel.$.on('keydown', 'input', function (event) {

            var keyCode = event.originalEvent.keyCode;

            //屏蔽掉减号，数字键盘的和主键盘的。
            if (keyCode == 109 || keyCode == 189) {
                event.preventDefault();
            }

        });

        panel.$.on('blur', 'input', function (event) {

            var txt = this;

            var value = Number(txt.value);


        });
        panel.$.on('keyup', 'input', function (event) {
            this.value = this.value.replace(/\D/g, '');
            if (Number(this.value) > 4) {
                this.value = '';
            }
        })



    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {

    });


    panel.on('show', function () {
        panel.$.find('input').val(2);
    });

    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = Number(txt.value);

            return value;

        },
    };



});






