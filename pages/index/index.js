//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currenCity: '',
    info:{
      inputmData: "",
      inputCar:""
    },
    imgShow:true
  },
  onLoad: function () {
    var that=this;
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res);
    //     app.aldpush.pushuserinfo(res, jscode);
    //   }
    // })

    wx.showLoading({
        title: '加载中...',
      })
    //发送请求，获取数据
    wx.request({
      url: 'https://m.boc7.com/loanreg/get_wxb_info', 
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
       var img=res.data.banner;
        that.setData({
          firstPageImg:img
        })
      },
      fail:function(){
        that.setData({
          imgShow: false
        })
      }
   
    }) 
      
    this.getLocation();
    
      wx.hideLoading({
       title: '加载完成',
     })
  },
  jumpTocity:function(){
    wx.navigateTo({
      url: '../switchcity/switchcity',
    })
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  //定位当前城市
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        //当前的经度和纬度
        let latitude = res.latitude;
        let longitude = res.longitude;
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${app.globalData.tencentMapKey}`,
          success: res => {
            app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity : res.data.result.ad_info.city;
            app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty : res.data.result.ad_info.district;
            var citycode = res.data.result.ad_info.adcode;
            wx.setStorageSync("citycode", citycode);
            console.log(citycode);
            console.log(app.globalData.defaultCity)
            that.setData({
              currenCity: app.globalData.defaultCity,
              county: app.globalData.defaultCounty
            });
          }
        });

      }
    })
  },

  //点击城市切换到城市页面
  jump: function () {
    //关闭本页去切换城市，返回时就可以重新初始化定位信息哦
    wx.reLaunch({
      url: '../switchcity/switchcity'
    });
  },
  // 点击跳转至微信授权页面
  jumpAccredit: function () {
    wx.navigateTo({
      url: '../accredit/accredit',
    })
  },
  // 提交表单信息
  formSubmit: function (e) {
    let location = e.detail.value.location;
    // let money = e.detail.value.money;
    let userName = e.detail.value.userName;
    console.log(e);
    var data = this.data;
    var failVo = { flag: true, msg: "校验成功" };
    if (typeof data.info.money == 'undefined' || data.info.money == '') {
      failVo.flag = false;
      failVo.msg = "请输入借款金额";
      failVo.el = "money";
    } else if (typeof data.currenCity == 'undefined' || data.currenCity == '') {
      failVo.flag = false;
      failVo.msg = "请选择工作城市";
      failVo.el = "currenCity";
    } else if (typeof userName == 'undefined' || userName == '') {
      failVo.flag = false;
      failVo.msg = "请输入本人姓名";
      failVo.el = "userName";
    } else if (typeof data.info.car == 'undefined' || data.info.car == '') {
      failVo.flag = false;
      failVo.msg = "请选择是否有车";
      failVo.el = "car";
    } 


    if (!failVo.flag) {
      this.setData({
        'elType': failVo.el
      });
      wx.showModal({
        content: failVo.msg,
        showCancel: false,
        confirmColor: "#169bd5",
        success: function (res) {
        }
      });
    } else {
      //成功后发送请求，提交到后台
      // var csDate = this.data.info.csDate;
      // var csArr = csDate.split("-");
      // var year = csArr[0];
      // var month = csArr[1];
      // var day = csArr[2];
      // wx.request({
      //   url: "https://m.boc7.com/loanreg/xcxsubmit_b",
      //   data: {
      //     id:80,
      //     id2:67,
      //     year: year,
      //     month: month,
      //     day: day,
      //     mobile: "18974610867",
      //     Shouxian: (this.data.sxs.indexOf(this.data.info.sx)+1),
      //     EPFTime: (this.data.gjjs.indexOf(this.data.info.gjj) + 1),
      //     Hire: (this.data.zys.indexOf(this.data.info.zy) + 1),
      //     Houses: (this.data.fcs.indexOf(this.data.info.fc) + 1),
      //     SheBaoTime: (this.data.sbs.indexOf(this.data.info.sb) + 1),
      //     Wage: (this.data.ysrs.indexOf(this.data.info.ysr) + 1),
      //     XyCard: (this.data.xyks.indexOf(this.data.info.xyk) + 1),
      //     jiebei: (this.data.jbs.indexOf(this.data.info.jb)),
      //     weilidai: (this.data.wlds.indexOf(this.data.info.wld) )
      //   },
      //   method: "POST",
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' // 默认值
      //   },
      //   success: function (res) {
      //     debugger
      //     console.log(res);
      //   }
      // });
      if (typeof data.info.money == 'undefined' || data.info.money == '') {
        failVo.flag = false;
        failVo.msg = "请输入借款金额";
        failVo.el = "money";
      } else if (typeof data.currenCity == 'undefined' || data.currenCity == '') {
        failVo.flag = false;
        failVo.msg = "请选择工作城市";
        failVo.el = "currenCity";
      } else if (typeof userName == 'undefined' || userName == '') {
        failVo.flag = false;
        failVo.msg = "请输入本人姓名";
        failVo.el = "userName";
      } else if (typeof data.info.car == 'undefined' || data.info.car == '') {
        failVo.flag = false;
        failVo.msg = "请选择是否有车";
        failVo.el = "car";
      } 
      wx.setStorage({
        key: "indexInfo",
        data: {
          money: data.info.ownMoney,
          currenCity: data.currenCity,
          citycode: data.county,
          car: data.info.car,
          userName: userName,
        },
        success: function () {
        }
          // LoanAmount: money,
          // city:  data.currenCounty,
          // CityName: data.currenCity,
          // car: data.info.car,
          // Name: userName,
      });
      console.log(wx.getStorageSync("indexInfo"))
      //单独设置citycode
     var aa=wx.getStorageSync("citycode");
      
      //跳转页面
      this.jumpAccredit()
    }
    
  },
  inputUserName: function (e) {
    this.setData({
      'info.userName': e.detail.value
    });
    // var inputmData=["1-999","1000-1999"];
    // wx.showActionSheet({
    //   itemList: inputmData,
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       'info.inputmData': inputmData[res.tapIndex]
    //     });
    //   },
    //   fail: function (res) {
    //     that.setData({
    //       'info.inputmData': ""
    //     });
    //   }
    // })
  },
  // 借钱金额
    // inputMoney:function(e){
    //   this.setData({
    //     'info.money': e.detail.value
    //   });
    //   this.setData({
    //     'elType': "MY"
    //   });      
    // },
    hasCar:function(){
      var that = this;
      var inputCar = ["有", "无"];
      wx.showActionSheet({
        itemList: inputCar,
        success: function (res) {
          console.log(res);
          that.setData({
            'info.car': inputCar[res.tapIndex]
          });
          that.setData({
            'elType': "MY" 
          });
        },
        fail: function (res) {
          that.setData({
            'info.car': ""
          });
        }
      })
    },
    hasMoney: function () {
      var that = this;
      //发送请求，获取数据
      wx.request({
        url: 'https://m.boc7.com/loanreg/get_wxb_info', //仅为示例，并非真实的接口地址
        method:"POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res);
          var range=res.data.range;
          //定义空数组，将后台获取到的值填入数组中
          var inputMoney = [];
          for (var key in range){
            if(key>0){
              inputMoney.push(range[key]);
            } 
          }
          if (inputMoney.length>6){
            inputMoney.length = 6;
          }
          wx.showActionSheet({
            itemList: inputMoney,
            success: function (res) {
              var index = res.tapIndex;
              that.setData({
                'info.money': inputMoney[res.tapIndex]
              });
              for (var key in range) {
                if (range[key] == inputMoney[res.tapIndex]){
                  //保存此时的key值，即是要传给后台的数据
                  that.setData({
                    'info.ownMoney': key
                  });    
                }
               
              }
              console.log(that.data.info.ownMoney);
              that.setData({
                'elType': "MY"
              });
            },
            fail: function (res) {
              that.setData({
                'info.money': ""
              });
            }
          })
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
