


module.exports = {


    packages: {
        enabled: true,  //是否启用 pack 分包功能。   

        //要匹配的分包文件，相对于网站根目录。。
        patterns: [
            '**/*/package.json',
            '!f/**/*/package.json',
        ],
    },

};