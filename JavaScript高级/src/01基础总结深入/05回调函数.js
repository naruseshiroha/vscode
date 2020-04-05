{
  /* 
    1.什么函数才是回调函数?
      1).你定义的
      2).你没有调
      3).但最终它执行了(在某个时刻或某个条件下)
    2.常见的回调函数?
      dom事件回调函数 ==> 发生事件的dom元素
      定时器回调函数 ===> window
      ajax请求回调函数(后面讲)
      生命周期回调函数(后面讲)
  */

  document.body.onclick = event => { // dom事件回调函数
    console.log(event)
  }

  // 定时器
  // 超时定时器
  // 循环定时器
  setTimeout(() => { // 定时器回调函数
    console.log('到点了' + this)
  }, 2000)

  /* var a = 3 
  alert(window.a) // 3
  window.b = 4
  alert(b) // 4 */
}