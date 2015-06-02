var path = require('path');
var root = '../';


module.exports = {
  load: function(thepath) {
    return require(path.normalize(root + thepath));
  }
}