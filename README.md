
# 用于创建兼容模式网站的模板

该模板由 @webpart/cli 调用、下载。

目录说明：

--

> 此目录推荐用来存放：对应于后端接口的模拟数据文件。


**此目录由 `webpart` 工具自动生成，请不要在此目录放置任何自己的文件，否则可能会给清空而丢失。**

当使用了 `compat` 模式的命令后，`webpart` 工具会对特定的 js 文件做 babel 转换，生成带 `.babel.js` 后缀的文件存放到此目录。

此目录可以手动删除掉，当重新运行命令后，将会给重新生成。


此目录推荐用来存放：前端数据文件。
此目录推荐用来存：放公共模块。
此目录推荐用来存放私有模块。


**此目录由 `webpart` 工具自动生成，请不要在此目录放置任何自己的文件，否则可能会给清空而丢失。**


当使用了 `pack` 选项的命令后，`webpart` 工具会对特定的文件进行合并打包存放到此目录。
此目录可以手动删除掉，当重新运行命令后，将会给重新生成。

此目录推荐用来存放：路由模块。

**此目录由 `webpart` 工具自动生成，请不要在此目录放置任何自己的文件，否则可能会给清空而丢失。**

当使用了 `watch` 命令后，`webpart` 工具会把 less 文件编译成 css 文件存放到此目录。

此目录可以手动删除掉，当重新运行命令后，将会给重新生成。

【】

compat
├── README.md
├── build.js
├── config
│   ├── build.compat.js
│   ├── build.js
│   ├── build.normal.js
│   ├── build.pack.js
│   ├── defaults.js
│   ├── defaults.pack.js
│   ├── watch.js
│   └── watch.pack.js
├── htdocs 【目录：网站源代码】
│   ├── api【目录：对应于后端接口的模拟数据文件】
│   ├── babel 【自动生成的目录：babel 转换后的文件】
│   ├── config.js
│   ├── data
│   ├── f
│   │   ├── jquery
│   │   │   ├── jquery-3.3.1.debug.js
│   │   │   └── jquery-3.3.1.min.js
│   │   ├── kisp
│   │   │   ├── kisp.babel.debug.js
│   │   │   ├── kisp.babel.min.js
│   │   │   ├── kisp.debug.css
│   │   │   ├── kisp.debug.js
│   │   │   ├── kisp.min.css
│   │   │   ├── kisp.min.js
│   │   │   ├── package.json
│   │   │   └── readme.md
│   │   └── polyfill
│   │       ├── Element.prototype.dataset.debug.js
│   │       ├── polyfill.debug.js
│   │       ├── polyfill.min.js
│   │       └── scrollIntoViewIfNeeded.debug.js
│   ├── index.js
│   ├── index.master.html
│   ├── lib
│   ├── modules
│   ├── packages
│   ├── partial
│   │   ├── begin.js
│   │   └── end.js
│   ├── routers
│   ├── style
│   │   ├── css
│   │   ├── img
│   │   └── less
│   └── views
├── index.js
├── package.json
├── server.js
└── watch.js
