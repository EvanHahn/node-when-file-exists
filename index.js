'use strict'

const fs = require('fs')

module.exports = function untilExists (path, options, callback) {
  if (arguments.length === 2) {
    callback = options
    options = null
  }

  options = parseOptions(options)

  check(path, options, callback)
}

function check (path, options, callback) {
  const args = arguments

  fs.stat(path, function (err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        check.apply(null, args)
      } else {
        setTimeout(function () {
          callback(err)
        }, options.checkInterval)
      }
      return
    }
    callback(null)
  })
}

function parseOptions (options) {
  const result = options || {}

  result.checkInterval = 100

  return result
}
