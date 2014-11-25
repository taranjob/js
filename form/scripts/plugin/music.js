"use strict";

;(function(exports, undefined) {

  exports.Raymond = exports.Raymond || {};
  var ex = exports.Raymond;
  var Music = ex.Music = function(options) {
    var p;
    for (p in options) {
      this[p] = options[p];
    }
  };

  Music.prototype = {
    "loop": null,
    "icon": document.getElementById('music'),
    "src": document.getElementsByTagName('audio')[0],
    "musicBtn": 'btn-musiced',
    "displayBtn": false,
    "start": true,
    "timer": 50000,
    init: function(args) {
      for (var p in args) {
        this[p] = args[p]
      }
      var _this = this;

      window.addEventListener('touchstart', function(){//初始化时，点击即播放
        if(_this.start){
          _this.play();
          _this.start = false;
        }
      }, false)

      if(this.onInit){
        this.onInit()
      }
    },
    play: function() {
      var _this = this;
      _this.src.play()

      _this.loop = setInterval(function() {//循环播放
        _this.src.pause();
        _this.src.play();
      }, _this.timer)

      if (_this.displayBtn) {//显示播放效果
        _this.icon.style.cssText += ";display:block;"
        _this.icon.classList.add(_this.musicBtn)

        _this.icon.addEventListener('touchstart', function() {//音乐图标添加切换的监听
          _this.toggle()
        }, false);
      }
      if(this.onPlay){
        this.onPlay()
      }
    },
    toggle: function() {
      var _this = this;
      if (_this.src != undefined) {
        if (_this.src.paused || _this.src.ended) {//未播放
          _this.src.play();
          _this.loop = setInterval(function() {//循环播放
            _this.src.pause();
            _this.src.play();
          }, _this.timer);
          if (_this.displayBtn) _this.icon.classList.add(_this.musicBtn);//显示音乐图标播放效果
        } else {
          clearInterval(_this.loop);//清楚循环播放
          _this.src.pause();
          if (_this.displayBtn) _this.icon.classList.remove(_this.musicBtn);//取消音乐图标播放效果
        }
      }
    }
  };
})(this);