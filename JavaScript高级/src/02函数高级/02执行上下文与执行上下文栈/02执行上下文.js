{
  /* 
    1.代码分类(位置)
      全局代码
      函数代码
    2.全局执行上下文
      在执行全局代码前将window确定为全局执行上下文
      对全局数据进行预处理
        var定义的全局变量==>undefined, 添加为window的属性
        function声明的全局函数==>赋值(fun), 添加为window的方法
        this==>赋值(window)
      开始执行全局代码
    3.函数执行上下文
      在调用函数, 准备执行函数体之前, 创建对应的函数执行上下文对象
      对局部数据进行预处理
        形参变量==>赋值(实参)==>添加为执行上下文的属性
        arguments==>赋值(实参列表), 添加为执行上下文的属性
        var定义的局部变量==>undefined, 添加为执行上下文的属性
        function声明的函数 ==>赋值(fun), 添加为执行上下文的方法
        this==>赋值(调用函数的对象)
      开始执行函数体代码
  */

  console.log(a1) // undefined
  console.log(a2) // undefined
  console.log(a3) // [Function: a3]
  // console.log(a4) // a4 is not defined
  console.log(this) // Global

  var a1 = 3
  var a2 = function () {
    console.log('a2()')
  }
  function a3() {
    console.log('a3()')
  }
  a4 = 4

  function fn(x, y) {
    console.log(x, y) // undefined undefined
    console.log(b1) // undefined
    console.log(b2) // [Function: b2]
    console.log(arguments) // [Arguments] {}
    console.log(this) // global

    // console.log(b3)

    var b1 = 5
    function b2() { }
    b3 = 6
  }
  fn()
}