{
  /* 
    1.每个函数 function 都有一个 prototype，即显式原型
    2.每个实例对象都有一个__proto__，可称为隐式原型
    3.对象的隐式原型的值为其对应构造函数的显式原型的值
    4.内存结构(图)
    5.总结:
      函数的 prototype 属性: 在定义函数时自动添加的, 默认值是一个空 Object 对象
      对象的__proto__属性: 创建对象时自动添加的, 默认值为构造函数的 prototype 属性值
      程序员能直接操作显式原型, 但不能直接操作隐式原型(ES6之前)
  */

  function Fn() { }
  var fn = new Fn()

  console.log(Fn.prototype, fn.__proto__) // Fn{}
  console.log(Fn.prototype === fn.__proto__) // true

  Fn.prototype.test = () => {
    console.log('test()')
  }
  fn.test() // test()
}