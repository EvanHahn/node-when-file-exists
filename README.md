when-file-exists
================

Call a callback once a file is created.

```js
var whenFileExists = require('when-file-exists')
var path = require('path')

var pathToFile = path.resolve(__dirname, 'some-file.txt')

whenFileExists(pathToFile, function (err) {
  if (err) { throw err }

  // some-file.txt exists
})
```
