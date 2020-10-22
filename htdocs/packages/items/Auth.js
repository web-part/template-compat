
/**
* 
*/
define('/Auth/Main/API/Form/Auth', function (require, module, exports) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');



    return {
        get: function (list) {
            var all = {};

            list.forEach(function (item) {
                var key = item.key;
                var value = item.value;

                if (typeof value == 'function') {
                    return;
                }

                all[key] = value;
            });

         
            var type = all['type'];

            if (!type) {
                return;
            }



            var form = (function (type) {

                switch (type.id) {
                    case '1':   //‘法人企业’
                    case '2':   //‘个体工商户’
                        return {
                            'license': all['code'] || '',
                            'license_pic': all['photo'] || '',
                        };

                    case '4':   //‘个人’
                        return {
                            'boss_name': all['name'] || '',
                            'boss_idno': all['code'] || '',
                            'boss_pic': all['photo'] || '',
                        };

                    case '3':   //‘其它’
                        return {
                            'org_code': all['code'] || '',
                            'org_code_pic': all['photo'] || '',
                        };

                    default:
                        throw new Error('无法识别的企业类型 id');

                }

            })(type);


            Object.assign(form, {
                'type': type.id,
            });

            return form;

        },
    };


});

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

/**
* 
*/
define('/Auth/Main/API/Form/User', function (require, module, exports) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');

    var key$process = {
        //联系人姓名。
        'name': function (value) {
            return { 'linkman': value, };
        },
        //联系人手机号码。
        'phone': function (value) {
            return { 'linkphone': value, };
        },
        //联系人手机验证码。
        'code': function (value) {
            return { 'vcode': value, };
        },
        //联系人邮箱。
        'email': function (value) {
            return { 'linkemail': value, };
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

/**
* 
*/
define('/Auth/Main/API/Form', function (require, module, exports) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');

    var Base = module.require('Base');
    var User = module.require('User');
    var Auth = module.require('Auth');






    return {
        get: function (form) {
            var base = Base.get(form.base);
            var user = User.get(form.user);
            var auth = Auth.get(form.auth);

            var form = Object.assign({}, base, user, auth);

            return form;

        },

    };


});

/*
* 统一社会信用代码。
*/
KISP.panel('/Auth/Main/Auth/License/Type0/Code', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');


    var toast = null;


    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 185,
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;
                var len = value.length;
                var isValidLen = len == 15 || len == 18;

                if (!value) {
                    //toast.show('请填写统一社会信用代码');
                    return;
                }

                if (!isValidLen) {
                    toast.show('统一社会信用代码的长度必须为15位或18位');
                    Flash.start(panel.$, 'warning');
                    return;
                }

            },

        });
    });

    panel.on('render', function () {
        

    });



    return {
        reset: function () {
            panel.fill({});
        },


        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;
            var len = value.length;
            var isValidLen = len == 15 || len == 18;

            if (!value) {
                return function () {
                    toast.show('请填写统一社会信用代码');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (!isValidLen) {
                return function () {
                    toast.show('统一社会信用代码的长度必须为15位或18位');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            return value;
        },
        setCode: function (data) { 
            panel.$.find('input').val(data);
        }
    };

});







/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type0/Photo', function (require, module, panel) {
    var KISP = require('KISP');
    var ImageReader = require('ImageReader');
    var ImageViewer = require('ImageViewer');
    var Flash = require('Flash');


    var toast = null;
    var reader = null;
    var photo = '';       //图片地址(base64)。
    var demo = 'http://p.cloudsz.kingdee.com/qy/public/dist/images/app/register/eg-big-b000610787.png';


    panel.on('init', function () {
        var input = panel.$.find('input[type="file"]').get(0);

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 185,
        });

        reader = new ImageReader(input);

        reader.on({
            'success': function (data) {
                photo = data;
                panel.$.addClass('has');
            },

        });


        panel.$on('click', {
            '[data-cmd="demo"]': function () {
                ImageViewer.render(demo);
            },

            '[data-cmd="show-photo"]': function () {
                ImageViewer.render(photo);
            },

        });
    });


    panel.on('render', function () {
        
        reader.render();

    });


    return {
        reset: function () {
            photo = '';
            panel.$.removeClass('has');
        },


        get: function () {
            if (photo) {
                return photo;
            }


            return function () {
                toast.show('请提供营业执照图片');
                Flash.start(panel.$, 'warning');

            };

        },
    };


});







/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type0', function (require, module, panel) {
    
    var Code = module.require('Code');
    var Photo = module.require('Photo');

    panel.set('show', false);


    panel.on('init', function () {


    });


    panel.on('render', function (actived) {
        
        panel.$.toggleClass('on', actived);

        Code.render();
        Photo.render();

    });


    return {
        reset: function () {
            panel.$.removeClass('on');
            Code.reset();
            Photo.reset();
        },


        get: function () {
            var code = Code.get();
            var photo = Photo.get();

            return [
                { key: 'code', value: code, },
                { key: 'photo', value: photo, },
            ];
        },
        setCode:Code.setCode,
    };
});







