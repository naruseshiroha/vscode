{
  // 1.二进制(0b)和八进制(0o)表示法
  {
    let e1 = 0b1111;
    let b1 = 0o123;
    console.log(e1 === 15, b1 === 83);

    let e = Number(e1);
    let b = Number(b1);
    console.log(e, b);
  }

  // 2.Number.isFinite(), Number.isNaN()
  {
    // 注意，如果参数类型不是数值，Number.isFinite一律返回false。
    // Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
    let n1 = -Infinity;
    let n2 = 0;
    let n3 = '';
    console.log(Number.isFinite(n1), Number.isFinite(n2), Number.isFinite(n3)); // false true false

    let n4 = NaN;
    console.log(Number.isNaN(n4), Number.isNaN(n3), Number.isNaN(n2)); // true false false
  }

  // 3.Number.parseInt(), Number.parseFloat()
  {
    // 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
    // ES5
    let n1 = parseInt('12.34#');
    let n2 = parseFloat('12.34#');
    console.log(n1, n2);

    // ES6
    let n3 = Number.parseInt('12.34#');
    let n4 = Number.parseFloat('12.34#');
    console.log(n3, n4);
  }

  // 4.Number.isInteger()
  {
    // JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
    // 如果参数不是数值，Number.isInteger返回false。
    let n = 12.1;
    let m = -0.0;
    console.log(Number.isInteger(n), Number.isInteger(m), Number.isInteger());

    /*
      注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到
        53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，
        第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。

        如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，
        会被自动转为 0。这时，Number.isInteger也会误判。
    */
    console.log(Number.isInteger(3.0000000000000002)); // true
    console.log(Number.isInteger(5E-324)); // true
  }

  // 5.Number.EPSILON 是 JavaScript 能够表示的最小精度。
  {
    // 误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。
    let x = Number.EPSILON === Math.pow(2, -52);
    let y = Number.EPSILON.toFixed(20);
    console.log(x, y);

    function withinErrorMargin(x, y) {
      return Math.abs(x - y) < Number.EPSILON;
    }

    console.log(0.1 + 0.2 === 0.3); // false
    console.log(withinErrorMargin(0.1 + 0.2, 0.3)); // true
  }

  // 6.安全整数和 Number.isSafeInteger()
  {
    /*
      Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
      JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
      ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
    */
    let a = Math.pow(2, 53); // 9007199254740992
    let b = a + 1 - 1; // 9007199254740991

    let c = Number.MAX_SAFE_INTEGER; // 9007199254740991
    let d = Number.MIN_SAFE_INTEGER;

    console.log(a === b); // false
    console.log(c, d, b === -d); // true

    console.log(Number.isSafeInteger(b), Number.isSafeInteger(a),
        Number.isSafeInteger(''));
  }

  // 7.Math 对象的扩展
  {
    // Math.trunc() 去除一个数的小数部分，返回整数部分。
    let n1 = 4.1;
    let n2 = 4.6;
    let m1 = -0.1;

    console.log(Number.parseInt(n1), Number.parseInt(n2), Number.parseInt(m1));
    console.log(Math.trunc(n1), Math.trunc(m1));

    let s1 = '';
    let b1 = true;
    let nu = null;
    let s2 = '0';
    let s3 = '12x';
    let un = undefined;

    console.log(Number.parseInt(s1), Number.parseInt(s2), Number.parseInt(s3),
        Number.parseInt(b1));
    console.log(Math.trunc(s1), Math.trunc(s3), Math.trunc(b1), Math.trunc(nu),
        Math.trunc(un)); // 0 NaN 1 0 NaN

    /*
      Math.sign()
        参数为正数，返回+1；
        参数为负数，返回-1；
        参数为 0，返回0；
        参数为-0，返回-0;
        其他值，返回NaN。
    */
    let c = 0;
    let d = -0;
    let e = NaN;
    console.log(Math.sign(c), Math.sign(d), Math.sign(e));

    /*
      Math.cbrt() 计算一个数的立方根
        对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值。
    */
    let x = '8';
    let y = 27;
    let z = 'hel';
    console.log(Math.cbrt(x), Math.cbrt(y), Math.cbrt(z)); // 2 3 NaN

    /*
      Math.clz32() 将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0
        左移运算符（<<）与Math.clz32方法直接相关
        对于小数，Math.clz32方法只考虑整数部分
        对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算
    */
    console.log(Math.clz32(1)); // 31
    console.log(Math.clz32(1 << 1)); // 30
    console.log(Math.clz32(3.9)); // 30
    console.log(Math.clz32(null)); // 32
    console.log(Math.clz32(' ')); // 32
    console.log(Math.clz32(true)); // 31
    console.log(Math.clz32(NaN)); // 32

    /*
      Math.imul() 返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数
    */
    console.log(Math.imul(2, 4));
    console.log(Math.imul(-2, 4));
    console.log(Math.imul(-2, -2));

    console.log((0x7fffffff * 0x7fffffff) | 0);
    console.log(Math.imul(0x7fffffff, 0x7fffffff));

    /*
      Math.fround() 返回一个数的32位单精度浮点数形式
      对于 -2^24 至 2^24 之间的整数（不含两个端点），返回结果与参数本身一致
      参数的绝对值大于 2^24，返回的结果便开始丢失精度
    */
    console.log(Math.fround(1));
    console.log(Math.fround(2 ** 24 - 1)); // 16777215
    console.log(Math.fround(2 ** 24)); // 16777216
    console.log(Math.fround(2 ** 24 + 1)); // 16777216
    /*
      Math.fround方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数。
      如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变
    */
    console.log(Math.fround(1.125)); // 1.125
    console.log(Math.fround(0.3)); // 0.30000001192092896

    /*
      对于 NaN 和 Infinity，此方法返回原值。对于其它类型的非数值，
      Math.fround 方法会先将其转为数值，再返回单精度浮点数
    */
    console.log(Math.fround(NaN)); // NaN
    console.log(Math.fround(Infinity)); // Infinity
    console.log(Math.fround([])); // 0
    console.log(Math.fround({})); // NaN

    /*
      Math.hypot() 返回所有参数的平方和的平方根
    */
    console.log(Math.hypot()); // 0
    console.log(Math.hypot(3, 4, '5')); // 7.0710678118654755
    console.log(Math.hypot((3, 4, 'foo'))); // NaN
    console.log(Math.hypot(-3)); // 3

    // 对数方法
    // 1.Math.expm1()
    // Math.expm1(x)返回 e^x - 1，即Math.exp(x) - 1
    console.log(Math.expm1(-1)); // -0.6321205588285577
    console.log(Math.expm1(1)); // 1.718281828459045

    // 2.Math.log1p()
    // Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN
    console.log(Math.log1p(1)); // 0.6931471805599453
    console.log(Math.log1p(-1)); //
    console.log(Math.log1p(-2)); //

    // 3.Math.log10()
    // Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN
    console.log(Math.log10(1)); // 0
    console.log(Math.log10(0)); // -Infinity
    console.log(Math.log10(-1)); // NaN
    console.log(Math.log10(100)); // 2

    // 4.Math.log2()
    // Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN
    console.log(Math.log2(2)); // 1
    console.log(Math.log2(1)); // 0
    console.log(Math.log2(0)); // -Infinity
    console.log(Math.log2(-2)); // NaN

    // 双曲函数方法
    /*
      Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
      Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
      Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
      Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
      Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
      Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
    */

  }

  // 8.指数运算符
  {
    // 这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的
    console.log(2 ** 3 ** 2); // 512

    // 指数运算符可以与等号结合，形成一个新的赋值运算符（**=）
    let a = 3;
    a **= 3;
    console.log(a); // 27
  }

  // 9.BigInt 数据类型
  {
    // 简介
    /*
      JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。
      一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是
      无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。
      二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity
    */
    console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1); // true
    console.log(Math.pow(2, 1024)); // Infinity

    // 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n
    const a = 2172141653n;
    const b = 15346349309n;
    const c = 2172141653;
    const d = 15346349309;
    console.log(a * b); // 33334444555566667777n
    console.log(c * d); // 33334444555566670000

    // BigInt 同样可以使用各种进制表示，都要加上后缀n
    let x = 0b1101n; // 二进制 13n
    let y = 0o777n; // 八进制 511n
    let z = 0xFFn; // 十六进制 255n
    console.log(x, y, z);

    // BigInt 与普通整数是两种值，它们之间并不相等。
    console.log(42n === 42); // false

    // typeof bigint
    console.log(typeof 42n); // bigint

    // BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突
    console.log(-0n);
    // console.log(+0n) // TypeError: Cannot convert a BigInt value to a number

    //
    /* let p = 1
    for (let i = 1; i <= 70; i++) {
      p *= i
    }
    console.log(p); // 1.197857166996989e+100 */
    let p = 1n;
    for (let i = 1n; i <= 70n; i++) {
      p *= i;
    }
    console.log(p); // 11978571669969891796072783721689098736458938142546425857555362864628009582789845319680000000000000000n
  }

  {
    // BigInt 对象
    // avaScript 原生提供BigInt对象，可以用作构造函数生成 BigInt 类型的数值。转换规则基本与Number()一致，将其他类型的值转为 BigInt
    /*
      BigInt(123) // 123n
      BigInt('123') // 123n
      BigInt(false) // 0n
      BigInt(true) // 1n
    */

    // BigInt()构造函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错
    /*
      new BigInt() // TypeError
      BigInt(undefined) //TypeError
      BigInt(null) // TypeError
      BigInt('123n') // SyntaxError
      BigInt('abc') // SyntaxError
    */

    // 参数如果是小数，也会报错。
    /*
      BigInt(1.5) // RangeError
      BigInt('1.5') // SyntaxError
    */

    /*
      BigInt 对象继承了 Object 对象的两个实例方法
        BigInt.prototype.toString()
        BigInt.prototype.valueOf()

      它还继承了 Number 对象的一个实例方法
        BigInt.prototype.toLocaleString()

       BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2^width - 1 之间对应的值
       BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2^width - 1 到 2^width - 1 - 1 之间对应的值
       BigInt.parseInt(string[, radix])：近似于Number.parseInt()，将一个字符串转换成指定进制的 BigInt
     */

    const max = 2n ** (64n - 1n) - 1n;

    console.log(BigInt.asIntN(64, max));
    console.log(BigInt.asIntN(64, max + 1n));
    console.log(BigInt.asUintN(64, max + 1n));
    /*
      max是64位带符号的 BigInt 所能表示的最大值。如果对这个值加1n，BigInt.asIntN()将会返回一个负值，
      因为这时新增的一位将被解释为符号位。而BigInt.asUintN()方法由于不存在符号位，所以可以正确返回结果
     */
    console.log(BigInt.asIntN(32, max)); // -1n
    console.log(BigInt.asUintN(32, max)); // 4294967295n
    // max是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃
  }

  {
    // 转换规则
    // 可以使用Boolean()、Number()和String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型
    console.log(Boolean(0n)); // false
    console.log(Boolean(1n)); // true
    console.log(Number(1n)); // 1
    console.log(String(1n)); // '1'

    // 取反运算符（!）也可以将 BigInt 转为布尔值
    console.log(!0n);
    console.log(!1n);
  }

  {
    // 数学运算
    // BigInt 类型的+、-、*和**这四个二元运算符，与 Number 类型的行为一致。除法运算/会舍去小数部分，返回一个整数
    console.log(3 / 2); // 1.5
    console.log(3n / 2n); // 1n

    /*
    * 几乎所有的数值运算符都可以用在 BigInt，但是有两个例外
    *   不带符号的右移位运算符>>>
    *     因为>>>运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符>>
    *   一元的求正运算符+
    *     因为一元运算符+在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定+1n会报错
    * */

    // BigInt 不能与普通数值进行混合运算。
    // console.log(1n + 1) //  TypeError: Cannot mix BigInt and other types, use explicit conversions

    // 如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错
    // console.log(Math.sqrt(4n)) // TypeError: Cannot convert a BigInt value to a number
    console.log(Math.sqrt(Number(4n))); // 2

    /*
    * asm.js 里面，|0跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与|0进行运算会报错
    * */
    console.log(1 | 0); // 1
    // console.log(1n|0) // TypeError
  }

  {
    // 其他运算
    console.log(0n < 1); // true
    console.log(0n < true); // true
    console.log(0n == 0); // true
    console.log(0n === 0); // false

    // BigInt 与字符串混合运算时，会先转为字符串，再进行运算。
    console.log('' + 123n === '123'); // true
  }
}
