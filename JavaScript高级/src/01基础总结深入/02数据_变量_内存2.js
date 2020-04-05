{
  /* 
    问题: var a = xxx, a内存中到底保存的是什么?
      xxx是基本数据, 保存的就是这个数据
      xxx是对象, 保存的是对象的地址值
      xxx是一个变量, 保存的xxx的内存内容(可能是基本数据, 也可能是地址值)
  */

  let a = 3
  a = function () {

  }

  let b = 'abc'
  a = b // 数据

  b = { name: 'zyy' }
  a = b // 地址值

  console.log(b, a)
  b.name = 'llh'
  console.log(b, a)
}