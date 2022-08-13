let config = require("./config")

function get_baidu_token() {
    var res = http.post(
        'https://aip.baidubce.com/oauth/2.0/token',
        {
            grant_type: 'client_credentials',
            client_id: config.baiduOcr.ak,
            client_secret: config.baiduOcr.sk
        }
    );
    return res.body.json()['access_token'];
}
let token = null;

/**
 * 百度ocr接口，传入图片返回文字和选项文字
 * @param {image} img 传入图片
 * @returns {string} question 文字
 * @returns {list[string]} options_text 选项文字 
 */
function baidu_ocr_api(img) {
    if (!token) {
        token = get_baidu_token();
    }
    var options_text = [];
    var question = "";
    var res = http.post(
        'https://aip.baidubce.com/rest/2.0/ocr/v1/general',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            access_token: token,
            image: images.toBase64(img),
        }
    );
    var res = res.body.json();
    try {
        var words_list = res.words_result;
        return words_list;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = baidu_ocr_api;