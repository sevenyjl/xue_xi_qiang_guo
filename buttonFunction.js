let config = require("./config.js")

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

let boBaoClick = function () {
    return simpleWaitAppear("播报", (res) => {
        click(res.x, res.y)
        sleep(300)
        click(res.x - 350, res.y)
        sleep(10000)
        back()
    });
}


let quClick = function () {
    return simpleWaitAppear("去", (res) => {
        click(res.x, res.y)
    });
}


if (woDeClick()) {
    sleep(300)
    if (xueXiJiFenClick()) {
        sleep(300)
        quClick()
    }
}

module.exports.boBaoClick = boBaoClick;
module.exports.woDeClick = woDeClick;
module.exports.xueXiJiFenClick = xueXiJiFenClick;
module.exports.quClick = quClick;