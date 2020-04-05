{
  /* 
    1.分类
      基本(值)类型
        String: 任意字符串
        Number: 任意的数字
        boolean: true/false
        undefined: undefined
        null: null
      对象(引用)类型
        Object: 任意对象
        Function: 一种特别的对象(可以执行)
        Array: 一种特别的对象(数值下标, 内部数据是有序的)
    2.判断
      typeof:
        可以判断: undefined / 数值 / 字符串 / 布尔值 / function
        不能判断: null 与 object  object 与 array
      instanceof:
        判断对象的具体类型
      ===
        可以判断: undefined, null
  */

  // 1.基本
  // typeof返回数据类型的字符串表达
  let a
  // undefined  undefined true true
  console.log(a, typeof a, typeof a === 'undefined', a === undefined)
  console.log(undefined === 'undefined') // fales
  a = 4
  console.log(typeof a === 'number') // true
  a = 'atguigu'
  console.log(typeof a === 'string') // true
  a = true
  console.log(typeof a === 'boolean') // true
  a = null
  console.log(typeof a, a === null) // object true

  console.log('--------------------')

  // 2.对象
  var b1 = {
    b2: [1, 'abc', console.log],
    b3: function () {
      console.log('b3')
      return function () {
        return 'xfzhang'
      }
    }
  }

  console.log(b1 instanceof Object, b1 instanceof Array) // true  false
  console.log(b1.b2 instanceof Array, b1.b2 instanceof Object) // true true
  console.log(b1.b3 instanceof Function, b1.b3 instanceof Object) // true true

  console.log(typeof b1.b2) // object
  console.log(typeof b1.b3 === 'function') // true
  console.log(typeof b1.b2[2] === 'function') // true

  b1.b2[2](4) // 4
  console.log(b1.b3()()) // b3 xfzhang
}