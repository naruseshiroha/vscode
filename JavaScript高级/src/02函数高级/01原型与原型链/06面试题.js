{
  // 测试题1
  let A = function () { }
  A.prototype.n = 1

  let b = new A()

  A.prototype = {
    n: 2,
    m: 3
  }

  let c = new A()
  console.log(b.n, b.m, c.n, c.m) // 1 undefined 2 3 

  // 测试题2
  let F = function () { };
  Object.prototype.a = function () {
    console.log('a()')
  };
  Function.prototype.b = function () {
    console.log('b()')
  };
  let f = new F();
  f.a() // a()
  // f.b() // f.b is not a function (undefined)
  F.a() // a()
  F.b() // b()
}