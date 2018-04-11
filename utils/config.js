var appid = 61230;
var secret = '017d7177c4c24edb9403662b06ebb490';
var param = '?showapi_appid='+appid+'&showapi_sign='+secret;

var search = 'https://route.showapi.com/213-1'+param;
var hot = 'https://route.showapi.com/213-4'+param;

module.exports = {
  search: search,
  hot: hot
}