// components/content/cmp.js
Component({
 
  properties: {
    articleList:Array
  },

 
  data: {

  },
 
  methods: {
    onTap(e){
      var id = e.currentTarget.dataset.articleid;
      this.triggerEvent('deta',{id},{})
  },
  onMoreTap(e){
    var type = e.currentTarget.dataset.articletype
    this.triggerEvent('more',{type},{})
},
onLikeTap(e){
  var index = e.currentTarget.dataset.articleindex
  this.triggerEvent('like',{index},{})},
},

})