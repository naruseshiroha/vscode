{
  // 问题: 结果输出多少?
  let x = 10;
  function fn() {
    console.log(x);
  }
  function show(f) {
    let x = 20;
    f();
  }
  show(fn); // 10
}