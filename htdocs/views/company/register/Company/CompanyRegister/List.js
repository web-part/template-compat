

KISP.panel('/CompanyRegister/List', function (require, module, panel) {
    

    var list = [
       //{ text: '--请选择企业类型--', value: -1, },
       { text: '法人企业（企业法人，企业非法人可选择）', value: 0, },
       { text: '个体工商户（有个体工商户营业执照的个体工商户）', value: 1,},
       { text: '个人（尚未取得任何证照的客户选择）', value: 2,},
       { text: '其它组织（行政事业单位，非盈利组织、学习或外国机构选择）', value: 3,},
    ];





    panel.on('init', function () {
        panel.$on('change', function () {
            var index = this.selectedIndex;
            var item = list[index];

            item = item.value == -1 ? null : item;

            panel.fire('change', [item]);

        });


        panel.template(function (item, index) {

            return {
                'index': index,
                'text': item.text,
            };
        });
    });





    /**
    */
    panel.on('render', function () {

        panel.fill(list);

        panel.$.get(0).selectedIndex = 0;
        panel.$.trigger('change');          //上面的设置 selectedIndex 不会触发 `change` 事件。




    });




});