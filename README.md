# templa-cli
Export the template directory to the specified directory and provide dynamic output files and file contents.

[中文文档](./README_CN.md)



## Cli

```bash
npm i templa-cli
npx templa-cli --input template --output out-template
```

### `--input <dir>`

input dir path, Write the path you want to copy to the template here.

### `--output <dir>`

output dir path, Write the template path you want to output here.

### `--includes [type]`

What are included in the output template.

The file name starts with ^ and ends with $, and the content parsing rules use [qs](https://github.com/ljharb/qs) to parse.

~~~
# input template
- template
  - routes^includes=router$
  - app.ts
  - tsconfig.josn
  ....
~~~

~~~sh
# No router
npx templa-cli --input template --output out-template
~~~

~~~
# output template
- template
  - app.ts
  - tsconfig.josn
  ....
~~~

~~~sh
# Use router
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

// Create a template and specify the output path
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

The output path is consistent with `--input`.

### `output`

The output path is consistent with `--output`.

### `options`

Template configuration, such as project name, version number.

The parsing engine of the template is [ejs](https://ejs.bootcss.com/#docs), you need to add .ejs to the file suffix when you use it, and .ejs will be removed after output.

The ejs engine receives a configuration by default, which contains options and includes.

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

