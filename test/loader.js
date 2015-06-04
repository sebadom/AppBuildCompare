var proxyquire = require('proxyquire'),
    path = require('path'),
    root = '../';


exports.load = function(thepath, stubs) {
    return proxyquire(path.normalize(root + thepath), stubs || {});
};