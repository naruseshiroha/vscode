{
  /* 
    1.将函数作为另一个函数的返回值
    2.将函数作为实参传递给另一个函数调用
  */

  // 1.将函数作为另一个函数的返回值
  function fn1() {
    let a = 2

    function fn2() {
      a++
      console.log(++a, a++, a)
    }

    return fn2
  }
  let f = fn1()
  f() // 4 4 5
  f() // 7 7 8

  // 2.将函数作为实参传递给另一个函数调用
  function showMsgDelay(msg, time) {
    setTimeout(function () {
      console.log(msg)
    }, time)
  }
  showMsgDelay('hello', 1000)
}