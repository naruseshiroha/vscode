{
  /* 
    1.使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)
    2.让函数外部可以操作(读写)到函数内部的数据(变量/函数)

    问题:
      1.函数执行完后, 函数内部声明的局部变量是否还存在?
      2.在函数外部能直接访问函数内部的局部变量吗?
  */

  function fun1() {
    var a = 3;

    function fun2() {
      a++; // 引用外部函数的变量--->产生闭包
      console.log(a);
    }

    return fun2;
  }
  var f = fun1(); // 由于f引用着内部的函数-->内部函数以及闭包都没有成为垃圾对象

  f(); // 间接操作了函数内部的局部变量
  f();
  // 4 5
}