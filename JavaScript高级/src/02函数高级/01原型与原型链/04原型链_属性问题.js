{
  /* 
1. 读取对象的属性值时: 会自动到原型链中查找
2. 设置对象的属性值时: 不会查找原型链, 如果当前对象中没有此属性, 直接添加此属性并设置其值
3. 方法一般定义在原型中, 属性一般通过构造函数定义在对象本身上
  */

  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.setName = function (name) {
    this.name = name;
  }
  Person.prototype.sex = '男';

  let p1 = new Person('Tom', 12)
  p1.setName('Jack')

  console.log(p1.name, p1.age, p1.sex) // Jack 12 男

  p1.sex = '女'
  console.log(p1.name, p1.age, p1.sex) // Jack 12 女

  let p2 = new Person('Bob', 23)
  console.log(p2.name, p2.age, p2.sex) // Bob 23 男
}