

{
  /* 
    1.理解
      全称: Immediately-Invoked Function Expression
    2.作用
      隐藏实现
      不会污染外部(全局)命名空间
      用它来编码js模块
  */

  (function () { //匿名函数自调用
    let a = 3
    console.log(a + 3)
  })() // 6

  let a = 4
  console.log(a) // 4

    ; (function () {
      let a = 1
      function test() {
        console.log(++a)
      }
      window.$ = function () { // 向外暴露一个全局函数
        return {
          test
        }
      }
    })()

  $().test() // 1.$是一个函数 2.$执行后返回的是一个对象
}