// pages/perfectInfo.js
const app = getApp();
import NumberAnimate from "../../utils/addNum.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sbs: ['无社保', '半年内', '超半年'], sbMoneys: [0, 20000, 20000],
    gjjs: ['无公积金', '半年内', '超半年'], gjjMoneys: [0, 20000, 20000],
    xyks: ['有', '无'], xykMoneys: [20000, 0],
    fcs: ['有房无贷', '红本在手', '无房'], fcMoneys: [100000, 50000, 0],
    sxs: ['未投保', '投保未满两年', '投保满两年'], sxMoneys: [0, 0, 20000],
    wlds: ['无', '有'], wldMoneys: [0, 50000],
    jbs: ['无', '有'], jbMoneys: [0, 50000],
    zys: ['工薪族', '公务员', "自雇", "其它", "个体户", "企业主"], zyMoneys: [5000, 12000, 0, 0, 10000, 0],
    ysrs: ['0-1999', '2000-2999', '3000-3999', '4000-5999', '6000-9999', '10000-19999'], ysrMoneys: [5000, 5000, 5000, 5000, 10000, 10000],
    elType: "w",
    'info.ageErrorColor': "#9b9b9b",
    amountMoney: 3000,
    // date: '2018-10-01',
  },
  changeDate(e) {
    this.setData({
      'info.csDate': e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // 获取完整的年月日 时分秒，以及默认显示的数组
    // var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // // 精确到分的处理，将数组的秒去掉
    // var lastArray = obj1.dateTimeArray.pop();
    // var lastTime = obj1.dateTime.pop();

    // this.setData({
    //   dateTime: obj.dateTime,
    //   // dateTimeArray: obj.dateTimeArray,
    //   // dateTimeArray1: obj1.dateTimeArray,
    //   // dateTime1: obj1.dateTime
    // });
  },


  setAmountMoney: function (elData) {
    // var amountMoney = this.data.amountMoney;
    var amountMoney = 3000;
    var info = this.data.info;
    if (typeof info != 'undefined') {
      if (typeof info.zy != 'undefined' && info.zy != '') {
        var index = this.data.zys.indexOf(info.zy);
        amountMoney += this.data.zyMoneys[index];
      }
      if (typeof info.ysr != 'undefined' && info.ysr != '') {
        var index = this.data.ysrs.indexOf(info.ysr);
        amountMoney += this.data.ysrMoneys[index];
      }
      if (typeof info.sb != 'undefined' && info.sb != '') {
        var index = this.data.sbs.indexOf(info.sb);
        amountMoney += this.data.sbMoneys[index];
      }
      if (typeof info.gjj != 'undefined' && info.gjj != '') {
        var index = this.data.gjjs.indexOf(info.gjj);
        amountMoney += this.data.gjjMoneys[index];
      }
      if (typeof info.xyk != 'undefined' && info.xyk != '') {
        var index = this.data.xyks.indexOf(info.xyk);
        amountMoney += this.data.xykMoneys[index];
      }
      if (typeof info.fc != 'undefined' && info.fc != '') {
        var index = this.data.fcs.indexOf(info.fc);
        amountMoney += this.data.fcMoneys[index];
      }
      if (typeof info.sx != 'undefined' && info.sx != '') {
        var index = this.data.sxs.indexOf(info.sx);
        amountMoney += this.data.sxMoneys[index];
      }
      if (typeof info.wld != 'undefined' && info.wld != '') {
        var index = this.data.wlds.indexOf(info.wld);
        amountMoney += this.data.wldMoneys[index];
      }
      if (typeof info.jb != 'undefined' && info.jb != '') {
        var index = this.data.jbs.indexOf(info.jb);
        amountMoney += this.data.jbMoneys[index];
      }
    }
    // this.setData({
    //   'amountMoney': amountMoney
    // });
    let n1 = new NumberAnimate({
      from: amountMoney,//开始时的数字
      speed: 1000,// 总时间
      refreshTime: 50,//  刷新一次的时间
      decimals: 0,//小数点后的位数
      onUpdate: () => {//更新回调函数
        this.setData({
          amountMoney: n1.tempValue
        });
      },
      onComplete: () => {//完成回调函数
        this.setData({
          amountMoney: amountMoney
        });
      }
    });
  },
  selectSxs: function (e) {
    this.setData({
      'info.sx': e.detail.value
    });
    that.setAmountMoney({ elType: 'sx', value: e.detail.value });
  },
  showYsr: function (e) {
    var that = this;
    var ysrs = that.data.ysrs;
    wx.showActionSheet({
      itemList: ysrs,
      success: function (res) {
        that.setData({
          'info.ysr': ysrs[res.tapIndex]
        });
        that.setAmountMoney({ elType: 'ysr', value: ysrs[res.tapIndex] });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    });

  },
  showZy: function (e) {
    var that = this;
    var zys = that.data.zys;
    wx.showActionSheet({
      itemList: zys,
      success: function (res) {
        that.setData({
          'info.zy': zys[res.tapIndex]
        });
        that.setAmountMoney({ elType: 'zy', value: zys[res.tapIndex] });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showGjj: function (e) {
    var that = this;
    var gjjs = that.data.gjjs;
    wx.showActionSheet({
      itemList: gjjs,
      success: function (res) {
        that.setData({
          'info.gjj': gjjs[res.tapIndex]
        });
        that.setAmountMoney({ elType: 'gjj', value: gjjs[res.tapIndex] });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showXyk: function (e) {
    var that = this;
    var xyks = that.data.xyks;
    wx.showActionSheet({
      itemList: xyks,
      success: function (res) {
        that.setData({
          'info.xyk': xyks[res.tapIndex]
        });
        that.setAmountMoney({ elType: 'xyk', value: xyks[res.tapIndex] });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showFc: function (e) {
    var that = this;
    var fcs = that.data.fcs;
    wx.showActionSheet({
      itemList: fcs,
      success: function (res) {
        that.setData({
          'info.fc': fcs[res.tapIndex]
        });
        that.setAmountMoney({ elType: 'fc', value: fcs[res.tapIndex] });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showWld: function (e) {
    var that = this;
    var wlds = that.data.wlds;
    wx.showActionSheet({
      itemList: wlds,
      success: function (res) {
        that.setData({
          'info.wld': wlds[res.tapIndex]
        });
        that.setAmountMoney({ elType: 'wld', value: wlds[res.tapIndex] });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showJb: function (e) {
    var that = this;
    var jbs = that.data.jbs;
    wx.showActionSheet({
      itemList: jbs,
      success: function (res) {
        that.setData({
          'info.jb': jbs[res.tapIndex]
        });
        that.setAmountMoney({ elType: 'jb', value: jbs[res.tapIndex] });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },




  showSb: function (e) {
    var that = this;
    var sbs = that.data.sbs;
    wx.showActionSheet({
      itemList: sbs,
      success: function (res) {
        that.setData({
          'info.sb': sbs[res.tapIndex]
        });
        that.setAmountMoney({ elType: 'sb', value: sbs[res.tapIndex] });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })  
  },
  showSx: function (e) {
    var that = this;
    var sxs = that.data.sxs;

    wx.showActionSheet({
      itemList: sxs,
      success: function (res) {
        that.setData({
          'info.sx': sxs[res.tapIndex]
        });
        that.setAmountMoney({ elType: 'sx', value: sxs[res.tapIndex] });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  ageInput: function (e) {
    var that = this;
    this.setData({
      'info.age': e.detail.value
    });
    that.setAmountMoney({ elType: 'age', value: e.detail.value });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  formSubmit: function (e) {
    console.log(e);
    wx.showLoading({
      title: '信息提交中...',
    })
    //得到信息对象
    let allInfo = e.detail.value;
    //非空判断,提示信息
    var data = this.data;
    var failVo = { flag: true, msg: "校验成功" };
    if (typeof data.info == 'undefined') {
      failVo.flag = false;
      failVo.msg = "请选择出生年月日";
      failVo.el = "csDate";
      this.setData({
        'info.ageErrorColor': "red"
      });
    } else if (typeof data.info.csDate == 'undefined' || data.info.csDate == '') {
      failVo.flag = false;
      failVo.msg = "请选择出生年月日";
      failVo.el = "csDate";
      this.setData({
        'info.ageErrorColor': "red"
      });
    } else if (typeof data.info.zy == 'undefined' || data.info.zy == '') {
      failVo.flag = false;
      failVo.msg = "请选择职业";
      failVo.el = "zy";
      this.setData({
        'info.zyErrorColor': "red"
      });
      this.setData({
        'info.zyErrorColor': "red"
      });
    } else if (typeof data.info.ysr == 'undefined' || data.info.ysr == '') {
      failVo.flag = false;
      failVo.msg = "请选择月收入";
      failVo.el = "ysr";
      this.setData({
        'info.ysrErrorColor': "red"
      });
    } else if (typeof data.info.sb == 'undefined' || data.info.sb == '') {
      failVo.flag = false;
      failVo.msg = "请选择社保";
      failVo.el = "sb";
      this.setData({
        'info.sbErrorColor': "red"
      });
    } else if (typeof data.info.gjj == 'undefined' || data.info.gjj == '') {
      failVo.flag = false;
      failVo.msg = "请选择公积金";
      failVo.el = "gjj";
      this.setData({
        'info.gjjErrorColor': "red"
      });
    } else if (typeof data.info.xyk == 'undefined' || data.info.xyk == '') {
      failVo.flag = false;
      failVo.msg = "请选择信用卡";
      failVo.el = "xyk";
      this.setData({
        'info.xykErrorColor': "red"
      });
    } else if (typeof data.info.fc == 'undefined' || data.info.fc == '') {
      failVo.flag = false;
      failVo.msg = "请选择是否有房产";
      failVo.el = "fc";
      this.setData({
        'info.fcErrorColor': "red"
      });
    } else if (typeof data.info.sx == 'undefined' || data.info.sx == '') {
      failVo.flag = false;
      failVo.msg = "请选择寿险";
      failVo.el = "sx";
      this.setData({
        'info.sxErrorColor': "red"
      });
    } else if (typeof data.info.wld == 'undefined' || data.info.wld == '') {
      failVo.flag = false;
      failVo.msg = "请选择微粒贷";
      failVo.el = "wld";
      this.setData({
        'info.wldErrorColor': "red"
      });
    } else if (typeof data.info.jb == 'undefined' || data.info.jb == '') {
      failVo.flag = false;
      failVo.msg = "请选择是否有借呗";
      failVo.el = "jb";
      this.setData({
        'info.jbErrorColor': "red"
      });
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
      var id = wx.getStorageSync("id");
      var id2 = wx.getStorageSync("id2");
      var mobile = wx.getStorageSync("Phone");
      // 成功后发送请求，提交到后台
      var csDate = this.data.info.csDate;
      var csArr = csDate.split("-");
      var year = csArr[0];
      var month = csArr[1];
      var day = csArr[2];
      console.log(year)
      console.log(day)
      console.log(month)
      console.log(mobile)
      console.log((this.data.sxs.indexOf(this.data.info.sx) + 1))
      console.log((this.data.gjjs.indexOf(this.data.info.gjj) + 1))
      console.log((this.data.zys.indexOf(this.data.info.zy) + 1))
      console.log((this.data.fcs.indexOf(this.data.info.fc) + 1))
      console.log((this.data.sbs.indexOf(this.data.info.sb) + 1))
      console.log((this.data.ysrs.indexOf(this.data.info.ysr) + 1))
      console.log((this.data.xyks.indexOf(this.data.info.xyk) + 1))
      console.log((this.data.jbs.indexOf(this.data.info.jb)),)
      console.log((this.data.wlds.indexOf(this.data.info.wld)))

      wx.request({
        url: "https://m.boc7.com/loanreg/xcxsubmit_b",
        data: {
          // id: id,
          // id2: id2,
          id: id,
          id2: id2,
          year: year,
          month: month,
          day: day,
          mobile: mobile,
          Shouxian: (this.data.sxs.indexOf(this.data.info.sx) + 1),
          EPFTime: (this.data.gjjs.indexOf(this.data.info.gjj) + 1),
          Hire: (this.data.zys.indexOf(this.data.info.zy) + 1),
          Houes: (this.data.fcs.indexOf(this.data.info.fc) + 1),
          SheBaoTime: (this.data.sbs.indexOf(this.data.info.sb) + 1),
          Wage: (this.data.ysrs.indexOf(this.data.info.ysr) + 1),
          XyCard: (this.data.xyks.indexOf(this.data.info.xyk) + 1),
          jiebei: (this.data.jbs.indexOf(this.data.info.jb)),
          weilidai: (this.data.wlds.indexOf(this.data.info.wld))
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          var vacode = res.data.retCode;
          if (vacode == 0) {
            //提交成功
            wx.showToast({ title: '提交成功', icon: 'success', duration: 2000 });
        
            wx.reLaunch({
              url: '../successApply/successApply',
            })

          } else if (vacode == 402) {
            //入库失败
            wx.showModal({
              content: "提交失败，请稍后重试",
              showCancel: false,
              confirmColor: "#169bd5",
              success: function (res) {
              }
            });
            wx.navigateTo({
              url: '../index/index',
            })

          }
          else if (vacode == 400) {
            //参数不全
            wx.showModal({
              content: "参数不全,请重新提交",
              showCancel: false,
              confirmColor: "#169bd5",
              success: function (res) {
              }
            });
            return;

          }
          else if (vacode == 401) {
            //信息找不到
            wx.showModal({
              content: "信息找不到",
              showCancel: false,
              confirmColor: "#169bd5", 
              success: function (res) {
              }
            });
            return;

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
    }
    wx.hideLoading({
      title: '提交完成!',
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


      Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      }
    