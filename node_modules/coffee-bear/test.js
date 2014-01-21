(function() {
  'use strict';

  var coffeeBear = require('./index');

  coffeeBear(function(err, data) {
    if (err) { throw err; }

    if (Object.keys(data).length > 0) { return; }

    throw "Can't get coffee";
  });
})();
