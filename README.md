# mongodump-filter

A utility to filter MongoDB BSON files by duration.

[![build status][travis-badge]][travis-link]
[![npm version][npm-badge]][npm-link]
[![mit license][license-badge]][license-link]
[![we're hiring][hiring-badge]][hiring-link]

## Background

MongoDB removed the `--filter` flag from `mongodump` in version 3.0.  We used this to trim very large collections to a smaller recent set of data.  (Our old filter expression was something like `{_id: {$gte: ObjectId('6-months-ago')}}`.)  This program is a replacement for that specific use-case, though I'd be more than happy to have folks extend it to do more things.

## Install

```
$ npm install -g mongodump-filter
```

## Usage

To filter your users collection to just records with `_id`s in the last 30 days:

```
$ mongodump-filter 30d < users.bson > users.30d.bson
```

[travis-badge]: http://img.shields.io/travis/goodeggs/mongodump-filter/master.svg?style=flat-square
[travis-link]: https://travis-ci.org/goodeggs/mongodump-filter
[npm-badge]: http://img.shields.io/npm/v/mongodump-filter.svg?style=flat-square
[npm-link]: https://www.npmjs.org/package/mongodump-filter
[license-badge]: http://img.shields.io/badge/license-mit-blue.svg?style=flat-square
[license-link]: LICENSE.md
[hiring-badge]: https://img.shields.io/badge/we're_hiring-yes-brightgreen.svg?style=flat-square
[hiring-link]: http://goodeggs.jobscore.com/?detail=Open+Source&sid=161

