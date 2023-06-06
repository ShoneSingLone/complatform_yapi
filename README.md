- [getting-started](https://ued.qunar.com/ykit/guide/getting-started.html)

#

- server/app.js
- yapi.js configs

# yapi.commons.validateParams

只接受限定的参数，多余的会被过滤掉 => model 里面 schemaMap

- 跨域+Nginx+frp 导致携带 cookies 很麻烦

mongodb

```js
db.col.update({ title: 'MongoDB 教程' }, { $set: { title: 'MongoDB' } }, { multi: true });
```
