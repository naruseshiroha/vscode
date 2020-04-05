{
  /* 
    1.产生: 在嵌套内部函数定义执行完时就产生了(不是在调用)
    2.死亡: 在嵌套的内部函数成为垃圾对象时
  */

  function fun1() {
    // 此处闭包已经产生(函数提示, 内部函数对象已经创建了)
    let a = 3;

    function fun2() {
      a++;
      console.log(a);
    }

    return fun2;
  }
  let f = fun1();

  f();
  f();
  f = null // 此时闭包对象死亡
}