/*
* 负责人身份证号码
*/
KISP.panel('/Auth/Main/Auth/License/Type2/Code', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');


    var toast = null;
    var regexp15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/;
    var regexp18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;


    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 185,
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;
                var len = value.length;
                var isValidLen = len == 15 || len == 18;

                if (!value) {
                    //toast.show('请填写身份证号码');
                    return;
                }

                if (!isValidLen) {
                    toast.show('身份证号码的长度必须为15位或18位');
                    Flash.start(panel.$, 'warning');
                    return;
                }

                if (len == 15 && !regexp15.test(value)) {
                    toast.show('15位的身份证号码格式不正确');
                    Flash.start(panel.$, 'warning');
                    return;
                }

                if (len == 18 && !regexp18.test(value)) {
                    toast.show('18位的身份证号码格式不正确');
                    Flash.start(panel.$, 'warning');
                    return
                }

            },

        });
    });

    panel.on('render', function () {
        

    });



    return {
        reset: function () {
            panel.fill({});
        },

        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;
            var len = value.length;
            var isValidLen = len == 15 || len == 18;

            if (!value) {
                return function () {
                    toast.show('请填写身份证号码');
                    txt.focus();
                    Flash.start(panel.$, 'warning');

                };
            }

            if (!isValidLen) {
                return function () {
                    toast.show('身份证号码的长度必须为15位或18位');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (len == 15 && !regexp15.test(value)) {
                return function () {
                    toast.show('15位的身份证号码格式不正确');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (len == 18 && !regexp18.test(value)) {
                return function () {
                    toast.show('18位的身份证号码格式不正确');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }


            return value;
        },


    };

});







/*
* 负责人姓名。
*/
KISP.panel('/Auth/Main/Auth/License/Type2/Name', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');

    var toast = null;


    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写负责人姓名');
                    return;
                }

            },

        });
    });


    panel.on('render', function () {
        panel.fill({
         

        });
    });


    return {
        reset: function () {
            panel.fill({});
        },

        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (value) {
                return value;
            }

            return function () {
                toast.show('请填写负责人姓名');
                txt.focus();
                Flash.start(panel.$, 'warning');
            };
        },
    };


});







/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type2/Photo', function (require, module, panel) {
    var KISP = require('KISP');
    var ImageReader = require('ImageReader');
    var ImageViewer = require('ImageViewer');
    var Flash = require('Flash');


    var toast = null;
    var reader = null;
    var photo = '';       //图片地址(base64)。


    panel.on('init', function () {
        var input = panel.$.find('input[type="file"]').get(0);

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 185,
        });

        reader = new ImageReader(input);

        reader.on({
            'success': function (data) {
                photo = data;
                panel.$.addClass('has');
            },

        });


        panel.$on('click', {
            '[data-cmd="show-photo"]': function () {
                ImageViewer.render(photo);
            },

        });
    });


    panel.on('render', function () {
        
        reader.render();

    });


    return {
        reset: function () {
            photo = '';
            panel.$.removeClass('has');
        },

        get: function () {
            if (photo) {
                return photo;
            }

            return function () {
                toast.show('请提供身份证扫描件');

                Flash.start(panel.$, 'warning');

            };

        },

        
    };


});







/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type2', function (require, module, panel) {
    
    
    var Name = module.require('Name');
    var Code = module.require('Code');
    var Photo = module.require('Photo');


    panel.set('show', false);

    panel.on('init', function () {


    });


    panel.on('render', function (actived) {
        
        panel.$.toggleClass('on', actived);

        Name.render();
        Code.render();
        Photo.render();

    });

    return {
        reset: function () {
            panel.$.removeClass('on');

            Name.reset();
            Code.reset();
            Photo.reset();
        },

        get: function () {
            var name = Name.get();
            var code = Code.get();
            var photo = Photo.get();

            return [
                { key: 'name', value: name, },
                { key: 'code', value: code, },
                { key: 'photo', value: photo, },
            ];
        },

        
    };

});







/*
* 证件号码
*/
KISP.panel('/Auth/Main/Auth/License/Type3/Code', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');


    var toast = null;


    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;
                var len = value.length;

                if (!value) {
                    //toast.show('请填写证件号码');
                    return;
                }
              

            },

        });
    });

    panel.on('render', function () {
        
        
    });



    return {
        reset: function () {
            panel.fill({});
        },

        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;
            var len = value.length;

            if (!value) {
                return function () {
                    toast.show('请填写证件号码');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }


            return value;
        },
       
    };

});







/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type3/Photo', function (require, module, panel) {
    var KISP = require('KISP');
    var ImageReader = require('ImageReader');
    var ImageViewer = require('ImageViewer');
    var Flash = require('Flash');

    var toast = null;
    var reader = null;
    var photo = '';       //图片地址(base64)。


    panel.on('init', function () {
        var input = panel.$.find('input[type="file"]').get(0);

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 185,
        });

        reader = new ImageReader(input);

        reader.on({
            'success': function (data) {
                photo = data;
                panel.$.addClass('has');
            },

        });


        panel.$on('click', {
            '[data-cmd="show-photo"]': function () {
                ImageViewer.render(photo);
            },

        });
    });


    panel.on('render', function () {
        
        reader.render();

    });


    return {
        reset: function () {
            photo = '';
            panel.$.removeClass('has');
        },

        get: function () {
            if (photo) {
                return photo;
            }


            return function () {
                toast.show('请提供证件扫描件');
                Flash.start(panel.$, 'warning');

            };

        },

        
    };


});







