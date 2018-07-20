const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xieyi: "《用户协议》",
    val1:true,
    val2:true,
    userInfo: {},
    hasUserInfo: false,
    twice: 1,
    btnFlag:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
  //设置保险值到缓存
    if ((this.data.twice == 1) || (this.data.twice == 2)){
      wx.setStorageSync("baoxian", "1")
    }else{
      wx.setStorageSync("baoxian", "0")
    }
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    // 获取微信绑定的手机号码必须先调用这个借口
    //在使用这个组件之前必须先调用login接口，如果没有调用login点击button时会提示先调用login。
    var that=this;
    wx.login({
      success: function (res) {
        if (res.code) {
          that.setData({
            loginCode: res.code
          })
          // wx.setStorageSync("loginCode", res.code);
          console.log(res.code);
          console.log('登录成功');
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  },
  loginByphone: function() {
    debugger
    var times = this.data.twice;
    if (this.data.twice == 3 || this.data.twice == 4) {
      wx.showModal({
        content: '请阅读用户协议',
        showCancel: false,
        confirmColor: "#169bd5",
        success: function (res) {

        }
      });
      return;
    }
    wx.navigateTo({
      url: '../phoneLogin/phoneLogin',
    })
  },
  getPhoneNumber: function (e) {
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg.indexOf("fail") != -1) {
      app.aldstat.sendEvent('微信快捷登陆', "取消");
         return;
    } else {
      wx.showLoading({
        title: '授权中...',
      })
      var that = this;
      // 点击跳转至微信授权页面
      var loginCode = that.data.loginCode;
      var encryptedData=e.detail.encryptedData;
      var iv=e.detail.iv;
      console.log(loginCode);
      //如果验证码为null，说明是授权登录
      //调用微信接口，获取状态
  
   wx.request({
     url: 'https://m.boc7.com/loanreg/jscode2session',
     data:{
       js_code:loginCode
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded' // 默认值
     },
     method:"POST",
     success:function(res){
       console.log(res);
      var sessionKey = res.data.session_key;
      //发送请求，解密信息
      wx.request({
        url: "https://m.boc7.com/loanreg/wx_decode",
        data: {
          session_key: sessionKey,
          encryptedData: encryptedData,
          iv:iv
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var retCode = res.data.retCode;
          if (retCode == 0) {
            //解密成功
            var Phone = res.data.retObj.purePhoneNumber;
            //成功后跟新phone号码 ----未知phone号码的参数
            wx.setStorageSync("Phone", Phone);
            //发送第一次请求，获取id，id2
            that.loginBysq(Phone);

          } else {
            wx.showModal({
              content: "授权失败,请稍后重试",
              showCancel: false,
              confirmColor: "#169bd5",
              success: function (res) {
              }
            });
          }

        }, fail: function (res) {
          wx.showModal({
            content: '获取失败，请稍后重试',
            showCancel: false,
            confirmColor: "#169bd5",
            success: function (res) {
            }
          });
        }
      })



     },
     fail:function(){
       wx.showModal({
         content: '获取失败，请稍后重试',
         showCancel: false,
         confirmColor: "#169bd5",
         success: function (res) {
         }
       });
     }
   })

     
   wx.hideLoading({
     title: '',
   })  

  }
  },
  checkboxChange:function(e){
    var arr=e.detail.value;
    if(arr.length==2){
      //全部选中
      this.setData({ twice: 1, btnFlag: true})
    }else if(arr.length==1){
      if(arr[0]=="1"){
        //选中协议
        this.setData({ twice: 2, btnFlag:true })
        

      }else{
        this.setData({ twice: 3, btnFlag:false })
      }
    }else{
      this.setData({ twice: 4, btnFlag: false })
    }
  
  },
  loginBysq: function (Phone){
    //第一次请求，获取id，id2
    var data = wx.getStorageSync("indexInfo");
    var car;
    if (data.car == "有") {
      car = 1;
    } else {
      car = 0;
    }

    var phone = Phone;
    var validcode = wx.getStorageSync("validcode");
    var baoxian = wx.getStorageSync("baoxian");
    var citycode = wx.getStorageSync("citycode");
    var track = "bocai_xcx";
    var that = this;
    wx.request({
      url: 'https://m.boc7.com/loanreg/xcxsubmit_a',
      data: {
        Phone: phone,
        City: citycode,
        Name: data.userName,
        CityName: data.currenCity,
        validcode: validcode,
        LoanAmount: data.money,
        Car: car,
        track: track,
        baoxian: baoxian,
        login:"sq"
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        var vacode = res.data.retCode;
        if (vacode == 402) {
          //验证码错误
          wx.showModal({
            content: "今日已提交成功",
            showCancel: false,
            confirmColor: "#169bd5",
            success: function (res) {
            }
          });
          app.aldstat.sendEvent('微信快捷登陆', "成功");
          wx.redirectTo({
            url: "../successApply/successApply",
          })
        }
     else if (vacode == 404) {
          //入库失败
          wx.showModal({
            content: "网络错误，请稍后重试",
            showCancel: false,
            confirmColor: "#169bd5",
            success: function (res) {
            }
          });
          app.aldstat.sendEvent('微信快捷登陆', "失败");
          wx.redirectTo({
            url: "../index/index",
          })
        }
        else if (vacode == 0){
          var id = res.data.retObj.id;
          var id2 = res.data.retObj.id2;
          //将id，id2设置缓存
          wx.setStorageSync("id", id);
          wx.setStorageSync("id2", id2);
          wx.showToast({ title: '登陆成功', icon: 'success', duration: 2000 });
          //微信登录，成功一次记录一次
          app.aldstat.sendEvent('微信快捷登陆',"成功");
          //设置num为空，属性为
          that.setData({
            timeNum: "",
            getCode: true
          })
          wx.redirectTo({
            url: "../perfectInfo/perfectInfo",
          })
        }
      }
    })



  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: app.shareDetail.title,
      imageUrl: app.shareDetail.imgUrl,
      path: '/pages/index/index'
    }
  }
 
}); 