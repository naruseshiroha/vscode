{
  /* 
    1.undefined 与 null 的区别?
      undefined 代表定义未赋值
      nulll 定义并赋值了, 只是值为null
    2.什么时候给变量赋值为 null 呢?
      初始赋值, 表明将要赋值为对象
      结束前, 让对象成为垃圾对象(被垃圾回收器回收)
    3.严格区别变量类型与数据类型?
      数据的类型
        基本类型
        对象类型
      变量的类型(变量内存值的类型)
        基本类型: 保存就是基本类型的数据
        引用类型: 保存的是地址值
  */

  // 实例: 实例对象
  // 类型: 类型对象
  function Person(name, age) {// 构造函数  类型
    this.name = name
    this.age = age
  }
  let p = new Person('tom', 12) // 根据类型创建的实例对象

  // Person('jack', 12)

  // 1.undefined 与 null 的区别?
  let a
  console.log(a)  // undefined
  a = null
  console.log(a) // null

  // 起始
  let b = null  // 初始赋值为 null, 表明将要赋值为对象
  // 确定对象就赋值
  b = ['atguigu', 12]
  // 最后
  b = null // 让 b 指向的对象成为垃圾对象(被垃圾回收器回收)
  // b = 2

  let c = () => {

  }

  console.log(typeof c) // function
}