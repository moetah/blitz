const fs = require('fs')

module.exports.data = function(variant, age) {
  return JSON.parse(fs.readFile(`blitz${age}-${variant}.json`))
}



