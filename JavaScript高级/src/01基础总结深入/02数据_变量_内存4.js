{
  /* 
    问题: 在js调用函数时传递变量参数时, 是值传递还是引用传递
      理解1: 都是值(基本/地址值)传递
      理解2: 可能是值传递, 也可能是引用传递(地址值)
  */
  let a = 3
  function fn (a) {
    a = a +1
  }

  fn(a)
  console.log(a) // 3

  function fn2 (obj) {
    console.log(obj.name)
  }
  let obj = {name: 'Tom'}

  fn2(obj) // Tom
}