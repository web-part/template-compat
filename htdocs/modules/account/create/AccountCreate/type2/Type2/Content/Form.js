
/**
* 第一步中的表单。
*/
KISP.panel('/AccountCreate/Type2/Content/Form', function (require, module, panel) {

    var KISP = require('KISP');

    var toast = null;

    var list = [
        {
            name: '企业名称',
            key: 'company_name',
            desc: '企业名称可显示于单据和报表的显著位置',
            value: '',
            readonly: false,
            required: true,
            maxLength: 50,
        },
        {
            name: '账套代号',
            key: '',
            desc: '用于数据管理的系统默认账套代号',
            value: '(自动分配)',
            readonly: true,
            required: true,
            maxLength: 0,
        },
        {
            name: '账套名称',
            key: 'account_name',
            desc: '供用户记忆的账套名称',
            value: '',
            readonly: false,
            required: true,
            maxLength: 255,

        },
        {
            name: '地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址',
            key: 'company_address',
            desc: '',
            value: '',
            readonly: false,
            required: false,
            maxLength: 255,
        },
        {
            name: '电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话',
            key: 'company_phone',
            desc: '',
            value: '',
            readonly: false,
            required: false,
            maxLength: 255,
        },
    ];

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            icon: 'close',
            duration: 1500,
        });
      
    });



    panel.on('render', function (data) {

        list[0].value = data.company.origin['name'];
        list[2].value = data.company.origin['name'];


        var tpl = panel.template();
        tpl.fix(['readonly', 'maxlength', 'required']);

        panel.fill(list, function (item, index) {

            return {
                'index': index,
                'name': item.name,
                'desc': item.desc,
                'value': item.value,
                'readonly': item.readonly ? 'readonly' : '',
                'required': item.required ? 'required' : 'no-required',
                'maxlength': item.maxLength ? 'maxlength="' + item.maxLength + '"': '',
            };
        });


    });





    return {
        get: function () {
            var valid = true;
            var data = {};


            list.forEach(function (item, index) {

                //已检测到非法项，不再检测当前及后续的项。
                if (!valid) {
                    return;
                }

                var txt = 'input[data-index="' + index + '"]';
                var $txt = panel.$.find(txt);
                var value = $txt.val();
                var key = item.key;

                if (key) {
                    data[key] = value;
                }


                if (item.required && !value) {
                    toast.show(item.name + '必填', function () {
                        $txt.focus();
                    });

                    valid = false;
                }
            });


            return valid ? data : false;
        },
    };

 

});






