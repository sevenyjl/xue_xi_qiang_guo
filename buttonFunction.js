let config = require("./config.js")
let commonUtils = require("./commonUtils.js")

let waitAppear = function (colorInfoList, successFunction, errorFunction) {
    let point = null;
    let errorInfo = "可能错误了";
    try {
        let captureScreen = images.captureScreen();
        for (colorInfoElement of colorInfoList) {
            const result = images.findMultiColors(captureScreen, colorInfoElement.color, colorInfoElement.points, colorInfoElement.options);
            if (result) {
                point = result;
                break;
            }
        }
    } catch (e) {
        errorInfo = e;
    } finally {
        if (point) {
            successFunction(point);
        } else {
            errorFunction(errorInfo);
        }
    }
}

function simpleWaitAppear(configName, successFunction) {
    let isSuccess = true;
    waitAppear(config.clickConfig[device.width + "-" + device.height][configName], successFunction, (error) => {
        console.log("找【" + configName + "】错误了", error)
        console.verbose(JSON.stringify(config.clickConfig[device.width + "-" + device.height][configName]))
        isSuccess = false;
    })
    return isSuccess;
}


let woDeClick = function () {
    return simpleWaitAppear("我的", (res) => {
        click(res.x, res.y)
        sleep(300)
    })
}

let xueXiJiFenClick = function () {
    return simpleWaitAppear("学习积分", (res) => {
        click(res.x, res.y)
        sleep(300)
    })
}

let boBaoClick = function (times) {
    if (times === 0) {
        return true;
    }
    let result = simpleWaitAppear("播报", (res) => {
        click(res.x, res.y)
        sleep(300)
        click(res.x - 350, res.y)
        sleep(10000)
        back()
        sleep(500)
    });
    if (result) {
        for ( i = 0; i < commonUtils.randomNumber(2, 4); i++) {
            swipe(257, 600, 244, 200, 500)
        }
        sleep(500)
        return boBaoClick(times - 1)
    }
    return result;
}


let quClick = function () {
    return simpleWaitAppear("去", (res) => {
        click(res.x, res.y)
    });
}


module.exports.boBaoClick = boBaoClick;
module.exports.woDeClick = woDeClick;
module.exports.xueXiJiFenClick = xueXiJiFenClick;
module.exports.quClick = quClick;