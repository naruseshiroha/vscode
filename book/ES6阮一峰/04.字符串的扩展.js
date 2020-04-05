{
  // 1.字符的 Unicode 表示法
  {
    /*
      这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。
    "\uD842\uDFB7"    // "𠮷"
    "\u20BB7"         // " 7"
    JavaScript 会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。
    ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。
     */
    console.log('\u0061');
    // "a"

    console.log('\uD842\uDFB7');
    // "𠮷"

    console.log('\u20BB7');
    // " 7"
    console.log('\u{20BB7}');
    // "𠮷"

    console.log('\u{41}\u{42}\u{43}');
    // "ABC"

    let hello = 123;
    console.log(hell\u{6F}); // 123

    console.log('\u{1F680}' === '\uD83D\uDE80');
    // true

    // 有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符。
    console.log('\z' === 'z');  // true
    console.log('\172' === 'z'); // true
    console.log('\x7A' === 'z'); // true
    console.log('\u007A' === 'z'); // true
    console.log('\u{7A}' === 'z');// true
  }

  // 2. 字符串的遍历器接口
  {
    // ES6 为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
    for (const ch of 'hello') {
      console.log(ch);
    }

    // 除了遍历字符串，这个遍历器(for of)最大的优点是可以识别大于0xFFFF的码点，
    // 传统的for循环无法识别这样的码点。

    let text = String.fromCodePoint(0x20BB7);
    // console.log(Object.prototype.toString.call(text))
    for (let i = 0; i < text.length; i++) {
      console.log(text[i]);
    }

    for (let i of text) {
      console.log(i);
    }
  }

  // 3. 直接输入 U+2028 和 U+2029
  {
    console.log('中' === '\u4e2d');

    // JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。
    /*
      U+005C：反斜杠（reverse solidus)
      U+000D：回车（carriage return）
      U+2028：行分隔符（line separator）
      U+2029：段分隔符（paragraph separator）
      U+000A：换行符（line feed）
     */
    // JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，
    // ES2019 允许JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。
    const PS = eval('\'\u2029\'');
  }

  // 4.JSON.stringify() 的改造
  {
    /*
      根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的JSON.stringify()方法有可能返回不符合 UTF-8 标准的字符串。
    为了确保返回的是合法的 UTF-8 字符，ES2019 改变了JSON.stringify()的行为。
    如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。
     */
    let s1 = JSON.stringify('\u{D834}'); // ""\\uD834""
    console.log(s1);
    let s2 = JSON.stringify('\uDF06\uD834'); // ""\\udf06\\ud834""
    console.log(s2);
  }

  // 5.模板字符串
  {
    /*
      模板字符串（template string）是增强版的字符串，用反引号（`）标识。
      它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
      普通字符串
     */
    const s1 = `In JavaScript '\\n' is a line-feed.`;

    // 多行字符串
    const s2 = `In JavaScript this is not legal.`;

    console.log(s1, s2);
    console.log(`string text line 1 
string text line 2`);

    // 字符串中嵌入变量
    let name = 'Bob', time = 'today';
    const s3 = `Hello ${name}, how are you ${time}?`;
    console.log(s3);
  }

  {
    // 代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
    let greeting = `\`Yo\` World!`;
    console.log(greeting);

    /*
      如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
      如果你不想要这个换行，可以使用trim方法消除它。
     */
    /*$('#list').html(`
    <ul>
      <li>first</li>
      <li>second</li>
    </ul>
    `.trim());*/

    // 模板字符串中嵌入变量，需要将变量名写在${}之中。
    function authorize(user, action) {
      if (!user.hasPrivilege(action)) {
        throw new Error(
            // 传统写法为
            // 'User '
            // + user.name
            // + ' is not authorized to do '
            // + action
            // + '.'
            `User ${user.name} is not authorized to do ${action}.`);
      }
    }

    // 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
    let x = 1;
    let y = 2;

    const s1 = `${x} + ${y * 2} = ${x + y * 2}`;
    console.log(s1); // "1 + 4 = 5"

    // 模板字符串之中还能调用函数。
    function fn() {
      return 'Hello World';
    }

    // 如果模板字符串中的变量没有声明，将报错。
    // 变量place没有声明
    // let msg = `Hello, ${place}`; // place is not defined

    const s2 = `foo ${fn()} bar`;
    console.log(s2); // foo Hello World bar

    // 如果需要引用模板字符串本身，在需要时执行，可以写成函数。
    let func = (name) => `Hello ${name}!`;
    console.log(func('Jack')); // "Hello Jack!"
  }

  // 6.实例：模板编译
  {
    let template = `
  <ul>
    <% for(let i=0; i < data.supplies.length; i++) { %>
      <li><%= data.supplies[i] %></li>
    <% } %>
  </ul>
`;
  }

  // 7.标签模板
  {
    // alert`123`
    // 等同于
    // alert(123)

    let a = 5;
    let b = 10;

    function tag(s, v1, v2) {
      console.log(s[0]);
      console.log(s[1]);
      console.log(s[2]);
      console.log(v1);
      console.log(v2);

      return 'OK';
    }

    console.log(tag`Hello ${a + b} world ${a * b}`);

    console.log`123`;
  }
}
