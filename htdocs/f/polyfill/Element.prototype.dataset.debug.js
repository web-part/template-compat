
//from: https://gist.github.com/micty/f94ada4d0592ac38cc78be55477718ea

/**
* ���� DOM Ԫ�ص� dataset �߼�д����
* �ڸ߰汾������У�����ͨ�� var xxx = element.dataset.xxx; ������ element �ڵ��ϵ��Զ������� `data-xxx`��
* ���ڵͰ汾�������ֻ��ͨ�� var xxx = element.getAttribute('data-xxx'); �����ʡ�
* �˴���ʱ��֧�ִ� dataset ��ȡһ��ֵ������֧��д��һ��ֵ�� dataset �С�
* �����ԣ�Ŀǰ������ IE9 �����������ʹ�á�
*/
if (!Element.prototype.dataset) {

    Object.defineProperty(Element.prototype, 'dataset', {
        /**
        * ���� element.dataset Ϊ element ��һ��ֻ�����ԣ�����ֻ��Ҫ���� get �������ɡ�
        * ע�⣬dataset ����ĳ�Ա�ǿ��Զ�ȡ/���/ɾ��/�޸ĵġ�
        * ������ʱֻ֧�� dataset ��Ա�Ķ�ȡ�������� var xxx = element.dataset.xxx; 
        * ����ӳ�䵽ԭ����� var xxx = element.getAttribute('data-xxx'); ������
        *
        * �� element.dataset.xxx = yyy; ������ӳ�䵽ԭ����� element.setAttribute('data-xxx', yyy);
        */
        get: function () {
            var element = this;                 //��ǰ���ʵ�Ԫ�ء�
            var attributes = this.attributes;   //����һ��������Ķ��� �� IE9 �£������� this.getAttributeNames() ������
            var len = attributes.length;        //
            var dataset = {};                   //ģ��һ�� dataset ����


            for (var i = 0; i < len; i++) {
                var item = attributes[i];
                var name = item.name;

                //ֻ������ `data-` ��ͷ�����ԡ�
                if (!name.startsWith('data-')) {
                    continue;
                }

                var key = name.slice(5);        //��ȡ `data-` ֮����Ӵ����� `data-index` ��ȡ��Ϊ `index`��
                var value = item.value;         //

                dataset[key] = value;
            }

            return dataset;

        },

    });

}