/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type3', function (require, module, panel) {
    
    var Code = module.require('Code');
    var Photo = module.require('Photo');

    panel.set('show', false);

    panel.on('init', function () {


    });


    panel.on('render', function (actived) {
        
        panel.$.toggleClass('on', actived);

        Code.render();
        Photo.render();

    });


    return {

        reset: function () {
            panel.$.removeClass('on');

            Code.reset();
            Photo.reset();
        },


        get: function () {
            var code = Code.get();
            var photo = Photo.get();

            return [
                { key: 'code', value: code, },
                { key: 'photo', value: photo, },
            ];
        },

        
    };
});







/*
* 营业执照。
*/
KISP.panel('/Auth/Main/Auth/License', function (require, module, panel) {
    

    var meta = {
        type: '0',
    };


    panel.on('init', function () {


    });


    panel.on('render', function (type) {
        
        //入参 type 必须为严格的字符串 '0'、'2' 或 '3'，或不传。
        meta.type = type;

        ['0', '2', '3'].forEach(function (item, index) {

            var M = module.require('Type' + item);

            if (type) {
                M.render(item == type); //切换显示。
            }
            else {
                M.reset(); //清空旧数据。
            }

        });
    });




    return {
        get: function () {
            var M = module.require('Type' + meta.type);
            var value = M ? M.get() : [];

            return value;
          
        },
        setCode: function (data) { 
            var Type0 = module.require('Type0');
            Type0.setCode(data);
        },
    };


});







/*
* 企业类型。
*/
KISP.panel('/Auth/Main/Auth/Type', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');

   
    //id 是后台用到的，前端不用。
    var list = [
       { id: '1', name: '法人企业', value: '0', },
       { id: '2', name: '个体工商户', value: '0', },
       { id: '4', name: '个人', value: '2', },
       { id: '3', name: '其它组织', value: '3', },
    ];


    var tabs = null;
    var toast = null;

    var meta = {
        item: null,
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '>li',
            activedClass: 'on',
            eventName: 'click',
        });

        tabs.on('change', function (item, index) {
            meta.item = item = list[index];
            panel.fire('change', [item]);

        });





    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (index) {
        //index = index || 0;

        meta.item = null;

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });

        //tabs.active(index);

    });



    return {
        get: function () {
            var item = meta.item;

            if (item) {
                return item;
            }

            return function () {
                toast.show('请选择企业类型');
                Flash.start(panel.$, 'warning');

            };
        },
    };
});







/*
* 认证信息。
*/
KISP.panel('/Auth/Main/Auth', function (require, module, panel) {
    

    var Type = module.require('Type');          //企业类型。
    var License = module.require('License');    //营业执照。



    panel.on('init', function () {
        
        Type.on({
            'change': function (item) {
                License.render(item.value);
            },
        });

       
    });



    panel.on('render', function () {

        Type.render();
        License.render();


    });


    return {
        get: function () {
            var type = Type.get();
            var license = License.get();

            return [
                { key: 'type', value: type, },
                ...license,
            ];

        },
        setCode: License.setCode,
    };


});







define('/Auth/Main/Base/Address/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();



    //把一维的线性结构数组，转换成树型结构的数组。
    //具体就是把省、市、区按树型结构建立关系。
    function toTree(list) {

        var roots = [];
        var id$node = {};

        //以 id 为主键建立起节点关系。
        list.forEach(function (item) {
            var id = item.code;

            id$node[id] = {
                'id': id,
                'name': item.name,
                'item': item,
                'children': [],
                'parent': null,
            };
        });

        //归类到相应的子列表和父节点中。
        list.forEach(function (item) {
            var node = id$node[item.code];
            var parent = id$node[item.pcode];

            if (!parent) {
                roots.push(node);
                return;
            }

            parent.children.push(node);
            node.parent = parent;

        });
        return roots;
    }




    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            // var api = new API('xxx', {
            //     proxy: 'auth/address.js',
            // });

            var api = new API('web/product/get_district_data', {
                proxy: true,
            });


            api.on({
                'success': function (data, json, xhr) {
                    var list = data || [];
                    // var trees = toTree(list);

                    emitter.fire('success', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取地址列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取地址列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post();

        },


    };


});

KISP.panel('/Auth/Main/Base/Address/City', function (require, module, panel) {
    var KISP = require('KISP');
    var DropList = require('DropList');


    var droplist = null;
    var toast = null;


    var list = [
        { id: '0', name: '请选择城市', },
    ];

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        droplist = new DropList({
            'container': panel.$.get(0),
            'columns': ['name'],
            'empty': false,
            'readonly': true,
            'field': {
                id: 'code',
                text: 'name',
                focus: 'name',
                title: 'name',
            },
        });

        droplist.on({
            'select': function (item, opt) {
                var oItem = item.item;

                panel.fire('select', [oItem]);
            },

        });


    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (items) {
       
        list = list.slice(0, 1).concat(items);

        droplist.render();
        droplist.fill(list);
        droplist.select(0);
        
    });



    return {
        get: function () {
            var item = droplist.get();
            if (item.id != '0') {
                return item;
            }


            return function () {
                toast.show(item.item.name, function () {
                    droplist.$.find('input').focus();
                });
            };

        },

    };

});

