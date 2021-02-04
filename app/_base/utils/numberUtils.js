/**
 * 验证数字
 * @param { string } value
 */
module.exports.isNumber = value => /^\d{1,}$/g.test(value);