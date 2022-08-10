
let findPic=function (picPath, options, isClick, isDebug) {
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

exports.findPic=findPic;