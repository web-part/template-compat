

const Args = require('@webpart/args');
const Master = require('@webpart/master');
const defaults = require('./config/defaults');
const options = require('./config/build');


let args = Args.parse('build');
let mode = args.compat ? 'compat' : 'normal';    //compat: 兼容模式。 normal: 标准模式。


//命令中指定了使用独立打包的方式，加载相应的配置。
if (args.pack) {
    let pack = require('./config/defaults.pack');
    Object.assign(defaults.packages, pack.packages);

    pack = require('./config/build.pack.js');
    Object.assign(options, pack);
}


//增加额外的配置。
{
    let config = require(`./config/build.${mode}`); //如 `./config/build.compat`。

    //增加额外的 excludes，即构建前要排除在外的文件或目录。
    let excludes = config.excludes || [];

    options.excludes = [
        ...options.excludes,
        ...excludes,
    ];
}

Master.config(defaults);


Master.on('init', function (website) {
    let process = require(`@webpart/process-${mode}`);

    process.build(website);

});


Master.on('done', function () { 
    console.log('done..........'.red);
});


Master.build(options);

