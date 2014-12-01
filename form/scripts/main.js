"use strict";
/*入口文件*/
window.addEventListener('DOMContentLoaded', function() {

  var bottom = document.getElementById('bottom');
  // Init preloader
  preloader.init({
    id: 'preloader',
    beforeImages: ['./images/bottom-icon.png', './images/music.png','./images/ca.jpg','./images/bg-1.jpg'],
    onInit: function() {},
    onRemove: function() {

      echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function(element, op) {}
      });
    }
  });

});

//全局变量
var formFn;//表单类
var status_submit = 1;//表单提交状态

window.addEventListener('load', function() {
  /*擦一擦*/
  var eraseFn = new Taran.Erase;
  eraseFn.init({
      img: "./images/ca.jpg"
  });
  eraseFn.showErase();

  /*音乐插件*/
  var mu = new Raymond.Music();
  mu.init({
    timer: 55000,
    displayBtn: false,
    icon: document.getElementById('music'),
    src: document.getElementsByTagName('audio')[0],
  });

  //播放音乐
  var music = document.getElementsByTagName('audio')[0];
  if (music != undefined) {
    music.play();
  }

  // 滑动插件
  tee.init({
    id: "lun",
    onMoveComplete: function(t) {

      console.log('page:'+t.pageIndex);

      if (t.pageIndex >= 18) {
        bottom.style.display = 'none'
      } else {
        bottom.style.display = 'block'
      }

    },
    onMoveStart: function(t) {
      bottom.style.display = 'none'
    }
  });
    /*表单类*/
  formFn = new Taran.FormFn;
  var status_submit = 1;//表单
  formFn.init({
    id: "oForm",
    useMargin: true,
    inpClass: "move"
  });



});

//微信分享
WeixinApi.ready(function(Api) {

  var wxData = {
    "appId": "wx6af3edcf70517dd0",
    "imgUrl": 'http://i.weclouds.cn/cqh/show/gdbrand/images/logo2.png',
    "link": window.location.href,
    "desc": '领袖中华，风帆再起(wifi下浏览更佳)',
    "title": "第二届广东省全国名牌颁奖典礼精华"
  };

  var wxData_timeline = {
    "appId": "wx6af3edcf70517dd0",
    "imgUrl": 'http://i.weclouds.cn/cqh/show/gdbrand/images/logo2.png',
    "link": window.location.href,
    "desc": "第二届广东省全国名牌颁奖典礼精华",
    "title": "第二届广东省全国名牌颁奖典礼精华"
  };

  var wxCallbacks = {
    ready: function() {},
    cancel: function(resp) {},
    fail: function(resp) {},
    confirm: function(resp) {

      /*
      $.ajax({
        type: "post",
        url: "http://203.195.162.47/api/tongjiserver.php",
        data: "action=post_click&page=gdbrandShare",
        dataType: "json",
        success: function(data) {}
      });*/

    },
    all: function(resp) {}
  };

  Api.shareToFriend(wxData, wxCallbacks);

  Api.shareToTimeline(wxData_timeline, wxCallbacks);

  Api.shareToWeibo(wxData, wxCallbacks);
});
