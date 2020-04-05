{
  // 代码片段一
  name = "The Window";
  let object = {
    name: "My Object",
    getNameFunc: function () {
      return function () {
        return this.name;
      };
    }
  };
  console.log(object.getNameFunc()()); // The Window

  // 代码片段二
  name2 = "The Window";
  let object2 = {
    name2: "My Object",
    getNameFunc: function () {
      let that = this;
      return function () {
        return that.name2;
      };
    }
  };
  console.log(object2.getNameFunc()()); // My Object
}