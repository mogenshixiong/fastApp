
const license = require('./license');

module.exports = function (app) {
  license.check() // 检查授权
}