KISP.panel('/Auth/Main/Base/Address/Country', function (require, module, panel) {
    var KISP = require('KISP');
    var DropList = require('DropList');


    var droplist = null;
    var toast = null;

    var list = [
        { id: '0', name: '请选择国家', type: 'default', },
        { id: '1', name: '中国', type: 'china', },
        { id: '2', name: '国外及港澳台地区', type: 'other', },
    ];

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        droplist = new DropList({
            'container': panel.$.get(0),
            'columns': ['name'],
            'empty': false,
            'readonly': true,
            'field': {
                id: 'id',
                text: 'name',
                focus: 'name',
                title: 'name',
            },
        });

        droplist.on({
            'select': function (item, opt) {
                var oItem = item.item;
          
                panel.fire('select', oItem.type, [oItem]);
                panel.fire('select', [oItem]);
            },

        });


    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {
        droplist.render();
        droplist.fill(list);
        droplist.select(0);
        
    });


    return {
        get: function () {
            var item = droplist.get();

            if (item.id != '0') {

                return item;
            }


            return function () {
                toast.show(item.item.name, function () {
                    droplist.$.find('input').focus();
                });
            };

        },

    };
  

});

/*
* 
*/
KISP.panel('/Auth/Main/Base/Address/More', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');
    var toast = null;


    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 200,
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写企业地址');
                    return;
                }

                if (value.length < 5) {
                    toast.show('企业地址不能少于5个字符');
                    Flash.start(panel.$, 'warning');
                    return;
                }


            },

        });

    });


    panel.on('render', function () {
        panel.fill({


        });

    });


    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('请填写企业地址');
                    txt.focus();
                    Flash.start(panel.$, 'warning');

                };
            }

            if (value.length < 5) {
                return function () {
                    toast.show('企业地址不能少于5个字符');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };

            }
            return value;
        },
    };
});


KISP.panel('/Auth/Main/Base/Address/Province', function (require, module, panel) {
    var KISP = require('KISP');
    var DropList = require('DropList');


    var droplist = null;
    var toast = null;

    var list = [
        { id: '0', name: '请选择省份', },
    ];


    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        droplist = new DropList({
            'container': panel.$.get(0),
            'columns': ['name'],
            'empty': false,
            'readonly': true,
            'field': {
                id: 'code',
                text: 'name',
                focus: 'name',
                title: 'name',
            },
        });

        droplist.render();



        droplist.on({
            'select': function (item, opt) {
                var oItem = item.item;

                panel.fire('select', [oItem]);
            },
            'focus': function () {
                if (list.length == 1) {
                    panel.fire('loading');
                }
            },

        });



    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (items) {

        list = list.slice(0, 1).concat(items);

        droplist.fill(list);
        droplist.select(0);


        if (list.length == 1) {
            droplist.$.find('td').html('加载中...');
        }

    });



    return {
        get: function () {
            var item = droplist.get();

            if (item.id != '0') {
                return item;
            }


            return function () {
                toast.show(item.item.name, function () {
                    droplist.$.find('input').focus();
                });
            };

        },

    };


});

KISP.panel('/Auth/Main/Base/Address/Town', function (require, module, panel) {
    var KISP = require('KISP');
    var DropList = require('DropList');


    var droplist = null;
    var toast = null;


    var list = [
        { id: '0', name: '请选择地区', },
    ];

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        droplist = new DropList({
            'container': panel.$.get(0),
            'columns': ['name'],
            'empty': false,
            'readonly': true,
            'field': {
                id: 'code',
                text: 'name',
                focus: 'name',
                title: 'name',
            },
        });

        droplist.render();

        droplist.on({
            'select': function (item, opt) {
                var oItem = item.item;

                panel.fire('select', [oItem]);
            },

        });


    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (items) {
       
        list = list.slice(0, 1).concat(items);

        droplist.fill(list);
        droplist.select(0);
        
    });



    return {
        get: function () {
            var item = droplist.get();

            if (item.id != '0') {
                return item;
            }


            return function () {
                toast.show(item.item.name, function () {
                    droplist.$.find('input').focus();
                });
            };

        },

    };

  

});

define('/Auth/Main/Base/Company/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            var api = new API('web/product/search_ent', {
                proxy: true,
            });


            api.on({
                'success': function (data, json, xhr) {
                    var list = data || [];

                    emitter.fire('success', [list]);

                },

                'fail': function (code, msg, json) {
                    // KISP.alert('搜索失败: {0}', msg);
                },

                'error': function () {
                    // KISP.alert('搜索错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                keyword:data,
            });

        },


    };


});

