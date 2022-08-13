let RunCore = require("./study_core.js")
let baidu_ocr_api = require("./baiduOcr.js")
let buttonFunction = require("./buttonFunction.js")
images.requestScreenCapture()

var task = {
    "我要选读文章": {
        getSocre: 0,
        maxSocre: 12
    },
    "视听学习": {
        getSocre: 0,
        maxSocre: 6
    },
    "视听学习时长": {
        getSocre: 0,
        maxSocre: 6
    },
    "每日答题": {
        getSocre: 0,
        maxSocre: 5
    },
    "专项答题": {
        getSocre: 0,
        maxSocre: 1
    },
    "挑战答题": {
        getSocre: 0,
        maxSocre: 5
    },
    "四人赛": {
        getSocre: 0,
        maxSocre: 2
    },
    "双人对战": {
        getSocre: 0,
        maxSocre: 1
    },
    "发表观点": {
        getSocre: 0,
        maxSocre: 1
    },
    "本地频道": {
        getSocre: 0,
        maxSocre: 1
    }
}
var runCore = new RunCore(task)
var base_path = "/sdcard/Pictures/Screenshots"


function countTask() {
    swipe(500, 300, 500, 1412, 500)
    while (true) {
        if (isInAppName("学习强国")) {
            swipe(500, 1412, 500, 300, 1000)
            let page = baidu_ocr_api(captureScreen())
            let findNow = null;
            for (baiduOcrResult of page) {
                if (baiduOcrResult.words === "每周答题") {
                    return;
                }
                if (findNow) {
                    if (baiduOcrResult.words.indexOf("已获") === 0) {
                        if (task[findNow]) {
                            task[findNow].getSocre = parseInt(baiduOcrResult.words.slice(2, 3))
                        }
                        findNow = null;
                    }
                } else {
                    if (task[baiduOcrResult.words]) {
                        findNow = baiduOcrResult.words;
                    }
                }
            }
            sleep(3000)
        } else {
            break
        }
    }
}

function isInAppName(appName) {
    return getPackageName(appName) === currentPackage();
}


// // while (true) {
// let isDoTask = false;
// if (isInAppName("学习强国")) {
//     // runCore.run()
//     sleep(3000)
//     if (isDoTask) {
//         console.log("==========",buttonFunction.boBaoClick(3));
//     } else {
//         buttonFunction.woDeClick()
//         sleep(1000)
//         buttonFunction.xueXiJiFenClick()
//         sleep(1000)
//         if (buttonFunction.quClick()) {
//             isDoTask = true;
//         }
//     }
// } else {
//     app.launchApp('学习强国');
//     sleep(3000)
//     // 检查任务
//     // countTask()
//     // runCore = new RunCore(task)
// }
// }
// buttonFunction.boBaoClick(10)

