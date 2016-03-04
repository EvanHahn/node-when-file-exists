'use strict'

const whenExists = require('..')

const assert = require('assert')
const mkdirp = require('mkdirp')
const path = require('path')
const rimraf = require('rimraf')
const touch = require('touch')

describe('whenExists', function () {
  beforeEach(function () {
    this.tmpPath = path.resolve(__dirname, '..', 'tmp')
    this.alreadyExistsPath = path.resolve(this.tmpPath, 'already-exists.txt')
  })

  beforeEach(function (done) {
    mkdirp(this.tmpPath, done)
  })

  beforeEach(function (done) {
    touch(this.alreadyExistsPath, done)
  })

  afterEach(function (done) {
    rimraf(this.tmpPath, done)
  })

  it('calls the callback if a file already exists', function (done) {
    const start = new Date()

    whenExists(this.alreadyExistsPath, function (err) {
      const elapsed = new Date() - start

      assert.equal(err, null)
      assert(elapsed < 1000)

      done()
    })
  })

  it('calls the callback after a file is created', function (done) {
    const start = new Date()
    const newPath = path.resolve(this.tmpPath, 'a-new-file.txt')

    whenExists(newPath, function (err) {
      const elapsed = new Date() - start

      assert.equal(err, null)
      assert(elapsed > 200)

      done()
    })

    setTimeout(function () {
      touch(newPath)
    }, 250)
  })

  it('calls the callback after a folder is created', function (done) {
    const start = new Date()
    const newPath = path.resolve(this.tmpPath, 'a-new-folder')

    whenExists(newPath, function (err) {
      const elapsed = new Date() - start

      assert.equal(err, null)
      assert(elapsed > 200)

      done()
    })

    setTimeout(function () {
      mkdirp(newPath)
    }, 250)
  })
})
