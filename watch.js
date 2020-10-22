
const args = require('@webpart/args');
const master = require('@webpart/master');
const defaults = require('./config/defaults');
const options = require('./config/watch');


let cmd = args.parse('watch');


//命令中指定了使用独立打包的方式，加载相应的配置。
if (cmd.pack) {
    let pack = require('./config/defaults.pack');
    Object.assign(defaults.packages, pack.packages);
    
    pack = require('./config/watch.pack.js');
    Object.assign(options, pack);
}


master.config(defaults);


master.on('init', function (website) {
    let mode = cmd.compat ? 'compat' : 'normal';       //compat: 兼容模式。 normal: 标准模式。
    let process = require(`@webpart/process-${mode}`);

    process.watch(website);
    
});

master.on('done', function () { 
    console.log('done..........'.red);
});

master.watch(options);

