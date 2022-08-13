/**
 * 生成随机数
 * @param {number} min
 * @param {number} max
 * @returns
 */
let randomNumber = function (min, max) {
    if (min > max) {
        return max;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
}



module.exports.randomNumber = randomNumber;