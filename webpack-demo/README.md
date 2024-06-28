# webpack-demo

基于 webpack+gulp+koa 搭建纯静态页面型前端工程解决方案实例


### 拷贝项目

``` bash
$ git clone https://github.com/llcowry/webpack-demo.git
```

### 安装依赖模块

``` bash
$ npm install -g gulp webpack
$ cd webpack-demo && npm install
```

### 本地开发环境

- 启动本地开发服务器

``` bash
$ npm run start-dev
```

### 编译

``` bash
$ npm run build # or run `gulp default`
```

### 模拟生产环境

``` bash
$ npm run start-release
```

### 部署&发布

纯静态页面型的应用，最简单的做法是直接把`dist`文件夹部署到指定机器即可

``` bash
$ npm run deploy # or run `gulp deploy`
```

如果需要将生成的js、css、images等发布到cdn，修改下`publicPath`为目标cdn地址即可

### License

MIT.
