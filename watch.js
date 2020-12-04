
const Args = require('@webpart/args');
const Master = require('@webpart/master');
const defaults = require('./config/defaults');
const options = require('./config/watch');


let args = Args.parse('watch');


//命令中指定了使用独立打包的方式，加载相应的配置。
if (args.pack) {
    let pack = require('./config/defaults.pack');
    Object.assign(defaults.packages, pack.packages);
    
    pack = require('./config/watch.pack.js');
    Object.assign(options, pack);
}


Master.config(defaults);


Master.on('init', function (website) {
    let mode = args.compat ? 'compat' : 'normal';       //compat: 兼容模式。 normal: 标准模式。
    let process = require(`@webpart/process-${mode}`);

    process.watch(website);
    
});

Master.on('done', function () { 
    console.log('done'.red);
});

Master.watch(options);

