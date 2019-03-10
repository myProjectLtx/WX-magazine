// pages/aticleDetail/aticleDetail.js

var request = require('../../utils/request.js')
var audio = wx.getBackgroundAudioManager()
Page({

  data: {
    articleDetail: {},
    videoCoverHidden: true,
    playing: false,
    audioCurTime: 0,       //当前音频时间
    progressPercent: 0,    //百分比
    progressCircleLeft:0,  //小球位置
    progressWidth:520,     //播放条宽度
    audioCircleOrigionX:0, //触摸位置
    getAudioOrigionFlag:false,
  },


  onLoad: function (options) {
    this.getData(options.id)
  },
  getData: function (id) {
    var that = this;
    request({
      url: '/getArticleDetail/' + id,
      success: function (res) {
        that.setData({
          articleDetail: res
        })
      }
    })
  },

  onVideoTap: function () {
    this.setData({
      videoCoverHidden: false
    })
    var myVideo = wx.createVideoContext('myVideo');
    myVideo.play()
  },

  audioPlay:function(){
    audio.title = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"
      audio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"
      this.listenAudioPlay()
      this.updateAudioData()
  },


  onAudioPlayTap: function () {
    var playing = this.data.playing;
    if (playing) {
      audio.pause()
    } else {
      this.audioPlay()
      }
    this.setData({
      playing: !playing
    })
    
  },
  //音频播放按键
  listenAudioPlay: function () {
    var that = this
    audio.onPause(function () {
      that.setData({
        playing: false
      })
    })
    audio.onStop(function () {
      that.setData({
        playing: false
      })
    })
    audio.onEnded(function () {
      that.setData({
        playing: false
      })
    })
    audio.onPlay(function () {
      that.setData({
        playing: true
      })
    })
  },
  //更新音频相应数据
  updateAudioData: function () {
    var that = this
    var audioDuration = this.data.articleDetail.audio.duration

    audio.onTimeUpdate(function () {
      var audioCurTime = audio.currentTime.toFixed()
      var percent = audioCurTime / audioDuration
      var progressPercent = percent * 100
      var progressCircleLeft = percent * that.data.progressWidth
      that.setData({
        audioCurTime: audioCurTime, 
        progressPercent: progressPercent,
        progressCircleLeft:progressCircleLeft 
      })
    })
  },
  //触摸
  onAudioCircleStart:function(e){
    var audioCircleOrigionX = e.touches[0].pageX * this.getPhoneRadio()//触摸位置
    if(!this.data.getAudioOrigionFlag){
      this.setData({
        audioCircleOrigionX:audioCircleOrigionX,
        getAudioOrigionFlag:true
      })
    }
    
  },
  //拖动圆球移动
  onAudioCircleMove:function(e){
    var audioCircleOrigionX = this.data.audioCircleOrigionX
    var audioCircleMoveX = e.touches[0].pageX * this.getPhoneRadio()
    var progressCircleLeft = audioCircleMoveX - audioCircleOrigionX
    if(progressCircleLeft <= 0){
      progressCircleLeft = 0
    }else if(progressCircleLeft >= this.data.progressWidth){
      progressCircleLeft = this.data.progressWidth
    }
    var progressPercent = progressCircleLeft / this.data.progressWidth * 100
    var audioCurTime = (progressCircleLeft / this.data.progressWidth * this.data.articleDetail.audio.duration).toFixed()
    this.audioPlay()
    audio.seek(Number(audioCurTime))
    this.setData({
      progressCircleLeft:progressCircleLeft,
      progressPercent:progressPercent,
      audioCurTime:audioCurTime
    })
  },
  //获取手机宽度
  getPhoneRadio:function(){
    var radio = 0;
    wx.getSystemInfo({
      success:function(res){
        console.log(res)
        var width = res.screenWidth
        radio = 750 / width
      }
    })
    return radio
  },




  

})