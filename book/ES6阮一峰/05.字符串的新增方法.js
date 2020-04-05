{
  // 1.String.fromCodePoint()
  {
    // ES5 提供String.fromCharCode()方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于0xFFFF的字符。
    let a = String.fromCharCode(0x20BB7);
    // ஷ
    console.log(a);

    let b = String.fromCodePoint(0x20BB7);
    // "𠮷"
    console.log(b);

    /*如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。*/
    let flag = String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y';
    // true
    console.log(flag);
  }

  // 2.String.raw()
  {
    // 该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
    const a = String.raw`Hi\n${2 + 3}!`;
    // 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
    console.log(a);

    const b = String.raw`Hi\u000A!`;
    // 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"
    console.log(b);

    const c = String.raw`Hi\\n`;
    // 返回 "Hi\\n"
    console.log(c);

    const d = String.raw`Hi\\n` === 'Hi\\\\n'; // true
    console.log(d);

    const e = String.raw({raw: ['foo', 'bar']}, 1 + 2); // "foo3bar"
    console.log(e);
  }

  // 3.codePointAt()
  {
    // 对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。
    const s = '𠮷';

    console.log(s.length);
    console.log(s.charAt(0));
    console.log(s.charAt(1));
    console.log(s.charCodeAt(0));
    console.log(s.charCodeAt(1));
  }

  {
    let s = '𠮷a';
    for (let ch of s) {
      console.log(ch.codePointAt(0).toString(16)); // 20bb7   61
    }

    // codePointAt()方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
    function is32Bit(c) {
      return c.codePointAt(0) > 0xFFFF;
    }

    console.log(is32Bit('𠮷')); // true
    console.log(is32Bit('吉')); // false
  }

  // 4.实例方法：normalize()
  {
    // ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
    console.log('\u01D1' === '\u004F\u030C'); // false
    console.log('\u01D1'.length); // 1
    console.log('\u004F\u030C'.length); // 2

    /*
      normalize方法可以接受一个参数来指定normalize的方式，参数的四个可选值如下。
      NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），
      返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
      NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），
      即在标准等价的前提下，返回合成字符分解的多个简单字符。
      NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），
      返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。
      （这只是用来举例，normalize方法不能识别中文。）
      NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），
      即在兼容等价的前提下，返回合成字符分解的多个简单字符。
     */
    console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize());

    console.log('\u004F\u030C'.normalize('NFC').length); // 1
    console.log('\u004F\u030C'.normalize('NFD').length); // 2
  }

  // 5.实例方法：includes(), startsWith(), endsWith()
  {
    /*
      使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
    */
    let s = 'Hello world!';

    const a = s.startsWith('world', 6); // true
    const b = s.endsWith('Hello', 5); // true
    const c = s.includes('Hello', 6); // false

    console.log(a, b, c);
  }

  // 6.实例方法：repeat()
  {
    /*
      repeat方法返回一个新字符串，表示将原字符串重复n次。
      参数如果是小数，会被取整。
      如果repeat的参数是负数或者Infinity，会报错。
      如果参数是 0 到 -1 之间的小数，则等同于 0，因为会先进行取整运算。取整以后等于-0，repeat视同为 0。
      参数NaN等同于 0。 true = 1    false = 0
      如果repeat的参数是字符串，则会先转换成数字。
     */
    let a = 'x'.repeat(0);
    let b = 'x'.repeat(1);
    let c = 'x'.repeat(2.3);
    // s = 'x'.repeat(-1) // RangeError: Invalid count value
    // s = 'x'.repeat(Infinity) // RangeError: Invalid count value
    let d = 'x'.repeat(-0.9);
    let e = 'x'.repeat(NaN);
    let f = 'x'.repeat('x');
    let g = 'x'.repeat('3.3');
    let h = 'x'.repeat(false);
    let i = 'x'.repeat(true);
    console.log(a, b, c, d, e, f, g, h, i);
  }

  // 7.实例方法：padStart()，padEnd()
  {
    /*
      padStart()用于头部补全，padEnd()用于尾部补全。
      padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
      如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
      如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
      如果省略第二个参数，默认使用空格补全长度。
     */
    const a = 'x'.padStart(5, 'ab');
    const b = 'y'.padStart(4);
    const c = 'zzz'.padEnd(2);
    const d = 'a'.padStart(10, '0123456789');
    const e = 'bc'.padStart(5);
    console.log(a, b, c, d, e);
    // padStart()的常见用途是为数值补全指定位数。
    const f = '1'.padStart(10, '0');
    console.log(f);
    // 另一个用途是提示字符串格式
    const g = '09-12'.padStart(10, 'YYYY-MM-DD');
    console.log(g);
  }

  // 8.实例方法：trimStart()，trimEnd()
  {
    /*
      ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，
      trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
      浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。
     */
    const s = '  abc  ';
    const a = s.trimStart();
    const b = s.trimEnd();
    const c = s.trimLeft();
    const d = s.trimRight();
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
  }

  // 9.实例方法：matchAll()
}

