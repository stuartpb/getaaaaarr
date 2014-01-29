var dns = require('dns');
var queue = require('queue-async');

function makeRecord(type) {
  return function (address) {
    return {
      type: type,
      address: address
    };
  };
}

module.exports = function(domain, cb) {
  queue()
    .defer(dns.resolve, domain, 'A')
    .defer(dns.resolve, domain, 'AAAA')
    .await(function(err, recs4, recs6) {
      if (err) return cb(err);
      return cb(null,[].concat(
        recs4.map(makeRecord('A')),
        recs6.map(makeRecord('AAAA'))
      ));
    });
}
