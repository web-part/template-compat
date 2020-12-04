

module.exports = {

    server: {
        open: true,             //自动打开浏览器
        port: 3000,             //设置启动端口
        htdocs: 'htdocs',      

        dir: [                 //指定托管的目录，可以是一个字符串或字符串的数组。
            'build',
            'htdocs',
        ], 
    },
};