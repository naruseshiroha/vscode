{
    // 1.扩展运算符
    {
      // 含义
      // 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
      console.log(...[1, 2, , 3]);
  
      // 函数调用
      function push(array, ...items) {
        array.push(...items);
      }
  
      // 与正常的函数参数可以结合使用
      function f(v, w, x, y, z) { }
  
      const args = [0, 1];
      f(-1, ...args, 2, ...[3]);
  
      // 后面还可以放置表达式
      const arr = [...(-1 > 0 ? ['a'] : []), 'b']; // ['b']
  
      // 后面是一个空数组,不产生任何效果
      let x = [...[], 1]; // [1]
  
      // 注意,只有函数调用时,扩展运算符才可以放在圆括号中,否则会报错
      // console.log((...[], 1)); SyntaxError: Rest parameter must be last formal parameter
      console.log(...[], 1);
    }
  
    {
      // 替代函数的 apply 方法
      let args = [0, 1, 2];
  
      // ES5
      function foo(x, y, z) { }
  
      foo.apply(null, args);
  
      // ES6
      function bar() {}
  
      bar(...args);
  
      let arr1 = [1, 2, 3];
      // ES5
      Math.max.apply(null, arr1);
      // ES6
      Math.max(...arr1);
      Math.max(1, 2, 3);
  
      let arr2 = [4, 5, 6];
      // ES5
      Array.prototype.push.apply(arr1, arr2);
      // ES6
      arr1.push(...arr2); // [1,2,3,4,5,6]
  
      // ES5
      new (Date.bind.apply(Date, [null, 2020, 1, 1]));
      new Date(...[2020, 1, 1]); // 2020-01-31T15:00:00.000Z
    }
  
    {
      // 扩展运算符的应用
      {
        //（1）复制数组
        // 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
  
        let a1 = [1, 2];
        let a2;
        // ES5
        a2 = a1.concat(); // 返回原数组的克隆
        a2[0] = 2;
        console.log(a1); // [1,2]
  
        // ES6
        a2 = a1; // 复制了指向底层数据结构的指针
        a2[0] = 2;
        console.log(a1); // [2,2]
  
        // 扩展运算符提供了复制数组的简便写法
        a1 = [1, 2];
        a2 = [...a1];
        console.log(a2);
        [...a2] = a1;
        console.log(a2); // [1,2]
      }
  
      {
        //（2）合并数组
        const arr1 = ['a', 'b'];
        const arr2 = ['c'];
        const arr3 = ['d', 'e'];
        // ES5
        arr1.concat(arr2, arr3);
  
        // ES6
        let x = [...arr1, arr2, arr3]; // ['a','b','c','d','e']
  
        // 都是浅拷贝,如果修改了引用指向的值,会同步反映到新数组。
      }
  
      {
        //（3）与解构赋值结合
        const [first, second, ...rest] = ['foo']; // 'foo' undefined []
  
        // 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
        // const [...args,xxx] = []; // SyntaxError: Rest element must be last element
      }
  
      {
        //（4）字符串
        // 将字符串转为真正的数组
        let arr = [...'hello']; // ['h','e','l','l','o']
  
        function length(str) {
          // return str.length; // 会将四个字节的 Unicode 字符，识别为 2 个字符
          return [...str].length;
        }
  
        console.log(length('x\uD83D\uDE80y')); // 3
      }
  
      {
        //（5）实现了 Iterator 接口的对象
        // 任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。
        // let nodeList = document.querySelectorAll('div');
        // let array = [...nodeList];
      }
  
      {
        //（6）Map 和 Set 结构，Generator 函数
        let map = new Map([
          [1, 'one'],
          [2, 'two'],
          [3, 'three'],
        ]);
  
        let ks = [...map.keys()]; // [ 1, 2, 3 ]
        let vs = [...map.values()]; // [ 'one', 'two', 'three' ]
        let kvs = [...map.entries()]; // [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]
  
        let set = new Set([1, 1, 2, 3, 2, 1, 0]);
  
        let ss = [...set]; // [ 1, 2, 3, 0 ]
  
        // Generator 函数运行后，返回一个[Object Generator]遍历器对象，因此也可以使用扩展运算符。
        const go = function* () {
          yield 1;
          yield 2;
          yield 1;
          yield 0;
        };
  
        let res = [...go()]; // [ 1, 2, 1, 0 ]
      }
    }
  
    // 2.Array.from()
    {
      // Array.from方法用于将两类对象转为真正的数组：
      // 类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
      let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3,
      };
  
      // ES5
      [].slice.call(arrayLike);
  
      // ES6
      Array.from(arrayLike); // [ 'a', 'b', 'c' ]
  
      function foo() {
        let args = Array.from(arguments);
      }
  
      Array.from('abc'); // [ 'a', 'b', 'c' ]
  
      // 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
      let arr = [1, , 2]; // [ 1, <1 empty item>, 2 ]
      let brr = Array.from([1, , 2]); // [ 1, undefined, 2 ]
  
      // 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。
      // Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。
      // Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
      let crr = Array.from({length: 3}, (i, v) => v); // [ 0, 1, 2 ]
  
      // 对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
      const toArray = (
          () => Array.from ? Array.from : obj => [].slice.call(obj)
      )();
  
      // 能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
      function countSymbols(string) {
        return Array.from(string).length;
      }
    }
  
    // 3.Array.of()
    {
      // Array.of方法用于将一组值，转换为数组。
      Array.of(3, 11, 8); // [ 3, 11, 8 ]
      Array.of(3); // [ 3 ]
      Array.of(); // []
  
      Array(); // []
      Array(3); // [ , , , ]
      Array(3, 11, 8); // [ 3, 11, 8 ]
  
      // Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
      // Array.of方法可以用下面的代码模拟实现。
      function ArrayOf() {
        return [].slice.call(arguments);
      }
    }
  
    // 4.数组实例的 copyWithin()
    {
      // 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组
      /*
        Array.prototype.copyWithin(target, start = 0, end = this.length)
          target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
          start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
          end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
       */
      [1, 2, 3, 4, 5].copyWithin(0, -2, -1); // [ 4, 2, 3, 4, 5 ]
    }
  
    // 5.数组实例的 find() 和 findIndex()
    {
      // 数组实例的find方法，用于找出第一个符合条件的数组成员。如果没有符合条件的成员，则返回undefined。
      [1, 5, 10, 15].find((value, index, arr) => value > 9); // 10
  
      // 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
      [1, 5, 10, 15].findIndex((value, index, arr) => value > 9); // 2
  
      // 这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
      [NaN].indexOf(NaN); // -1
      [NaN].findIndex(y => Object.is(NaN, y)); // 0
    }
  
    // 6.数组实例的 fill()
    {
      // fill方法使用给定值，填充一个数组。数组中已有的元素，会被全部抹去。
      // Array.prototype.fill(value[, start=0[, end=this.length]]
      ['a', 'b', 'c'].fill(7, 1, 2); // [ 'a', 7, 'b' ]
  
      // 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
      let arr = new Array(3).fill([]);
      arr[0].push(5); // [ [ 5 ], [ 5 ], [ 5 ] ]
      console.log(arr);
    }
  
    // 7.数组实例的 entries()，keys() 和 values()
    {
      let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
      ]);
  
      for (const k of [...map.keys()]) {
        console.log('k=' + k); // [ 1, 2, 3 ]
      }
  
      for (const v of [...map.values()]) {
        console.log('v=' + v);// [ 'one', 'two', 'three' ]
      }
  
      for (const [k, v] of [...map.entries()]) {
        console.log('k=' + k, 'v=' + v);// [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]
      }
  
      // 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
      let letter = ['a', 'b', 'c'];
      let entries = letter.entries();
      console.log(entries.next().value);
      console.log(entries.next().value);
      console.log(entries.next().value);
    }
  
    // 8.数组实例的 includes()
    {
      // Array.prototype.includes(valueToFind[, fromIndex]) boolean
      // 表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。
      [1, 2, 3].includes(3, 3);  // false
      [1, 2, 3].includes(2, -2); // true
  
      // indexOf方法有两个缺点
      // 1.一是不够语义化  2.使用严格相等运算符（===）进行判断，这会导致对NaN的误判。
      [NaN].indexOf(NaN); // -1
      [NaN].includes(NaN); // true
  
      // 下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。
      const contains = (() =>
              Array.prototype.includes
                  ? (arr, value) => arr.includes(value)
                  : (arr, value) => arr.some(el => el === value)
      )();
  
      // Map 和 Set 数据结构有一个has方法，需要注意与includes区分。
      // Map 结构的has方法，是用来查找键名的，比如
      // Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
      // Set 结构的has方法，是用来查找值的，比如
      // Set.prototype.has(value)、WeakSet.prototype.has(value)。
    }
  
    // 9.数组实例的 flat()，flatMap()
    {
      // Array.prototype.flat([depth=1])
      // 将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
      // 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
      [1, [2, [3]]].flat(Infinity); // [ 1, 2, 3 ]
  
      // 如果原数组有空位，flat()方法会跳过空位。
      [1, 2, , 3].flat();// [ 1, 2, 3 ]
  
      // flatMap() => flat().map()
      // arr.flatMap(function callback(currentValue[, index[, array]]) {
      //   // ...
      // }[, thisArg])
      [1, 0, , 3].flatMap(Boolean); // [ true, false, true ]
    }
  
    // 10.数组的空位
    {
      // 空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
      console.log(0 in [undefined, undefined, undefined]); // true
      console.log(0 in Array(3)); // false
  
      /*
        forEach(), filter(), reduce(), every() 和some()都会跳过空位。
        map()会跳过空位，但会保留这个值
        join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
       */
      // ES6 则是明确将空位转为undefined。
      Array.from([1, , 1]); // [ 1, undefined, 1 ]
      // 扩展运算符（...）也会将空位转为undefined。
      arr = [...[1, , 1]]; // [ 1, undefined, 1 ]
      // copyWithin()会连空位一起拷贝。
      [, 'a', 'b'].copyWithin(2, 0); // [ , "a", , "a" ]
      // fill()会将空位视为正常的数组位置。
      new Array(3).fill('a'); // [ "a", "a", "a"]
      // for...of循环也会遍历空位。
      for (const i of Array(3)) {
        console.log(i, 1);
      }
      //  entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
    }
  
    // 11.Array.prototype.sort() 的排序稳定性
    {
      // 排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变。
      // 插入排序、合并排序、冒泡排序等都是稳定的
      // 堆排序、快速排序等是不稳定的
      // ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。
    }
  }