/*
* 企业名称。
*/
KISP.panel('/Auth/Main/Base/Company/List', function (require, module, panel) {
    

    var toast = null;

    var list = [];

    panel.on('init', function () {
        panel.template({
            '': function (data, index) {
                return {
                    'index': index,
                    'companyName': data.companyName,
                }
            }
        });


        panel.$on('mousedown', {  //解决与input blur事件冲突
            '[data-index]': function (e) {
                var index = +this.getAttribute('data-index');
                panel.fire('chosed', [list[index]]);
            },

        });




    });

    panel.on('render', function (data) {
        list = data;
        panel.fill(list);
    });


    return {
        hide: function () { 
            panel.hide();
        }
    };


});







define('/Auth/Main/Base/Industry/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();





    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            var api = new API('xxx', {
                proxy: 'auth/industry.js',
            });

            api.on({
                'success': function (data, json, xhr) {
                    var list = data || [];
                    emitter.fire('success', [list]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取行业分类失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取行业分类错误: 网络繁忙，请稍候再试');
                },
            });


            api.post();

        },


    };


});

KISP.panel('/Auth/Main/Base/Industry/DropList', function (require, module, panel) {
    var KISP = require('KISP');
    var DropList = require('DropList');
    var API = module.require('API');


    var droplist = null;
    var toast = null;

    var list = [
        { id: '0', name: '请选择行业分类', },
    ];

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });


        droplist = new DropList({
            'container': panel.$.get(0),
            'columns': ['name'],
            'empty': false,
            'readonly': true,
            'field': {
                id: 'id',
                text: 'name',
                focus: 'name',
                title: 'name',
            },
        });

        droplist.render();

        droplist.on({
            'select': function (item, opt) {
                var oItem = item.item;
           
                panel.fire('select', [oItem]);
            },

            'focus': function () {
                if (list.length == 1) {
                    panel.fire('loading');
                }
            },

        });

       



    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (items) {
        list = list.slice(0, 1).concat(items);

        droplist.fill(list);
        droplist.select(0);

        if (list.length == 1) {
            droplist.$.find('td').html('加载中...');
        }
    });


    return {
        get: function () {
            var item = droplist.get();
            if (item.id != '0') {
                return item;
            }

            return function () {
                toast.show(item.item.name, function () {
                    droplist.$.find('input').focus();
                });
            };

           
        },

    };

  

});

define('/Auth/Main/Base/Scale/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();





    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            var api = new API('xxx', {
                proxy: 'auth/scale.js',
            });

            api.on({
                'success': function (data, json, xhr) {
                    var list = data || [];
                    emitter.fire('success', [list]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取企业规模列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取企业规模列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post();

        },


    };


});

KISP.panel('/Auth/Main/Base/Scale/DropList', function (require, module, panel) {
    var KISP = require('KISP');
    var DropList = require('DropList');
    var API = module.require('API');


    var droplist = null;
    var toast = null;


    var list = [
        { id: '0', name: '请选择企业规模', },
    ];

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        droplist = new DropList({
            'container': panel.$.get(0),
            'columns': ['name'],
            'empty': false,
            'readonly': true,
            'field': {
                id: 'id',
                text: 'name',
                focus: 'name',
                title: 'name',
            },
        });

        droplist.render();

        droplist.on({
            'select': function (item, opt) {
                var oItem = item.item;
           
                panel.fire('select', [oItem]);
            },

            'focus': function () {
                if (list.length == 1) {
                    panel.fire('loading');
                }
            },

        });





    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (items) {
        list = list.slice(0, 1).concat(items);

        droplist.fill(list);
        droplist.select(0);

        if (list.length == 1) {
            droplist.$.find('td').html('加载中...');
        }
    });


    return {
        get: function () {
            var item = droplist.get();

            if (item.id != '0') {
                return item;
            }

            return function () {
                toast.show(item.item.name, function () {
                    droplist.$.find('input').focus();
                });
            };


        },

    };

  

});

/*
* 所属行业。
* 即行业分类。
*/
KISP.panel('/Auth/Main/Base/Address', function (require, module, panel) {
    var API = module.require('API');
    var Country = module.require('Country');
    var Province = module.require('Province');
    var City = module.require('City');
    var Town = module.require('Town');
    var More = module.require('More');


    var meta = {
        list: [],
    };



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        Country.on({
            'select': {
                'default': function () {
                    Province.hide();
                    City.hide();
                    Town.hide();
                    More.hide();
                },
                'china': function () {
                    Province.render(meta.list);
                },
                'other': function () {
                    Province.hide();
                    City.hide();
                    Town.hide();
                    More.render();
                },
            },
        });

        Province.on({
            'loading': function () {
                API.get();
            },
            'select': function (item) {
                City.render(item.city);
            },
        });


        City.on({
            'select': function (item) {
                Town.render(item.area);
            },
        });

        Town.on({
            'select': function (item) {
                if (item.id == '0') {
                    More.hide();
                }
                else {
                    More.render();
                }
            },
        });

        API.on({
            'success': function (list) {
                meta.list = list;
                Province.render(list);
            },
        });


    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {

        Country.render();

    });


    return {
        get: function () {
            var country = Country.get();
            var more = More.get();
           

            var list = [
                { key: 'country', value: country, },
            ];

            if (country.id == '1') {
                var province = Province.get();
                var city = City.get();
                var town = Town.get();


                list = list.concat([
                    { key: 'province', value: province, },
                    { key: 'city', value: city, },
                    { key: 'town', value: town, },
                ]);
            }

            list.push({ key: 'more', value: more, });


            
            return list;


        },
    };
});







