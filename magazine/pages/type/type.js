// pages/type/type.js
var request = require('../../utils/request.js')

Page({

  data: {
    newtitle:{},
    articleList:[]
  },

  onLoad: function (options) {
    var typeId = options.typeId;
   this.getData(typeId)
  },

  getData: function (typeId) {
    var that = this;
    request({
      url:'/getArticleTypeTitleInfo/' + typeId,
      success:function(res){
        that.setData({
          newtitle: res
        })
      }
    })
    request({
      url:'/getArticleTypeList/' + typeId,
      success:function(res){
        that.setData({
          articleList: res
        })
      }
    })
  },
  //跳到子页面
  onTap:function(e){
    var id = e.detail.id;
    wx.navigateTo({
      url:'/pages/articleDetail/articleDetail?id=' + id
    })
    },
    onMoreTap: function (e) {
      var type = e.detail.type
     wx.showActionSheet({ 
       itemList: ['内容过期了', '内容和' + type + '不相关', '不显示'],
       itemColor: '#f40',
       success: function (res) {
 
       }
     })
   },
})