const Safeify = require('safeify').default;

module.exports = async function sandboxFn(context, script) {
  // 创建 safeify 实例
  const safeVm = new Safeify({
    timeout: 3000,
    asyncTimeout: 60000
  });
  script = `${script};
return this;`;
  // 执行动态代码
  let result = context;
  try {
    result = (() =>
      new Promise(async r => {
        setTimeout(() => {
          context.execSript = '执行时间过长';
          return r(context);
        }, 1000 * 10);
        console.log("safeVm\n", script);
        const res = await safeVm.run(script, context);
        r(res);
      }))();
  } catch (error) {
    console.log(context);
    console.error(error);
  }

  // 释放资源
  safeVm.destroy();
  return result;
};
