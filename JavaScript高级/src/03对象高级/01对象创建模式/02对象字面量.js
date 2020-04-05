{
  /* 
    方式二: 对象字面量模式
      套路: 使用{}创建对象, 同时指定属性/方法
      适用场景: 起始时对象内部数据是确定的
      问题: 如果创建多个对象, 有重复代码
  */

  let p = {
    name: 'Tom',
    age: 12,
    setName: function (name) {
      this.name = name
    }
  }

  // 测试
  console.log(p.name, p.age) // Tom 12
  p.setName('JACK')
  console.log(p.name, p.age) // JACK 12

  let p2 = {  // 如果创建多个对象代码很重复
    name: 'Bob',
    age: 13,
    setName: function (name) {
      this.name = name
    }
  }
}