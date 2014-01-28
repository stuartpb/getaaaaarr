var dns = require('native-dns');

module.exports = function(domain, cb) {
  dns.resolve(domain, function(err, records) {
    if (err) return cb(err);
    var arecs = [];
    for (var i = 0; i < records.length; i++) {
      if ( records[i].type == dns.consts.NAME_TO_QTYPE.A
        || records[i].type == dns.consts.NAME_TO_QTYPE.AAAA) {
          records[i].type = dns.consts.QTYPE_TO_NAME[records[i].type];
          arecs[arecs.length] = records[i];
        }
    }
    return cb(null,arecs);
  })
}
