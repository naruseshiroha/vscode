{
  /* 
    关于引用变量赋值问题
      2个引用变量指向同一个对象, 通过一个变量修改对象内部数据, 另一个变量看到的是修改之后的数据
      2个引用变量指向同一个对象, 让其中一个引用变量指向另一个对象, 另一引用变量依然指向前一个对象
  */
  let obj1 = { name: 'Tom' }
  let obj2 = obj1

  obj2.age = 12
  console.log(obj1.age)  // 12

  function fn(obj) {
    obj.name = 'A'
  }

  fn(obj1)
  console.log(obj2.name) // A


  let a = { age: 12 }
  let b = a

  a = { name: 'BOB', age: 13 }
  b.age = 14
  console.log(b.age, a.name, a.age) // 14 Bob 13

  function fn2(obj) {
    obj = { age: 15 }
    // obj.age = 15
  }

  fn2(a)
  console.log(a.age) // 13
}