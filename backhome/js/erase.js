"use strict";

;
(function(win, document) {

  var Erase = win.Erase = function() {
    // Init Canvas
      this.canvas = null;
      this.b = null;
      this.W = 100;
      this.H = 100;
      this.x1, this.y1, this.x2, this.y2, this.a = 30;
      this.timeout, this.totimes = 100;
      this.jiange = 30;
      this.ctx = null;
      this.img=null;
      this.imgSrc='';
      this.percent=0.6;
      //this.canvas.width = 100;
      //this.canvas.height = 100;


  }

  Erase.prototype = {
    init: function(args) {
      for (var p in args) {
        this[p] = args[p]

      }
      //this.W = this.b.clientWidth;
      //this.H = this.b.clientHeight;
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = this.W;
      this.canvas.height = this.H;
      this.canvas.style.display='none';

      //console.log('ww:'+this.W);

      var _this = this;
      var img = new Image();
      img.src = _this.imgSrc;
      img.onload = function() {
        _this.ctx.drawImage(img, 0, 0, _this.canvas.width, _this.canvas.height)
        _this.tapClip()
      }
    },
    showErase:function(){
      var _this=this;
      this.canvas.style.display='block';
    },
    tapClip: function() {
      var _this=this;
      var hastouch = "ontouchstart" in window ? true : false,
        tapstart = hastouch ? "touchstart" : "mousedown",
        tapmove = hastouch ? "touchmove" : "mousemove",
        tapend = hastouch ? "touchend" : "mouseup";

      _this.ctx.lineCap = "round";
      _this.ctx.lineJoin = "round";
      _this.ctx.lineWidth = _this.a * 2;
      _this.ctx.globalCompositeOperation = "destination-out";

      _this.canvas.addEventListener(tapstart, function(e) {
        clearTimeout(_this.timeout)
        e.preventDefault();

        _this.x1 = hastouch ? e.targetTouches[0].pageX : e.clientX - _this.canvas.offsetLeft;
        _this.y1 = hastouch ? e.targetTouches[0].pageY : e.clientY - _this.canvas.offsetTop;

        _this.ctx.save();
        _this.ctx.beginPath();
        _this.ctx.arc(_this.x1, _this.y1, 1, 0, 2 * Math.PI);
        _this.ctx.fill();
        _this.ctx.restore();

        _this.canvas.addEventListener(tapmove, tapmoveHandler);

        _this.canvas.addEventListener(tapend, function() {
          _this.canvas.removeEventListener(tapmove, tapmoveHandler);
        });

        function tapmoveHandler(e) {
          clearTimeout(_this.timeout)
          e.preventDefault()
          _this.x2 = hastouch ? e.targetTouches[0].pageX : e.clientX - _this.canvas.offsetLeft;
          _this.y2 = hastouch ? e.targetTouches[0].pageY : e.clientY - _this.canvas.offsetTop;

          _this.ctx.save();
          _this.ctx.moveTo(_this.x1, _this.y1);
          _this.ctx.lineTo(_this.x2, _this.y2);
          _this.ctx.stroke();
          _this.ctx.restore()

          _this.x1 = _this.x2;
          _this.y1 = _this.y2;
          _this.timeout = setTimeout(function() {
            checkData();
          }, _this.totimes)
        }

        function checkData() {
          var imgData = _this.ctx.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
          var dd = 0;
          for (var x = 0; x < imgData.width; x += _this.jiange) {
            for (var y = 0; y < imgData.height; y += _this.jiange) {
              var i = (y * imgData.width + x) * 4;
              if (imgData.data[i + 3] > 0) {
                dd++
              }
            }
          }
          if (dd / (imgData.width * imgData.height / (_this.jiange * _this.jiange)) < _this.percent) {
            _this.canvas.style.opacity = 0;
            setTimeout(function() {
              if (_this.canvas) {
                //_this.b.removeChild(_this.canvas)
              }
            }, 500);
          }
        }
      })
    }
  }

})(window, document);