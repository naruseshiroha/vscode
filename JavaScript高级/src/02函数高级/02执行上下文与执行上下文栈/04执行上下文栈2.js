{
  /* 
    1.依次输出什么?
    2.整个过程中产生了几个执行上下文?
  */

  console.log('global begin: ' + i) // undefined
  var i = 1
  foo(1);
  function foo(i) {
    if (i == 4) {
      return;
    }
    console.log('foo() begin:' + i);
    foo(i + 1);
    console.log('foo() end:' + i);
  }
  // 1 2 3 3 2 1 
  console.log('global end: ' + i) // 1
}