/*
* 企业名称。
*/
KISP.panel('/Auth/Main/Base/Code', function (require, module, panel) {
    

    var toast = null;


    panel.on('init', function () {


    });

    panel.on('render', function () {

    });


    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            return value;


        },
    };


});







/*
* 企业名称。
*/
KISP.panel('/Auth/Main/Base/Company', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');
    var API = module.require('API');
    var List = module.require('List');

    var toast = null;

    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        panel.$on('blur', {
            'input': function () {
               
                List.hide();
            },

        });
        panel.$on('input', {
            'input': function () {
                var value = this.value;
                API.get(value);
            },

        });
        List.on({
            'chosed': function (item) {
                panel.$.find('input').val(item.companyName);
                panel.fire('set-code', [item.creditCode]);
                List.hide();
            },
        });
        API.on({
            'success': function (list) {
                List.render(list);
            }
        })



    });

    panel.on('render', function (company) {
        panel.$.find('input').val(company.origin['name']);

    });


    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (value) {
                return value;
            }

            return function () {
                toast.show('请填写企业名称');
                txt.focus();

                Flash.start(panel.$, 'warning');
            };
        },
    };


});







/*
* 所属行业。
* 即行业分类。
*/
KISP.panel('/Auth/Main/Base/Industry', function (require, module, panel) {
    
    var DropList = module.require('DropList');
    var API = module.require('API');

    var meta = {
        list: [],
    };


    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
  
        DropList.on({
            'loading': function () {
                API.get();
            },
            'select': function (item) {
                
            },
        });
  

        API.on({
            'success': function (list) {
                meta.list = list;

                DropList.render(list);
            },
        });

    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {

        DropList.render(meta.list);

    });




    return {
        get: DropList.get,
    };


});







/*
* 企业规模。
*/
KISP.panel('/Auth/Main/Base/Scale', function (require, module, panel) {
    
    var DropList = module.require('DropList');
    var API = module.require('API');

    var meta = {
        list: [],
        item: null, //选中的 item。
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
  

        DropList.on({
            'loading': function () {
                API.get();
            },
            'select': function (item) {
                meta.item = item;
            },
        });
  

        API.on({
            'success': function (list) {
                meta.list = list;

                DropList.render(list);
            },
        });

    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {
     
        meta.item = null;

        DropList.render(meta.list);

    });


    return {
        get: DropList.get,
    };


});







/*
* 基础信息。
*/
KISP.panel('/Auth/Main/Base', function (require, module, panel) {
    
  
    var Company = module.require('Company');    //企业名称。
    var Industry = module.require('Industry');  //所属行业。
    var Address = module.require('Address');    //企业地址。
    var Scale = module.require('Scale');        //企业规模。

  


    panel.on('init', function () {
        Company.on({
            'set-code': function (data) {
                panel.fire('set-code', [data]);
                
            }
        });
      
    });



    panel.on('render', function (company) {
        Company.render(company);
        Industry.render();
        Address.render();
        Scale.render();

    });

    return {
        get: function () {
            var company = Company.get();
            var industry = Industry.get();
            var address = Address.get();
            var scale = Scale.get();

            return [
                { key: 'company', value: company, },
                { key: 'industry', value: industry, },
                ...address,
                { key: 'scale', value: scale, },

            ];
         
        },
    };


});







