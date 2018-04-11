// pages/list/list.js

var url = require('../../utils/config.js');
var jumpFlag = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [
      // {
      //   url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_4_300_213470055.jpg?max_age=2592000',
      //   num: 4,
      //   title: '巅峰榜·流行指数',
      //   content: []
      // },
      // {
      //   url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_26_300_213465893.jpg?max_age=2592000',
      //   num: 26,
      //   title: '巅峰榜·热歌',
      //   content: []
      // },
      // {
      //   url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_27_300_213464582.jpg?max_age=2592000',
      //   num: 27,
      //   title: '巅峰榜·新歌',
      //   content: []
      // },
      // {
      //   url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_28_300_200284331.jpg?max_age=2592000',
      //   num: 28,
      //   title: '巅峰榜·网络歌曲',
      //   content: []
      // },
      {
        url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_5_300_213452935.jpg?max_age=2592000',
        num: 5,
        title: '巅峰榜·内地',
        content: [],
        code: []
      },
      {
        url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_6_300_213429092.jpg?max_age=2592000',
        num: 6,
        title: '巅峰榜·港台',
        content: [],
        code: []
      },
      {
        url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_3_300_213506475.jpg?max_age=2592000',
        num: 3,
        title: '巅峰榜·欧美',
        content: [],
        code: []
      },
      {
        url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_16_300_212928794.jpg?max_age=2592000',
        num: 16,
        title: '巅峰榜·韩国',
        content: [],
        code: []
      },
      {
        url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_17_300_213290345.jpg?max_age=2592000',
        num: 17,
        title: '巅峰榜·日本',
        content: [],
        code: []
      },
      {
        url: 'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_36_300_200525765.jpg?max_age=2592000',
        num: 36,
        title: '巅峰榜·K歌金曲',
        content: [],
        code: []
      }
    ],
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    });

    var len = this.data.img.length;
    var self = this;
    var flag = this.data.flag;

    for (let i = 0; i < len; i++) {
      wx.request({
        url: url.hot,
        data: {
          topid: self.data.img[i].num
        },
        success: function(e){
          console.log(e);
          var songlist = e.data.showapi_res_body.pagebean.songlist;

          var key = 'img[' + i + '].content';
          var code = 'img[' + i + '].code';
          if(self.data.img[i].num === 36){
            wx.hideLoading();
            flag = true;
          }
          self.setData({
            [key]: songlist,
            flag : flag
          });

          let data = songlist;
          for (let i = 0; i < data.length; i++) {
            data[i].albumpic_big = encodeURIComponent(data[i].albumpic_big);
            data[i].albumpic_small = encodeURIComponent(data[i].albumpic_small);
            data[i].downUrl = encodeURIComponent(data[i].downUrl);
            data[i].url = encodeURIComponent(data[i].url);
            data[i].songname = encodeURIComponent(data[i].songname);
            data[i].singername = encodeURIComponent(data[i].singername);
          }

          self.setData({
            [code]: data
          })
        }
      })
    }
  },

  jump: function(e){
    console.log(e);
    if(jumpFlag){
      jumpFlag = false;
      var id = e.currentTarget.id;
      var data = this.data.img[id].code;
      var temp = JSON.stringify(data);
      wx.navigateTo({
        url: '../ranking/ranking?content='+temp
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    jumpFlag = true;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})