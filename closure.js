var myObject = (function() {
  var counter = 0;
  return {
    increment: function(inc) {
      counter += inc;
    },
    getValue: function() {
      return counter;
    }
  };
});
/* obj = myObject()
console.log(obj.getValue())
obj.increment(1)
console.log(obj.getValue()) */

const datamodule = require("./datamodule");
console.log(datamodule.books)
console.log(datamodule.getAll())