var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 假数据
  loanData: [{
    img:"../../images/img/1.jpg",
    date: "贷分期-10分钟即可到账10000",
    rate: "10分钟即可到账10000"
  },
  {
    img:"../../images/img/2.jpg",
    date: "好掌柜-3分钟申请",
    rate: "1分钟放款"
  },
  {
    img: "../../images/img/3.jpg",
    date: "多财多亿-最高5000，你的梦想我买单",
    rate: "最高5000，你的梦想我买单"
  },
  {
    img:"../../images/img/4.jpg",
    date: "诺秒贷-5万最快10分钟到账",
    rate: "5万最快10分钟到账"
  },
  {
    img: "../../images/img/5.jpg",
    date: "商奇宝-急用钱找我",
    rate: "急用钱找我"
  },
  {
    img: "../../images/img/6.jpg",
    date: "来这有钱-已为十几万人解决贷款问题",
    rate: "已为十几万人解决贷款问题"
  },
  {
    img: "../../images/img/7.jpg",
    date: "91极速购-播财列表",
    rate: "下款到账3分钟"
  }
    , {
      img: "../../images/img/8.jpg",
      date: "益秒到-额度最高5w",
      rate: "快速注册秒到账"
  }
    , {
      img: "../../images/img/9.jpg",
      date: "趣管账-极速小贷",
      rate: "最高5000秒到账"
    },
    {
      img: "../../images/img/10.jpg",
      date: "备胎信用-最高可借5w",
      rate: "新用户复贷不审核秒放款"
    }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onUnload: function () {
    wx.redirectTo({
       url:"../index/index"
     })
    // wx.navigateBack({
    //   delta: 1
    // })
  },
  onLoad: function (options) {
    var that=this;
     wx.showLoading({
       title: '加载中...',
     })
  
     //请求数据
     wx.request({
       url: 'https://m.boc7.com/loanreg/lowlist',
       method: "POST",
       header: {
         'content-type': 'application/x-www-form-urlencoded' // 默认值
       },
       success: function (res) {
         console.log(res);
         if (res.data.retCode==0){
           var obj = res.data.retObj;
           var loanData=[];
           for (var key in obj){
             obj[key].logo = "https://m.boc7.com" + obj[key].logo;
             loanData.push(obj[key]);
           }
           that.setData({loanData: loanData});
          
         }
       }


     })
     wx.hideLoading({
       title: '加载完成',
     })
  },
  getInfo:function(e){
    var info = e.target.dataset.info;
    app.aldstat.sendEvent('去客服', info);
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