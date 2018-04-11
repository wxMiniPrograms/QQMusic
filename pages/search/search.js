// pages/search/search.js

var url = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resetBtn: false,
    toastText: '',
    data: [],
    history: [],
    flag: false
  },

  focus: function(){
    if(this.data.data.length != 0){
      return;
    }
    this.setData({
      flag: true
    })
  },

  input: function(e){
    var value = e.detail.value;
    var resetBtn = this.data.resetBtn;
    if(value == ''){
      resetBtn = false;
    }
    else{
      resetBtn = true
    }
    this.setData({
      resetBtn: resetBtn,
      showToast: false
    })
  },

  reset: function(){
    this.setData({
      resetBtn: false,
      data: [],
      flag: true
    })
  },

  delete: function(e){
    var id = e.currentTarget.id;
    var history = this.data.history;
    var newHistory = [];
    var temp = 0;

    for (var i = 0; i < history.length; i ++){
      if(i == id){
        continue;
      }

      newHistory[temp] = history[i];
      temp++;
    }

    wx.setStorageSync('history', newHistory);

    this.setData({
      history: newHistory
    })
  },

  clear: function(){
    wx.removeStorageSync('history');
    this.setData({
      history: []
    })
  },

  confirm: function(e){
    var value = e.detail.value;
    if (value === ''){
      this.setData({
        toastText: '不能为空'
      })
      this.showToast();
      return;
    }

    wx.request({
      url: url.search,
      data: {
        keyword: value
      },
      success: (e) => {
        console.log(e);

        var data = e.data.showapi_res_body.pagebean.contentlist;
        this.setData({
          data: data,
          flag: false
        });

        // 历史
        var history = this.data.history;
        history.unshift(value);
        wx.setStorageSync('history',history);

        this.setData({
          history: history
        });
        console.log('-------------------');
        console.log(wx.getStorageSync('history'));

      }
    })

  },

  showToast: function(){
    this.setData({
      showToast: true
    });
    setTimeout(() => {
      this.setData({
        showToast: false
      })
    },1500);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var history = wx.getStorageSync('history') || [];
     this.setData({
       history: history
     })
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