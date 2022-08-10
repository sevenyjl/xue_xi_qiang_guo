let RunCore = require("./study_core.js")
let findUtil = require("./findUtil.js")
let baidu_ocr_api = require("./baiduOcr.js")
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
    }
}


while (true) {
    if (getPackageName("学习强国") === currentPackage()) {
        runCore.run()
        sleep(3000)
    } else {
        app.launchApp('学习强国');
        sleep(3000)
        // 检查任务
        findUtil.findPic(base_path + "/学习积分.png", { region: [0, 0, 500, 1500] }, true, true)
        findUtil.findPic(base_path + "/我的.png", { region: [0, 0, 500, 1500] }, true, true)
        countTask()
        runCore=new RunCore(task)
    }
}

