{
  // 说说它们的输出情况
  let fn = function () {
    console.log(fn)
  }
  fn() // [Function: fn]

  let obj = {
    fn2: function () {
      console.log(fn2) 
    }
  }
  obj.fn2() // fn2 is not defined
}