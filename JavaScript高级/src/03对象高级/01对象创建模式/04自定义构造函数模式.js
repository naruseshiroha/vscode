{
  /* 
    方式四: 自定义构造函数模式
      套路: 自定义构造函数, 通过new创建对象
      适用场景: 需要创建多个类型确定的对象
      问题: 每个对象都有相同的数据, 浪费内存
  */

  function Person(name, age) {
    this.name = name
    this.age = age
    this.setName = function (name) {
      this.name = name
    }
  }
  let p1 = new Person('Tom', 12)
  p1.setName('Jack')

  console.log(p1.name, p1.age) // Jack 12
  console.log(p1 instanceof Person) // true

  function Student(name, price) {
    this.name = name
    this.price = price
  }
  let s = new Student('Bob', 13000)

  console.log(s instanceof Student) // True

  let p2 = new Person('JACK', 23)

  console.log(p1, p2) // Person Person
}