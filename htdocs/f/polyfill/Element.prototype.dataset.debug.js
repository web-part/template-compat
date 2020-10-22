
//from: https://gist.github.com/micty/f94ada4d0592ac38cc78be55477718ea

/**
* 兼容 DOM 元素的 dataset 高级写法。
* 在高版本浏览器中，可以通过 var xxx = element.dataset.xxx; 来访问 element 节点上的自定义属性 `data-xxx`，
* 但在低版本浏览器，只能通过 var xxx = element.getAttribute('data-xxx'); 来访问。
* 此处暂时仅支持从 dataset 读取一个值，而不支持写入一个值到 dataset 中。
* 经测试，目前可以在 IE9 或以上浏览器使用。
*/
if (!Element.prototype.dataset) {

    Object.defineProperty(Element.prototype, 'dataset', {
        /**
        * 由于 element.dataset 为 element 的一个只读属性，这里只需要设置 get 方法即可。
        * 注意，dataset 里面的成员是可以读取/添加/删除/修改的。
        * 这里暂时只支持 dataset 成员的读取操作，即 var xxx = element.dataset.xxx; 
        * 可以映射到原生层的 var xxx = element.getAttribute('data-xxx'); 方法。
        *
        * 但 element.dataset.xxx = yyy; 还不能映射到原生层的 element.setAttribute('data-xxx', yyy);
        */
        get: function () {
            var element = this;                 //当前访问的元素。
            var attributes = this.attributes;   //这是一个类数组的对象。 在 IE9 下，不存在 this.getAttributeNames() 方法。
            var len = attributes.length;        //
            var dataset = {};                   //模拟一个 dataset 对象。


            for (var i = 0; i < len; i++) {
                var item = attributes[i];
                var name = item.name;

                //只处理以 `data-` 开头的属性。
                if (!name.startsWith('data-')) {
                    continue;
                }

                var key = name.slice(5);        //截取 `data-` 之后的子串，如 `data-index` 截取后为 `index`。
                var value = item.value;         //

                dataset[key] = value;
            }

            return dataset;

        },

    });

}