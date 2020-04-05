{
  /* 
    1.变量声明提升
      通过var定义(声明)的变量, 在定义语句之前就可以访问到
      值: undefined
    2.函数声明提升
      通过function声明的函数, 在之前就可以直接调用
      值: 函数定义(对象)
    3.问题: 变量提升和函数提升是如何产生的? 
  */

  // 面试题: 输出什么?
  var a = 4
  function fn() {
    console.log(a)
    var a = 5
  }

  fn() // undefined

  // 变量提升
  console.log(a1) // undefined
  // 函数提升
  a2() // a2()

  var a1 = 3
  function a2() {
    console.log('a2()')
  }
}