let config = require("./config.js")

let findPic = function (picPath, options, isClick, isDebug) {
    let pic = images.read(picPath);
    let point = findImage(images.captureScreen(), pic, options);
    let isFind = false;
    if (point) {
        if (isClick) {
            click(point.x + pic.width / 2, point.y + pic.height / 2)
        }
        if (isDebug) {
            console.log("查询" + picPath + "点：" + point);
            console.log("点击位置：", point.x + pic.width / 2, point.y + pic.height / 2);
            let clip = images.clip(images.captureScreen(),
                point.x, point.y, pic.width, pic.height);
            clip.saveTo(picPath + ".debug.png");
            clip.recycle();
        }
        isFind = true;
    } else {
        toastLog("查询图片：", picPath, " 失败");
        isFind = false;
    }
    pic.recycle();
    return isFind;
}

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


images.requestScreenCapture()
waitAppear(config.clickConfig[device.width + "-" + device.height]["我的"],(res)=>{
log(res.x,res.y)
},(error)=>{log(error)})

// exports.findPic = findPic;
// module.exports.waitAppear = waitAppear;