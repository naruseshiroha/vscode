{
  /* 
    方式三: 工厂模式
      套路: 通过工厂函数动态创建对象并返回
      适用场景: 需要创建多个对象
      问题: 对象没有一个具体的类型, 都是Object类型
  */

  function createPerson(name, age) { // 返回一个对象的函数===>工厂函数
    let obj = {
      name: name,
      age: age,
      setName: function (name) {
        this.name = name
      }
    }

    return obj
  }

  // 创建2个人
  let p1 = createPerson('Tom', 12)
  let p2 = createPerson('Bob', 13)

  // p1/p2是Object类型

  function createStudent(name, price) {
    let obj = {
      name: name,
      price: price
    }
    return obj
  }
  let s = createStudent('张三', 12000)
  // s也是Object
}