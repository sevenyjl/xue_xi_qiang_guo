let baidu_ocr_api = require("./baiduOcr.js")


// 申请截图权限
$images.requestScreenCapture();
baidu_ocr_api(captureScreen())