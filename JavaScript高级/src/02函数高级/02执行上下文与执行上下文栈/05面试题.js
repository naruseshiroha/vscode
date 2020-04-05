{
  // 测试题1: 先预处理变量, 后预处理函数
  function a() { }
  var a;
  console.log(typeof a) // function


  // 测试题2: 变量预处理, in操作符
  if (!(b in window)) {
    var b = 1; // window.b = undefined
  }
  console.log(b) // undefined

  // // 测试题3: 预处理, 顺序执行
  var c = 1 // => var c;
  function c(c) {
    console.log(c)
    var c = 3
  }
  // => c = 3
  c(2) // c is not a function
}