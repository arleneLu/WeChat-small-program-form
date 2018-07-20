var app = getApp();
Page({
  /* 页面的初始数据*/
  data: {
    timeText: '获取验证码',
    //倒计时
    timeNum: '',
    getCode: true,
    codeType: false
  },
  /* 验证码倒计时***************************************/
  getNewCode: function () {
    var phone = this.data.phoneNum;
    if (phone && this.isPoneAvailable(phone)) {
      var that = this;
      //发送请求，获取验证码
      wx.request({
        url: "https://m.boc7.com/loanreg/getsms",
        data: {
          mobile: this.data.phoneNum
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          that.setData({ getCode: false, flag: true, codeType: true });
          that.changeCodeNum("true");
          wx.showToast({ title: '发送成功', icon: 'success', duration: 2000 });
          app.aldstat.sendEvent('获取验证码', "成功");
        }, fail: function (res) {
          
          wx.showModal({
            content: '获取失败，请稍后重试',
            showCancel: false,
            confirmColor: "#169bd5",
            success: function (res) {
            }
              
          });
          app.aldstat.sendEvent('获取验证码', "失败");
          //设置num为空，属性为
          // that.setData({
          //   timeNum: "",
          //   getCode: true
          // })
          // that.onload();

        }
      })

    } else {
      this.phoneVal(phone);
    }

  },
  phoneVal: function (phone) {
    if (!phone) {
      wx.showModal({
        content: '请输入手机号',
        showCancel: false,
        confirmColor: "#169bd5",
        success: function (res) {
        }
      });
      return;
    }
    var flag = this.isPoneAvailable(phone);
    if (!flag) {
      wx.showModal({
        content: '请输入正确的手机号',
        showCancel: false,
        confirmColor: "#169bd5",
        success: function (res) {
        }
      });
      return;
    }
  },
  //验证手机号是否有效
  isPoneAvailable: function (str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }
  },
  changeCodeNum: function (type) {
    if ((type && this.data.codeType == true) || type == "auto") {
      var that = this;
      that.setData({ getCode: false });
      if (!that.data.timeNum && that.data.flag == true) { that.setData({ timeNum: 60 }) }
      var num = that.data.timeNum
      var t = setInterval(function () {
        if (num > 0) { num--; } else {
          clearInterval(t); num = '';
          that.setData({ getCode: true, })
        }
        var myDate = new Date();
        var mytime = myDate.toLocaleTimeString();
        wx.setStorageSync('codeTime', num)
        wx.setStorageSync('leaveTime', mytime)
        wx.setStorageSync('codeType', that.data.getCode)
        that.setData({ currentTime: num, timeNum: num })
      }, 1000);
    }
  },
  // 获取手机号
  loginPhone: function (e) {
    var phone = e.detail.value;
    this.setData({ phoneNum: phone })
  },
  //获取验证码
  yanZhengInput: function (e) {
    var yanzheng = e.detail.value;
    this.setData({
      validData: yanzheng
    })
    var huozheng = this.data.huozheng
    console.log(e.detail.value)
    this.setData({ yanzheng: yanzheng, zhengTrue: false, })
    // if (yanzheng.length >= 4) {
    //   if (yanzheng == huozheng) { that.setData({ zhengTrue: true, }) } else {
    //     that.setData({ zhengTrue: false, })
    //     wx.showModal({ content: '输入验证码有误', showCancel: false, success: function (res) { } })
    //   }
    // }
  },
  /*******/
  onLoad: function (options) {
    app.aldstat.sendEvent('手机号登陆页面', "手机登录");
    if (!this.data.codeType) {
      this.setData({
        timeNum: "",
        timeType: this.data.codeType,
        flag: false
      })
      //  this.changeCodeNum("auto");
    } else { this.setData({ timeType: true }) };
  },
  loginBtnClick: function () {
    var validData = this.data.validData;
    var phone = this.data.phoneNum;
    //验证手机号和验证码是否为空值
    if (!phone) {
      wx.showModal({
        content: '请输入手机号',
        showCancel: false,
        confirmColor: "#169bd5",
        success: function (res) {

        }
      });
      return;
    }
    var flag = this.isPoneAvailable(phone);
    if (!flag) {
      wx.showModal({
        content: '请输入正确的手机号',
        showCancel: false,
        confirmColor: "#169bd5",
        success: function (res) {

        }
      });
      return;
    }
    if (!validData) {
      wx.showModal({
        content: '请输入验证码',
        showCancel: false,
        confirmColor: "#169bd5",
        success: function (res) {

        }
      });
      return;
    }
    if (validData && validData.length < 4) {
      wx.showModal({
        content: '请输入正确的验证码',
        showCancel: false,
        confirmColor: "#169bd5",
        success: function (res) {

        }
      });
      return;
    }


    wx.setStorageSync("validcode", validData);
    wx.setStorageSync("Phone", phone);
    //获取到validcode，phone，Name，City，CityName，LoanAmount，baoxian，Car，track
    //第一次请求，获取id，id2
    var data = wx.getStorageSync("indexInfo");
    var car;
    if (data.car == "有") {
      car = 1;
    } else {
      car = 0;
    }

    var phone = wx.getStorageSync("Phone");
    var validcode = wx.getStorageSync("validcode");
    var baoxian = wx.getStorageSync("baoxian");
    var citycode = wx.getStorageSync("citycode");
    var track = "bocai_xcx";
    console.log(phone);
    console.log(validcode)
    console.log(baoxian)
    console.log(citycode)
    console.log(data.userName)
    console.log(data.currenCity)
    console.log(data.money)
    console.log(car)
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
        login: ""
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        var vacode = res.data.retCode;
        if (vacode == 401) {
          //验证码错误
          wx.showModal({
            content: "验证码错误",
            showCancel: false,
            confirmColor: "#169bd5",
            success: function (res) {
            }
          });
          return;
        } else if (vacode == 402) {
          //今日已提交成功
          wx.showModal({
            content: "今日已提交成功",
            showCancel: false,
            confirmColor: "#169bd5",
            success: function (res) {
            }
          });
          wx.redirectTo({
            url: "../successApply/successApply",
          })
        }
        else if (vacode == 400) {
          //请先获取验证码
          wx.showModal({
            content: '请先获取验证码',
            showCancel: false,
            confirmColor: "#169bd5",
            success: function (res) {
            }
          });
          return;
        } else if (vacode == 404) {
          //入库失败
          wx.showModal({
            content: "网络错误，请稍后重试",
            showCancel: false,
            confirmColor: "#169bd5",
            success: function (res) {
            }
          });
          return;
        }
        else {
          var id = res.data.retObj.id;
          var id2 = res.data.retObj.id2;
          //将id，id2设置缓存
          wx.setStorageSync("id", id);
          wx.setStorageSync("id2", id2);
          wx.showToast({ title: '登陆成功', icon: 'success', duration: 2000 });
          app.aldstat.sendEvent('手机号登陆成功', "成功");
          //设置num为空，属性为
          that.setData({
            timeNum: "",
            getCode: true
          })
          wx.redirectTo({
            url: "../perfectInfo/perfectInfo",
          })
        }
      },
      fail: function () {
        wx.showModal({
          content: "服务器错误,请稍后重试",
          showCancel: false,
          confirmColor: "#169bd5",
          success: function (res) {
          }
        });
        return;
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
})