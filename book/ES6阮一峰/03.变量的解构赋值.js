{
  // 1.数组的解构赋值
  {
    // 基本用法
    let [a, b, c] = [1, 2, 3];
    console.log(a, b, c); // 1 2 3

    let [foo, [[bar], baz]] = [1, [[2], 3]];
    console.log(foo, bar, baz); // 1 2 3

    let [, , third] = ['foo', 'bar', 'baz'];
    console.log(third); // 'baz'

    let [x, , y] = [1, 2, 3];
    console.log(x, y); // 1 3

    let [head, ...tail] = [1, 2, 3, 4];
    console.log(head, tail); // 1 [2,3,4]

    let [u, v, ...w] = ['a'];
    console.log(u, v, w); // a undefined []

    // 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
    /*let [a] = 1;
    let [b] = false; // TypeError: false is not iterable
    let [c] = NaN; // TypeError: NaN is not iterable
    let [d] = undefined;
    let [e] = null;
    let [f] = {};*/

    {
      let [x, y, z] = new Set(['a', 'b', 'c']);
      console.log(x, y, z);

      function* fibs() {
        let a = 0;
        let b = 1;
        while (true) {
          yield a;
          [a, b] = [b, a + b];
        }
      }

      let [first, second, third, fourth, fifth, sixth] = fibs();
      console.log(first, second, third, fourth, fifth, sixth);
    }
  }

  {
    // 默认值
    // ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
    {
      let [foo = true] = [];
      console.log(foo); // true

      let [a, b = 'b'] = ['a']; // a='a', b='b'
      console.log(a, b);
      let [c, d = 'd'] = ['c', undefined]; // c='c', y='d'
      console.log(c, d);
      let [e = 'e', f = 'f'] = [undefined, null]; // e='e' f=null
      console.log(e, f);
    }

    {
      function f() {
        console.log('function');
      }

      let [x = f()] = [, 1];

      console.log(x);
    }

    {
      let f = function() {
        console.log('f()');
      };

      let x;
      if ([1][1] === undefined) {
        x = f;
      } else {
        x = [, 1][1];
      }
      // console.log(Object.prototype.toString.call(x))
      console.log(x);
    }

    // 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
    {
      let [a = 1, b = a] = [];     // a=1; b=1
      let [c = 1, d = c] = [2];    // c=2; d=2
      let [e = 1, f = e] = [1, 2]; // e=1; f=2
      // let [g = h, h = 1] = [];     // Cannot access 'h' before initialization
      console.log(a, b, c, d, e, f);
    }
  }

  // 2.对象的解构赋值
  {
    // 简介
    const obj = {
      foo: 'aaa',
      bar: 'bbb',
    };

    let {xxx, bar, foo} = obj;
    console.log(Object.prototype.toString.call(xxx)); // Undefined
    console.log(xxx, foo, bar); // undefined 'aaa' 'bbb'

    console.log(Object.prototype.toString.call(console.log()));
  }

  {
    // 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
    const {log} = console;

    // 如果变量名与属性名不一致，必须写成下面这样。
    let obj = {first: 'hello', last: 'world'};
    let {first: f, last: l} = obj;
    log(f, l); // hello world
  }

  {
    // 与数组一样，解构也可以用于嵌套结构的对象。
    const node = {
      loc: {
        start: {
          line: 1,
          column: 5,
        },
      },
    };

    let {loc, loc: {start}, loc: {start: {line}}} = node;
    console.log(loc, start, line);

    let obj = {};
    let arr = [];

    ({foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true});

    console.log(obj, arr);
  }

  {
    // 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
    // TypeError: Cannot destructure property `bar` of 'undefined' or 'null'.
    // let {foo: {bar}} = {baz: 'baz'};

    // 注意，对象的解构赋值可以取到继承的属性。
    const obj1 = {};
    const obj2 = {foo: 'bar'};
    Object.setPrototypeOf(obj1, obj2);

    const {foo} = obj1;
    console.log(foo); // bar
  }

  {
    // 默认值
    // 对象的解构也可以指定默认值。默认值生效的条件是，对象的属性值严格等于undefined。
    var {x: y = 3} = {};
    console.log(y); // 3

    var {x: y = 3} = {x: 5};
    console.log(y); // 5
  }

  {
    // 注意点
    // （1）如果要将一个已经声明的变量用于解构赋值，必须非常小心。
    /*
      JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，
    避免 JavaScript 将其解释为代码块，才能解决这个问题。
     */
    // let x;
    // {x} = {x: 1}; // SyntaxError: Unexpected token '='

    let x;
    ({x} = {x: 1});
    console.log(x);

    // （2）解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
    ({} = [true, false]);
    ({} = 'abc');
    ({} = []);

    // （3）由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
    let arr = [1, 2, 3];
    let {0: first, [arr.length - 1]: last} = arr;
    console.log(first, last);
  }

  // 3. 字符串的解构赋值
  {
    // 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
    const [a, b, c, d, e] = 'hello';
    console.log(a, b, c, d, e);

    const {length} = 'hello';
    console.log(length);
  }

  // 4.数值和布尔值的解构赋值
  {
    // 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
    let {toString: nt} = 123;
    console.log(nt === Number.prototype.toString);

    let {toString: bt} = true;
    console.log(bt === Boolean.prototype.toString);

    /*
      解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
    由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
     */
    // TypeError: Cannot destructure property `prop` of 'undefined' or 'null'.
    // let { prop: x } = undefined;
    // let { prop: y } = null;
  }

  // 5.函数参数的解构赋值
  {
    function add([x, y]) {
      return x + y;
    }

    console.log(add([1, 2, 3, 4]));

    const arr = [[1, 2], [3, 4]].map(([a, b]) => a + b);
    console.log(arr);

    // 函数参数的解构也可以使用默认值。
    {
      // 函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。
      function move({x = 0, y = 0} = {}) {
        return [x, y];
      }

      console.log(move({x: 3, y: 8})); // [3, 8]
      console.log(move({x: 3})); // [3, 0]
      console.log(move({})); // [0, 0]
      console.log(move()); // [0, 0]
    }

    {
      // 为函数move的参数指定默认值，而不是为变量x和y指定默认值
      function move({x, y} = {x: 0, y: 0}) {
        return [x, y];
      }

      console.log(move({x: 3, y: 8})); // [3, 8]
      console.log(move({x: 3})); // [3, undefined]
      console.log(move({})); // [undefined, undefined]
      console.log(move()); // [0, 0]
    }
  }

  // 6.圆括号问题
  {
    // ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。不能使用圆括号的情况
    // （1）变量声明语句
    /*let [(a)] = [1];
    let {x: (c)} = {};
    let ({x: c}) = {};
    let {(x: c)} = {};
    let {(x): c} = {};
    let { o: ({ p: p }) } = { o: { p: 2 } };*/
    // 它们都是变量声明语句，模式不能使用圆括号。

    // （2）函数参数
    /*function f([(z)]) {
        return z;
    }

    function f([z, (x)]) {
        return x;
    }*/

    // （3）赋值语句的模式
    // ({ p: a }) = { p: 42 };
    // ([a]) = [5];
  }

  {
    // 可以使用圆括号的情况
    [(b)] = [3];
    console.log(b);
    ({p: (d)} = {});
    console.log(d);
    [(parseInt.prop)] = [3];
    console.log(parseInt.prop);
  }

  // 7.用途
  // （1）交换变量的值
  {
    let x = 1;
    let y = 2;
    [x, y] = [y, x];
    console.log(x, y);
  }
  // （2）从函数返回多个值
  {
    // 返回一个数组
    function example() {
      return [1, 2, 3];
    }

    let [a, b, c] = example();
    console.log(a, b, c);
  }
  {
    // 返回一个对象
    function example() {
      return {
        foo: 1,
        bar: 2,
      };
    }

    let {foo, bar} = example();
    console.log(foo, bar);
  }
  // （3）函数参数的定义
  {
    // 参数是一组有次序的值
    function f([x, y, z]) {
      // ...
    }

    f([1, 2, 3]);

    // 参数是一组无次序的值
    function f({x, y, z}) {
      // ...
    }

    f({z: 3, y: 2, x: 1});
  }
  // （4）提取 JSON 数据
  {
    let jsonData = {
      id: 42,
      status: 'OK',
      data: [867, 5309],
    };

    let {id, status, data: number} = jsonData;

    console.log(id, status, number);
    // 42, "OK", [867, 5309]
  }
  // （5）函数参数的默认值
  {
    let jQuery = {};
    jQuery.ajax = function(url, {
      async = true,
      beforeSend = function() {
      },
      cache = true,
      complete = function() {
      },
      crossDomain = false,
      global = true,
      // ... more config
    } = {}) {
      // ... do stuff
    };
  }
  // （6）遍历 Map 结构
  {
    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
      console.log(key + ' is ' + value);
    }
    // first is hello
    // second is world

    // 获取键名
    for (let [key] of map) {
      // ...
    }

    // 获取键值
    for (let [, value] of map) {
      // ...
    }
  }
  // （7）输入模块的指定方法
  {
    const {SourceMapConsumer, SourceNode} = require('source-map');
  }
}