define('/Auth/Main/User/Code/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });

    var msg$text = {
        'Account exist': '该账号已存在。',
        'Send sms vcode limit per day': '已超过每天限制的条数。',
        'Vcode fail': '验证码错误。',
    };


    return {
        'on': emitter.on.bind(emitter),

        

        /**
        * 发送手机短信验证码。
        */
        send: function (phone) {
            var api = new API('web/enterprise/send_yun_msg', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('发送中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('发送成功', function () {
                        emitter.fire('success', 'send', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    msg = msg$text[msg] || msg;
                    KISP.alert('短信验证码发送失败: <span style="color: red;">{0}</span>', msg);

                },

                'error': function () {
                    KISP.alert('短信验证码发送错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'mobile': phone,
                'type': 5, //验证码类型（type等于1为手机或邮箱注册验证码，2为手机或邮箱找回密码验证码，3为绑定手机验证码）type=5:企业认证联系人修改手机
            });
        },







     
    };


});

/*
* 手机验证码。
*/
KISP.panel('/Auth/Main/User/Code/Code', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');
    var API = module.require('API');


    var meta = {
        counting: false,    //是否正在倒计时。
    };

    var toast = null;
    var regexp = /^\d{6}$/;


    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });


        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    return;
                }

                if (!regexp.test(value)) {
                    toast.show('验证码非法');
                    Flash.start(panel.$, 'warning');
                    return;
                }

               
            },
        });

        panel.$on('click', {
            '[data-cmd="send"]': function (event) {
                event.preventDefault();
                panel.$.find('input').val(''); //清空上次留下的。
                panel.fire('send');
            },
        });


    });






    panel.on('render', function () {
        meta = {
            counting: false,    //是否正在倒计时。
        };

        panel.fill({}); //清空上次留下的。

    });





    return {
        enable: function (valid) {
            //正在倒计时，不允许外部修改状态。
            if (meta.counting) {
                return;
            }
            panel.$.find('[data-cmd="send"]').attr('disabled', !valid);

            
        },

        /**
        * 倒计时。
        * 在发送短信验证码成功后，禁用发送按钮。 
        * 同时开始倒计时，归零后启用发送按钮。
        */
        countdown: function (count) {
            var $btn = panel.$.find('[data-cmd="send"]');
            var $code = panel.$.find('input');
            var html = $btn.html();

            var tid = setInterval(function () {
                count--;
                setHtml();

                //倒计时归零。
                if (count <= 0) {
                    disabled = false;
                    $btn.attr('disabled', false);   //发送按钮可用。
                    $btn.html(html);
                    clearInterval(tid);
                    meta.counting = false;
                }

            }, 1000);

            function setHtml() {
                var text = '等待 ' + count + 's';
                $btn.html(text);
            }

            meta.counting = true;
            $btn.attr('disabled', true);    //发送按钮禁用。
            $code.attr('disabled', false);  //输入框启用。
            disabled = true;
            setHtml();
        },

        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('请填写验证码');
                    txt.focus();
                    Flash.start(panel.$, 'warning');

                };
            }

            if (!regexp.test(value)) {
                return function () {
                    toast.show('验证码非法');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            return value;

        },
    };

});







/*
* 手机验证码。
*/
KISP.panel('/Auth/Main/User/Code', function (require, module, panel) {
    
    var API = module.require('API');
    var Code = module.require('Code');



    var meta = {
        phone: '',          //关联的手机号。
    };



    panel.on('init', function () {

        API.on('success', {
            //验证码发送成功。
            'send': function () {
                Code.countdown(60);
            },
        });

        Code.on({
            'send': function () {
                API.send(meta.phone);
            },
        });
    });




    panel.on('render', function () {
        meta = {
            phone: '',          //关联的手机号。
        };

        Code.render();

    });





    return {
        enable: function (valid, phone) {

            meta.phone = valid ? phone : '';

            Code.enable(valid);
        },

        /**
        * 倒计时。
        * 在发送短信验证码成功后，禁用发送按钮。 
        * 同时开始倒计时，归零后启用发送按钮。
        */
        countdown: function (count) {
            Code.countdown(count);
        },

        get: Code.get,
    };

});







/*
* 手机验邮箱。
*/
KISP.panel('/Auth/Main/User/Email', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');


    var toast = null;
    var regexp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;


    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写邮箱');
                    return;
                }


                if (!regexp.test(value)) {
                    toast.show('邮箱非法');
                    Flash.start(panel.$, 'warning');
                    return;
                }

            },

        });

    });


    panel.on('render', function () {
        panel.fill({
         

        });
    });


    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('请填写邮箱');

                    txt.focus();
                    Flash.start(panel.$, 'warning');

                };
            }

            if (!regexp.test(value)) {
                return function () {
                    toast.show('邮箱非法');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }


            return value;
        },
    };


});







/*
* 联系人姓名。
*/
KISP.panel('/Auth/Main/User/Name', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');

    var toast = null;


    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写联系人姓名');
                    return;
                }
              
            },

        });
    });


    panel.on('render', function () {
        panel.fill({
         

        });
    });


    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (value) {
                return value;
            }

            return function () {
                toast.show('请填写联系人姓名');
                txt.focus();
                Flash.start(panel.$, 'warning');

            };
        },
    };


});







/*
* 联系人手机。
*/
KISP.panel('/Auth/Main/User/Phone', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');

    var toast = null;
    var regexp = /^1\d{10}$/;


    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });



        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写手机号');
                    return;
                }

                if (value && !regexp.test(value)) {
                    toast.show('手机号非法');
                    Flash.start(panel.$, 'warning');
                    return;
                }
               
            },

        });

        panel.$on('input', {
            'input': function (event) {
                var value = this.value;
                var valid = regexp.test(value);

                panel.fire('change', [valid, value]);
            },
        });

    });


    panel.on('render', function () {
        panel.fill({
         

        });
    });


    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('请填写手机号');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (!regexp.test(value)) {
                return function () {
                    toast.show('手机号非法');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            return value;

        },
    };



});







