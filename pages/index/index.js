//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    persons: [],
    value: null
  },
  onLoad: function () {
    // console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  },
  // 输入框输入事件
  _input: function(e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  // 点击按钮进行搜索
  _search: function(e) {
    var that = this
    var value = this.data.value
    if(!value) {
      return
    }
    // 请求接口
    wx.request({
      url: 'http://192.168.99.100:8080/'+value,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data)
        let persons = [];
        for(let person in res.data) {
          persons.push(res.data[person])
        }
        that.setData({
          persons: persons
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})
