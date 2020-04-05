{
  /* 
    1.原型链(图解)
      访问一个对象的属性时，
        先在自身属性中查找，找到返回
        如果没有, 再沿着__proto__这条链向上查找, 找到返回
        如果最终没找到, 返回 undefined
      别名: 隐式原型链
      作用: 查找对象的属性(方法)
    2.构造函数/原型/实体对象的关系(图解)
    3.构造函数/原型/实体对象的关系2(图解)
  */

  function Fn() {
    this.test1 = () => {
      console.log('test1()')
    }
  }
  Fn.prototype.test2 = () => {
    console.log('test2()')
  }
  var fn = new Fn()

  fn.test1() // test1()
  fn.test2() // test2()
  console.log(fn.toString()) // [object Object]
  // fn.test3() // fn.test3 is not a function (undefined)
}