{
  /* 
    问题: 什么时候必须使用['属性名']的方式?
      1.属性名包含特殊字符: - 空格
      2.属性名不确定
  */

  var p = {}
  // 1.给p对象添加一个属性: content-type: text/json
  // p.content-type = 'text/json' //不能用
  p['content-type'] = 'text/json'
  console.log(p['content-type']) // text/json

  // 2.属性名不确定
  var propName = 'myAge'
  var value = 18
  // p.propName = value //不能用
  p[propName] = value
  console.log(p[propName]) // 18
}