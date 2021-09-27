# templa-cli
将模板目录导出到指定目录，并提供动态输出文件和文件内容的功能。

## Cli

```sh
npx templa-cli --input template --output out-template
```

### `--input <dir>`

输入目录路径，这里写下你要复制到模板的路径。

### `--output <dir>`

输出目录路径，这里写下你要输出的模板路径。

### `--includes [type]`

输出模板中包含哪些内容。

解析规则是文件名以 ^ 开头，以 $ 结尾, 内容解析使用 [qs](https://github.com/ljharb/qs) 解析.

~~~
# 输入的模板
- template
  - routes^includes=router,xxx$
  - app.ts
  - tsconfig.josn
  ....
~~~

~~~sh
# 案例: 不使用路由
npx templa-cli --input template --output out-template
~~~

~~~
# 输出的模板
- template
  - app.ts
  - tsconfig.josn
  ....
~~~

~~~sh
# 案例: 使用路由
npx templa-cli --input template --output out-template --includes router
~~~

~~~
# output template
- template
  - routes
  - app.ts
  - tsconfig.josn
  ....
~~~

## Functions

~~~typescript
import { createTemplate } from 'templa-cli'

// 创建模板并指定输出路径。
createTemplate({
  input: 'template',
  output: 'out-template',
  options: {
    name: "project name"
  },
  includes: ['router']
})
~~~

### `input`

输入路径，与`--input`一致。

### `output`

输出路径，与`--output`一致。

### `options`

模板选项，例如项目名称、版本号。

模板的解析引擎为[ejs](https://ejs.bootcss.com/#docs)，使用时需要在文件后缀中添加.ejs，输出后.ejs会被删除。

ejs 引擎默认接收一个配置，其中包含 `options` 和 `includes`。

~~~ejs
<%# package.json %>
{
  "name": "<%= options.name %>",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon --exec esno app.ts"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "consola": "^2.15.3",
    "esno": "^0.9.1",
    "koa": "^2.13.1",
    "koa-bodyparser": "^4.3.0",
    <% if (includes.includes('router')) { %>
    "koa-router": "^10.1.1",
    <% } -%>
    "nodemon": "^2.0.12"
  },
  "devDependencies": {
    "@types/koa": "^2.13.4",
    <% if (includes.includes('router')) { %>
    "@types/koa-router": "^7.4.4",
    <% } -%>
    "@types/koa-bodyparser": "^4.3.3"
  }
}
~~~

