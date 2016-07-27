import BSONStream from 'bson-stream';
import bson from 'bson';
import fs from 'fs';
import through2 from 'through2';
import parseDuration from 'parse-duration';

function usage () {
  console.log(`mongodump-filter <duration> < everything.bson > filtered.bson`);
  console.log(`  duration: a valid duration expression, eg '4h', '30d', see https://www.npmjs.com/package/parse-duration`);
  process.exit(1);
}

function parseOpts (args) {
  let opts = {};

  if (!args[0]) {
    usage();
  }
  
  try {
    opts.cutoff = parseDuration(args[0]);
  } catch (e) {
    console.error(`${args[0]} was not recognized as a valid duration`);
    usage();
  }

  return opts;
}

const opts = parseOpts(process.argv.slice(2));
const BSON = new bson.BSONPure.BSON();
const CUTOFF_ID = bson.ObjectId.createFromTime((Date.now() - opts.cutoff) / 1000);

process.stdin.pipe(new BSONStream())
.pipe(through2.obj(function (obj, enc, cb) {
  if (obj._id >= CUTOFF_ID) this.push(BSON.serialize(obj));
  cb();
}))
.pipe(process.stdout);

