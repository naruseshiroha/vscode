{
  // 1.let命令
  {
    // 基本用法
    let a = [];
    for (let i = 0; i < 10; i++) {
      a[i] = () => {
        console.log(i);
      };
    }

    a[6]();
  }

  {
    // 不存在变量提升
    console.log(foo); // undefined
    var foo = 2;

    // console.log(bar); // ReferenceError: Cannot access 'bar' before initialization
    let bar = 2;
  }

  {
    // 暂时性死区(temporal dead zone，简称 TDZ)
    /*
      ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。
    凡是在声明之前就使用这些变量，就会报错。
      “暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
     */
    var tmp = 123;
    if (true) {
      // tmp = 'abc'; // ReferenceError: Cannot access 'tmp' before initialization
      let tmp;
    }

    if (true) {
      // TDZ start
      // tmp = 'abc'; // ReferenceError: Cannot access 'tmp' before initialization
      // console.log(tmp);

      // TDZ end
      let tmp;
      console.log(tmp); // undefined

      tmp = 123;
      console.log(tmp); // 123
    }

    // typeof x // ReferenceError: Cannot access 'x' before initialization
    let x;
    console.log(typeof y); // "undefined" !== undefined

    // 因为参数x默认值等于另一个参数y，而此时y还没有声明，属于“死区”。
    /*function bar(x = y, y = 2) {
        return [x, y];
    }*/

    // bar(); // ReferenceError: Cannot access 'y' before initialization

    function bar(x = 2, y = x) {
      return [x, y];
    }

    console.log(bar()); // [2, 2]

    {
      var z = z;
      console.log(z); // undefined

      // let y = y // ReferenceError: Cannot access 'y' before initialization
    }
  }

  {
    // 不允许重复声明
    function func() {
      // let a = 10
      // var a = 1 // SyntaxError: Identifier 'a' has already been declared

      // let c = 20
      // let c = 2 // SyntaxError: Identifier 'c' has already been declared

      var b = 3;
      var b = 3;
    }
  }

  // 2.块级作用域
  {
    // 为什么需要块级作用域？
    var tmp = new Date();

    function f() {
      console.log(tmp);
      if (false) {
        var tmp = 'hello world';
      }
    }

    f(); // undefined
  }

  {
    // ES6 的块级作用域
    function f1() {
      let n = 5;
      if (true) {
        let n = 10;
      }
      console.log(n); // 5
    }

    var s = 'hello';
    for (var i = 0; i < s.length; i++) {
      console.log(s[i]);
    }
    console.log(i);

    // ES6 允许块级作用域的任意嵌套。
    // 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。
    {
      {
        {
          {
            let insane = 'hello world';
            {
              let insane = 'Hello World';
            }
          }
          // console.log(insane); // ReferenceError: insane is not defined
        }
      }

      // IIFE
      (function() {
        var tmp;
        // ...
      })();

      {
        let tmp;
        // ...
      }
    }
  }

  {
    // 块级作用域与函数声明
    // ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
    'use strict';

    if (true) {
      function fn1() {
        // ...
        console.log('233');
      }
    }
    fn1();

    try {
      function fn2() {
        // ...
        console.log('2333');
      }
    } catch (e) {
      // ...
      console.log(e);
    }
    fn2();
    // 上面两种函数声明，根据 ES5 的规定都是非法的。
    // 但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，
    // 因此上面两种情况实际都能运行，不会报错。

    function f() {
      console.log('I am outside!');
    }

    (function() {
      if (false) {
        // 重复声明一次函数f
        function f() {
          console.log('I am inside!');
        }
      }

      // f(); // TypeError: f is not a function
    }());

    // 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
    {
      { // 块级作用域内部的函数声明语句，建议不要使用
        let a = 'secret';

        function f() {
          return a;
        }

        console.log(f());
      }

      { // 块级作用域内部，优先使用函数表达式
        let a = 'secret';
        let f = function() {
          return a;
        };

        console.log(f());
      }
    }

    // ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
    {
      // SyntaxError: Lexical declaration cannot appear in a single-statement context
      // if (true) let x = 1

      if (true) {
        let x = 1;
      }

    }

    { // ES5
      'use strict';
      if (true) {
        function f1() {
        }
      }

      if (true)
          // Function statement not at top level of a program or function is prohibited
        function f2() {
        }
    }
  }

  // 3.const 命令
  {
    // 基本用法
    const PI = 3.1415;
    console.log(PI); // 3.1415

    // PI = 3;
    // TypeError: Assignment to constant variable.

    /*
      const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
      const的作用域与let命令相同：只在声明所在的块级作用域内有效。
      const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
     */
    // const foo;
    // SyntaxError: Missing initializer in const declaration

    if (true) {
      // console.log(MAX) // ReferenceError: Cannot access 'MAX' before initialization
      const MAX = 5;
    }

    // console.log(MAX) // Uncaught ReferenceError: MAX is not defined
  }

  {
    // 本质
    /*
      const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
    对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
    但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的
    （即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
     */
    const foo = {};

    // 为 foo 添加一个属性，可以成功
    foo.prop = 123;
    console.log(foo.prop); // 123

    // 将 foo 指向另一个对象，就会报错
    // foo = {}; // TypeError: Assignment to constant variable.

    // 常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，
    // 即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

    {
      const a = [];
      a.push('Hello'); // 可执行
      a.length = 0;    // 可执行
      // a = ['Dave'];    // // TypeError: Assignment to constant variable.
    }

    // 如果真的想将对象冻结，应该使用Object.freeze方法。
    {
      'use strict';
      const foo = Object.freeze({});

      // 常规模式时，下面一行不起作用；
      // 严格模式时，该行会报错
      foo.prop = 123;

      console.log(foo.prop);
    }

    // 除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
    var constantize = (obj) => {
      Object.freeze(obj);
      Object.keys(obj).forEach((key, i) => {
        if (typeof obj[key] === 'object') {
          constantize(obj[key]);
        }
      });
    };
  }

  {
    // ES6 声明变量的六种方法
    /*
      ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，后面章节还会提到，
    另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。
     */
  }

  // 4.顶层对象的属性
  {
    /*
      顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。
    ES5 之中，顶层对象的属性与全局变量是等价的。顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。
      1. 没法在编译时就报出变量未声明的错误
      2. 程序员很容易不知不觉地就创建了全局变量
      3. 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
      window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。
    ES6 为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性
      let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
     */
    var a = 1;
    // 如果在 Node 的 REPL 环境，可以写成 global.a
    // 或者采用通用方法，写成 this.a
    // window.a // 1

    let b = 1;
    // window.b // undefined
  }

  // 5.globalThis 对象
  {
    /*
      浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
    浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。Node 里面，顶层对象是global，但其他环境都不支持。
    全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。
    函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。
    严格模式下，这时this会返回undefined。不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。
    如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用。
     */
    'use strict';

    function f() {
      return this;
    }

    console.log(f()); // Node -> global

    // 很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。
    // 方法一
    (typeof window !== 'undefined'
        ? window
        : (typeof process === 'object' &&
            typeof require === 'function' &&
            typeof global === 'object')
            ? global
            : this);

    // 方法二
    var getGlobal = function() {
      if (typeof self !== 'undefined') { return self; }
      if (typeof window !== 'undefined') { return window; }
      if (typeof global !== 'undefined') { return global; }
      throw new Error('unable to locate global object');
    };
  }
}
