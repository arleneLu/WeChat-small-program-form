//app.js
var aldstat = require("./utils/ald-stat.js");
var push = require('./utils/pushsdk.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    // let logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       wx.setStorageSync("loginCode", res.code);
    //       console.log(res.code);
    //       console.log('登录成功');
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
    // wx.openSetting({
    //   success: (res) => {
    //     /*
    //      * res.authSetting = {
    //      *   "scope.userInfo": true,
    //      *   "scope.userLocation": true
    //      * }
    //      */
    //   }
    // })
  
  },
  globalData: {
    userInfo: null,
    defaultCity:"",
    tencentMapKey:"4HYBZ-EB23D-SLC42-HQ5R3-LP3LQ-OZFU5"
  },
  shareDetail:{
    imgUrl:"../../images/firstPage/u292.png",
    title:"汽车助贷"
  }
})