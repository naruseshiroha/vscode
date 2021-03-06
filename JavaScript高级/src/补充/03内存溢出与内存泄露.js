{
  /* 
    1.内存溢出
      一种程序运行出现的错误
      当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误
    2.内存泄露
      占用的内存没有及时释放
      内存泄露积累多了就容易导致内存溢出
      常见的内存泄露:
        意外的全局变量
        没有及时清理的计时器或回调函数
        闭包
  */

  // 1.内存溢出
  let obj = {}
  for (let i = 0; i < 10000; i++) {
    obj[i] = new Array(10000000)
    console.log('-----')
  }

  // 2.内存泄露
  // 意外的全局变量
  function fn() {
    a = new Array(10000000)
    console.log(a)
  }
  fn()

  // 没有及时清理的计时器或回调函数
  let intervalId = setInterval(function () { // 启动循环定时器后不清理
    console.log('----')
  }, 1000)

  clearInterval(intervalId)

  // 闭包
  function fn1() {
    let a = 4
    function fn2() {
      console.log(++a)
    }
    return fn2
  }
  let f = fn1()
  f()

  f = null // 清除闭包
}