/*
* 联系人信息。
*/
KISP.panel('/Auth/Main/User', function (require, module, panel) {
    

    var Name = module.require('Name');          //联系人姓名。
    var Phone = module.require('Phone');        //联系人手机。
    var Code = module.require('Code');          //验证码。
    var Email = module.require('Email');        //联系人邮箱。
 


    panel.on('init', function () {

        Phone.on({
            'change': function (valid, value) {
                Code.enable(valid, value);
            },
        });


    });



    panel.on('render', function () {
        Name.render();
        Phone.render();
        Code.render();
        Email.render();

    });

    return {
        get: function () {
            var name = Name.get();
            var phone = Phone.get();
            var code = Code.get();
            var email = Email.get();

            return [
                { key: 'name', value: name, },
                { key: 'phone', value: phone, },
                { key: 'code', value: code, },
                { key: 'email', value: email, },
            ];
        },

    };


});







define('/Auth/Main/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');
    var Form = module.require('Form');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });


    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });




    return {
        'on': emitter.on.bind(emitter),

        
        /**
        * 保存。
        */
        // save: function (company, form) {

        //     var api = new API('web/product/enterprise_auth', {
        //         //proxy: 'success.js',
        //     });

        //     api.on({
        //         'request': function () {
        //             loading.show('保存中...');
        //         },

        //         'response': function () {
        //             loading.hide();
        //         },

        //         'success': function (data, json, xhr) {
        //             toast.show('保存成功', function () {
        //                 emitter.fire('success', 'save', [data]);
        //             });
        //         },

        //         'fail': function (code, msg, json) {
        //             KISP.alert('保存企业认证失败: {0}', msg);
        //         },

        //         'error': function () {
        //             KISP.alert('保存企业认证错误: 网络繁忙，请稍候再试');
        //         },
        //     });


        //     form = Form.get(form);
        //     form['tid'] = company.origin['tid'];

         

        //     api.post(form);
        // },

        /**
        * 提交。
        */
        submit: function (company, form) {


            var api = new API('web/product/enterprise_auth', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('提交中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    toast.show('提交成功', function () {
                        emitter.fire('success', 'submit', [data]);
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('提交企业认证失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('提交企业认证错误: 网络繁忙，请稍候再试');
                },
            });

            form = Form.get(form);
            form['tid'] = company.origin['tid'];

        
            api.post(form);
        },


    };


});

/**
* 
*/
KISP.panel('/Auth/Main/Submit', function (require, module, panel) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');





    panel.on('init', function () {
        
        panel.$on('click', {
            '[data-cmd]': function (event) {
                //分两步触发事件。
                //首先触发统一的 click 事件，让外面进行预处理，接收到外面传来的 list。
                //然后再触发具体的 save 或 submit 事件，并且把 list 传过去。
                //因为 save 和 submit 都需要 list，所以预处理获取 list 的逻辑是公共的。
                //这种写法更优美些。
                var cmd = this.getAttribute('data-cmd');
                var values = panel.fire('click');
                var list = values[0];

                event.preventDefault();
                panel.fire(cmd, [list]);
                

            },
        });
    });




    panel.on('render', function () {



    });



});

/*
* 
*/
KISP.panel('/Auth/Header', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },
        });




    });


    panel.on('render', function (company) {

        panel.fill({
            'company': company.name,
        });
        
    });



});







/*
* 
*/
KISP.panel('/Auth/Main', function (require, module, panel) {
    

    var API = module.require('API');    //
    var Base = module.require('Base');  //基础信息。
    var User = module.require('User');  //联系人信息。
    var Auth = module.require('Auth');  //认证信息。
 
    var Submit = module.require('Submit');  //保存和提交。


    var meta = {
        company: null,
    };


    panel.on('init', function () {
     
        Submit.on({
            //保存、提交的公共逻辑，预处理。
            'click': function () {
                var base = Base.get();
                var user = User.get();
                var auth = Auth.get();

                return { base, user, auth, };
            },

            //保存。 根据需求去掉保存
            // 'save': function (form) {
            //     API.save(meta.company, form);
            // },

            //提交。
            'submit': function (form) {
                var list = [...form.base, ...form.user, ...form.auth, ];

                var item = list.find(function (item) {
                    return typeof item.value == 'function';
                });


                if (item) {
                    item.value(); //错误处理。
                }
                else {
                    API.submit(meta.company, form);
                }
            },
        });

        Base.on({
            'set-code': function (data) {
                Auth.setCode(data);
            }
        });

        API.on('success', {
            'save': function () {

            },

            'submit': function () {
                panel.fire('submit');
            },
        });
    });



    panel.on('render', function (company) {
        meta.company = company;


        Base.render(company);
        User.render();
        Auth.render();
        Submit.render();


    });


});







/*
* 认证企业。
*/
KISP.view('/Auth', function (require, module, view) {
    
    var Header = module.require('Header');
    var Main = module.require('Main');





    view.on('init', function () {
        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function () {
                view.fire('company-list');
            },
        });

        Main.on({
            'submit': function () {
                view.fire('company-list');
            },
        });
    
    });


    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *   };
    */
    view.on('render', function (data) {
        var company = data.company;

        Header.render(company);
        Main.render(company);
    });




});





