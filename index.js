'use strict';

var _bsonStream = require('bson-stream');

var _bsonStream2 = _interopRequireDefault(_bsonStream);

var _bson = require('bson');

var _bson2 = _interopRequireDefault(_bson);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _parseDuration = require('parse-duration');

var _parseDuration2 = _interopRequireDefault(_parseDuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function usage() {
  console.log('mongodump-filter <duration> < everything.bson > filtered.bson');
  console.log('  duration: a valid duration expression, eg \'4h\', \'30d\', see https://www.npmjs.com/package/parse-duration');
  process.exit(1);
}

function parseOpts(args) {
  var opts = {};

  if (!args[0]) {
    usage();
  }

  try {
    opts.cutoff = (0, _parseDuration2.default)(args[0]);
  } catch (e) {
    console.error(args[0] + ' was not recognized as a valid duration');
    usage();
  }

  return opts;
}

var opts = parseOpts(process.argv.slice(2));
var BSON = new _bson2.default.BSONPure.BSON();
var CUTOFF_ID = _bson2.default.ObjectId.createFromTime((Date.now() - opts.cutoff) / 1000);

process.stdin.pipe(new _bsonStream2.default({ BSON: BSON })).pipe(_through2.default.obj(function (obj, enc, cb) {
  if (obj._id >= CUTOFF_ID) this.push(BSON.serialize(obj));
  cb();
})).pipe(process.stdout);