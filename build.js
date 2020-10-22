

const args = require('@webpart/args');
const master = require('@webpart/master');

const defaults = require('./config/defaults');
const options = require('./config/build');


let cmd = args.parse('build');
let mode = cmd.compat ? 'compat' : 'normal';    //compat: 兼容模式。 normal: 标准模式。


//命令中指定了使用独立打包的方式，加载相应的配置。
if (cmd.pack) {
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

    options.excludes = [...options.excludes, ...excludes];
}

master.config(defaults);


// //增加额外的配置。
// master.on('init', function (website) {
//     let config = require(`./config/build.${mode}`); //如 `./config/build.compat`。
//     //增加额外的 excludes，即构建前要排除在外的文件或目录。
//     let excludes = config.excludes || [];

//     options.excludes = [...options.excludes, ...excludes];
// });

master.on('init', function (website) {
    let process = require(`@webpart/process-${mode}`);

    process.build(website);

});


master.on('done', function () { 
    console.log('done..........'.red);
});


master.build(options);

