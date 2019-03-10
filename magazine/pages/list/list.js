// pages/list/list.js
Page({

  data: {
    
  },

  onLoad: function (options) {
    this.getHomeData();
    this.getLikeData();
  },

  onLikeTap: function (e) {
    var index = e.detail.index; //获取从前端传来的父级触发元素
    var listLike = this.data.listLike;
    var isLike = listLike[index];
    listLike[index] = !isLike;
    this.setData({  //设置Data
      listLike: listLike
    })
    wx.setStorageSync('listLike', listLike) //设置缓存（同步）
  },

  onMoreTap: function (e) {
     var type = e.detail.type
    wx.showActionSheet({ //模态框 展示更多内容
      itemList: ['内容过期了', '内容和' + type + '不相关', '不显示'],
      itemColor: '#f40',
      success: function (res) {

      }
    })
  },

  onArticleTypeTap: function (e) {
    var typeId = e.currentTarget.dataset.articletypeid;
    console.log('请点击："男性穿搭";"人生整理术";"读书（有彩蛋）"')
    wx.navigateTo({ //跳转页面
      url: '/pages/type/type?typeId=' + typeId
    })
  },

  getHomeData: function () {
    var that = this;
    wx.request({ //发送数据请求
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getRecommendInfo',
      success: function (res) {
        that.setData({
          recommend: res.data.data, 
        })
      }
    }),
    wx.request({ //发送数据请求
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getMarkTypeList',
      success: function (res) {
        that.setData({
          markType: res.data.data,          
        })
      }
    }),
    wx.request({ //发送数据请求
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getHomeArticleList',
      success: function (res) {
        that.setData({
          articleList: res.data.data,
        })
      }
    })
  },

  getLikeData: function () {
    var listLikeStorage = wx.getStorageSync('listLike');//获取缓存（同步）
    if (!listLikeStorage) {
      listLikeStorage = {}
    }
    this.setData({
      listLike: listLikeStorage
    })
  },
})

