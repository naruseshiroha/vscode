{
  // 1.函数参数的默认值
  {
    // 基本用法
    /*
      ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法
        function fn(x, y) {
          y = y || 'World';
          console.log(x, y);
        }
      这种写法的缺点在于，如果参数y赋值了，但是对应的布尔值为false，则该赋值不起作用
        function fn(x, y) {
          if (typeof y === 'undefined') {
            y = 'World';
          }
          console.log(x, y);
        }
     */

    // ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面
    // 参数变量是默认声明的，所以不能用let或const再次声明。
    function fn(x, y = 'world') {
      // let x = 1 // SyntaxError: Identifier 'x' has already been declared
      console.log(x, y);
    }

    fn('hello');
    fn('hello', 'javascript');

    function Point(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }

    const p = new Point();
    console.log(p);

    // 使用参数默认值时，函数不能有同名参数
    function fn2(x = 1, y = 3) {
      // function fn2(x = 1, x = 2, y = 3) {
      // SyntaxError: Duplicate parameter name not allowed in this context
      console.log(x, y);
    }

    fn2();

    // 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的
    let x = 99;

    function fn3(p = x + 1) {
      console.log(p);
    }

    fn3(); // 100
    fn3(); // 100

    x = 100;
    fn3(); // 101
  }

  {
    // 与解构赋值默认值结合使用
    function foo({x, y = 5}) {
      console.log(x, y);
    }

    foo({}); // undefined 5
    foo({x: 1}); // 1 5
    foo({x: 1, y: 2}); // 1 2
    // foo() // TypeError: Cannot read property 'x' of undefined

    function foo2({x, y = 5} = {}) {
      console.log(x, y);
    }

    foo2(); // undefined 5

    function fetch(url, {body = '', method = 'GET', headers = {}}) {
      console.log(method);
    }

    fetch('http://example.com', {}); // "GET"
    // fetch('http://example.com') // TypeError: Cannot destructure property `body` of 'undefined' or 'null'.

    function fetch2(url, {body = '', method = 'GET', headers = {}} = {}) {
      console.log(method);
    }

    fetch2('http://example.com'); // "GET"

    function m1({x = 0, y = 0} = {}) {
      console.log([x, y]);
    }

    function m2({x, y} = {x: 0, y: 0}) {
      ([x, y]);
    }

    m1(); // 0 0
    m2(); // 0 0

    m1({}); // 0 0
    m2({}); // undefined undefined

    function f(x = 1, y) {
      console.log([x, y]);
    }

    f(); // [1, undefined]
    f(2); // [2, undefined])
    // f(, 1) // 报错
    f(undefined, 1); // [1, 1]

    // 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
    f(null, 1); // [null, 1]
  }

  {
    // 函数的 length 属性
    // 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真
    function a(a) {
    }

    function b(b = 1) {
    }

    function c(c, d = 2) {
    }

    console.log(a.length, b.length, c.length); // 1 0 1

    // 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
    function d(x = 0, y, z) {
    }

    function e(x, y = 1, z) {
    }

    console.log(d.length, e.length); // 0 1
  }

  {
    // 作用域
    /*
      一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。
      等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
     */
    let x = 1;

    function f(x, y = x) {
      console.log(y);
    }

    f(2); // 2

    let z = 2;

    function f2(y = z) {
      let z = 1;
      console.log(y);
    }

    f2(); // 2

    /*let x = 1

    function foo(x = x) {
      // let x = x // x is not defined
      // ...
    }

    foo() // ReferenceError: x is not defined*/

    {
      let foo = 'outer';

      function bar(func = () => foo) {
        let foo = 'inner';
        console.log(func());
      }

      bar(); // outer
    }

    /*function bar(func = () => foo) {
      let foo = 'inner'
      console.log(func())
    }

    bar() // ReferenceError: foo is not defined*/

    {
      let x = 1;

      function foo(x, y = function() {
        x = 2;
      }) {
        var x = 3;
        y();
        console.log(x);
      }

      foo(); // 3
      console.log(x); // 1
    }
  }

  {
    // 可以将参数默认值设为undefined，表明这个参数是可以省略的
    function foo(optional = undefined) {
      // ...
    }
  }

  // 2.rest 参数
  {
    /*
      ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
      rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中
    */
    function add(...values) {
      let sum = 0;

      for (var val of values) {
        sum += val;
      }

      return sum;
    }

    console.log(add(2, 5, 3)); // 10

    // arguments变量的写法
    /* function sortNumbers() {
      // return Array.prototype.slice.call(arguments).sort();
      return Array.from(arguments).sort()
    } */

    // rest参数的写法
    const sortNumbers = (...numbers) => numbers.sort();

    function push(array, ...items) {
      items.forEach(item => array.push(item));
    }

    let a = [1];
    push(a, 2, 1, 3, 4);
    console.log(a);

    // 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
    // function fn(a, ...b, c) { } // SyntaxError: Rest parameter must be last formal parameter

    // 函数的length属性，不包括 rest 参数。
    console.log((function(a, ...b) { }).length); // 1
  }

  // 3.严格模式
  {/*
    从 ES5 开始，函数内部可以设定为严格模式。
    ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
    那么函数内部就不能显式设定为严格模式，否则会报错。
  */
    /* // 报错
    function doSomething(a, b = a) { // 默认值
      'use strict';
      // code
    }

    // 报错
    const doSomething = function ({ a, b }) { // 结构
      'use strict';
      // code
    };

    // 报错
    const doSomething = (...a) => { // rest 参数
      'use strict';
      // code
    };

    const obj = {
      // 报错
      doSomething({ a, b }) { // 解构
        'use strict';
        // code
      }
    }; */
    /*
      函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。
      这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。
    */
    // 报错
    /* function doSomething(value = 070) {
      'use strict';
      return value;
    } */
    /*
      两种方法可以规避这种限制
        第一种是设定全局性的严格模式，这是合法的。
        第二种是把函数包在一个无参数的立即执行函数里面。
    */
    /* {
      'use strict';

      function doSomething(a, b = a) {
        // code
      }
    } */
    /* {
      const doSomething = (function () {
        'use strict';
        return function (value = 42) {
          return value;
        };
      }());
    } */
  }

  // 4.name 属性
  {
    function foo() {
      console.log('foo');
    }

    console.log(foo.name); // foo

    // 如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。
    let f = function() { };
    console.log(f.name); // ES5 '' => ES6 'f'

    // 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
    let x = function y() { };
    console.log(x.name); // 'y'

    // Function构造函数返回的函数实例，name属性的值为anonymous。
    console.log(new Function().name); // 'anonymous'

    // bind返回的函数，name属性值会加上bound前缀
    console.log(foo.bind({}).name);
  }

  // 5.箭头函数
  {
    // 基本用法
    // 2个或以上参数()不能省略
    // 2句或以上代码{}不能省略
    let f = v => v;
    let fn = (a, b) => {
      a += 1;
      b += 1;
      return a + b;
    };

    // 如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
    // let fn2 = () => {a:1,b:2}
    let fn2 = () => { a: 1; }; //
    console.log(fn2()); // undefined

    // 箭头函数可以与变量解构结合使用。
    const full = ({first, last}) => first + ' ' + last;

    const headAndTail = (head, ...tail) => [head, tail];
  }

  {
    // 使用注意点
    /*
      （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
      （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
      （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
      （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
    */
    function foo() {
      setTimeout(() => {
        console.log('id:', this.id);
      }, 100);
    }

    var id = 21;

    foo.call({id: 42});

    function Timer() {
      this.s1 = 0;
      this.s2 = 0;
      // 箭头函数
      setInterval(() => this.s1++, 1000);
      // 普通函数
      setInterval(function() {
        // console.log(this.s2);
        this.s2++;
      }, 1000);
    }

    // var timer = new Timer();

    // setTimeout(() => console.log('s1: ', timer.s1), 3100);
    // setTimeout(() => console.log('s2: ', timer.s2), 3100);

    // 箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。
    let handle = {
      id: '123',
      init() {
        document.addEventListener('click', ev => this.doSomething(ev.type),
            false);
      },
      doSomething(type) {
        console.log(`handing ${type} for ${this.id}`);
      },
    };

    // 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
    function foo() {
      setTimeout(() => {
        console.log('args:', arguments);
      }, 100);
    }

    console.log(foo(2, 4, 6, 8));

    // 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
    let res = (function() {
      return [
        (() => this.x).bind({x: 'inner'})(),
      ];
    }).call({x: 'outer'});

    console.log(res); // outer
  }

  {
    // 不适用场合
    // 第一个场合是定义对象的方法，且该方法内部包括this。
    const cat = {
      lives: 9,
      jumps: () => {
        this.lives -= 1;

      },
      rap() {
        this.lives -= 1;
      },
    };
    cat.rap();
    cat.jumps();
    console.log(cat.lives);

    // 第二个场合是需要动态this的时候，也不应使用箭头函数。
    /*let button = document.getElementById('press');
    button.addEventListener('click', () => {
      this.classList.toggle('on');
    });*/
  }

  {
    // 嵌套的箭头函数
    let insert = (value) => ({
      into: (array) => ({
        after: (afterValue) => {
          array.splice(array.indexOf(afterValue) + 1, 0, value);
          return array;
        },
      }),
    });

    console.log(insert(2).into([1, 3]).after(1)); //[1, 2, 3]

    const pipeline = (...funcs) =>
        (val => funcs.reduce((a, b) => b(a), val));

    const plus1 = a => a + 1;
    const mult2 = a => a * 2;
    const addThenMult = pipeline(plus1, mult2);

    console.log(addThenMult(5));
    console.log(mult2(plus1(5)));
  }

  // 6.尾调用优化
  {
    // 什么是尾调用?
    // 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
    // 尾调用不一定出现在函数尾部，只要是最后一步操作即可。
    function f(x) {
      if (x > 0) {
        return m(x);
      }
      return n(x);
    }
  }

  {
    /*
      尾调用优化
      “尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。
      如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。
    */
    function f() {
      return g(3);
    }

    // f();

    // 等同于
    // g(3);

    // 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。
    function addOne(a) {
      var one = 1;

      function inner(b) {
        return b + one;
      }

      return inner(a);
    }

    // 上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。
    // 注意，目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。
  }

  {
    // 尾递归
    // 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
    function factorial(n) {
      if (n === 1) return 1;
      return n * factorial(n - 1);
    }

    function factorial2(n, total) {
      console.log('n=', n, 'total=', total);
      if (n === 1) return total;
      return factorial2(n - 1, n * total);
    }

    factorial(5);
    factorial2(5, 1);

    function fibonacci(n) {
      if (n <= 1) return 1;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }

    function fibonacci2(n, ac1 = 1, ac2 = 1) {
      if (n <= 1) return ac2;
      return fibonacci2(n - 1, ac2, ac1 + ac2);
    }

    fibonacci(5);
    fibonacci2(100);
  }

  {
    // 柯里化（currying） 将多参数的函数转换成单参数的形式。
    function currying(fn, n) {
      return function(m) {
        return fn.call(this, m, n);
      };
    }

    function tailFactorial(n, total) {
      if (n === 1) return total;
      return tailFactorial(n - 1, n * total);
    }

    const factorial = currying(tailFactorial, 1);

    factorial(5); // 120
  }

  {
    // 严格模式
    // ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
    // func.arguments：返回调用时函数的参数。
    // func.caller：返回调用当前函数的那个函数。
    function restricted() {
      'use strict';
      // restricted.caller;    // 报错
      // restricted.arguments; // 报错
    }

    restricted();
  }

  {
    // 尾递归优化的实现
    {
      function sum(x, y) {
        if (y > 0) {
          return sum.bind(null, x + 1, y - 1);
        } else {
          return x;
        }
      }

      function trampoline(f) {
        while (f && f instanceof Function) {
          f = f();
        }
        return f;
      }

      trampoline(sum(1, 100000));
    }

    {
      // 尾递归优化 实现
      function tco(f) {
        let value;
        let active = false;
        let accumulated = [];

        return function accumulator() {
          accumulated.push(arguments);
          if (!active) {
            active = true;
            while (accumulated.length) {
              value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
          }
        };
      }

      let sum = tco(function(x, y) {
        if (y > 0) {
          return sum(x + 1, y - 1);
        } else {
          return x;
        }
      });

      sum(1, 100000);
    }
  }

  // 7.函数参数得尾逗号
  {
    /*
      ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。
      此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。
     */
    function fn(a, b) { }

    fn(1, 2);
  }

  // 8.Function.prototype.toString()
  {
    // ES2019 对函数实例的toString()方法做出了修改。
    // ES2019 之前 toString()方法返回函数代码本身，以前会省略注释和空格。
    function foo() {
      /*comment*/
    }

    console.log(foo.toString());
  }

  // 9.catch 命令的参数省略
  /*
    JavaScript 语言的try...catch结构，以前明确要求catch命令后面必须跟参数，接受try代码块抛出的错误对象。
    ES2019 做出了改变，允许catch语句省略参数。
   */
  {
    {
      /*try {
      } catch (e) {
      }*/
     /* try {
      } catch {
      }*/
    }
  }
}


