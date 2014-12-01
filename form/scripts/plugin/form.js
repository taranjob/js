"use strict";;
(function(win) {
  win.Taran = win.Taran || {};
  var FormFn = win.Taran.FormFn = function(args) {
    var arg;
    for (arg in args) {
      this[arg] = args[arg];
    }
  }
  FormFn.prototype = {
    "id": null,
    "useMargin": true,
    "inpClass": null,
    "mTopBefore": 0,
    "mTop": "-30%",
    "mTopVal": "data-mt",
    init: function(args) {
      for (var p in args) {
        this[p] = args[p]
      }
      this.initMove(); //模拟表单滑动
      this.initAlert(); //模拟系统提示

      var _this=this;
      touch.on('.aSubmit' , 'tap', function() {
        console.log('submit');
        if (_this.test()) {
          //alert('后台完善中..');
          _this._submit();
        } else {
          console.log('不可重复提交！');
        }
      });

    },
    initMove: function(args) {
      var _this = this;
      if (_this.useMargin) { //表单向上滑动
        _this.mTopBefore = $("#" + _this.id).css("margin-top") == undefined ? 0 : $("#" + _this.id).css("margin-top");
        console.log('mTopBefore: '+_this.mTopBefore);
        console.log('m:'+ _this.id);

        touch.on('.' + _this.inpClass, 'tap', function() {
          console.log('move');
          var that = this;
          var thatForm = $("." + _this.id);
          var mt = _this.mTop;
          if ($(that).attr(_this.mTopVal) != undefined && $(that).attr(_this.mTopVal) != 0) {
            mt = $(that).attr(_this.mTopVal);
          } //设置了该inp的mTop值
          setTimeout(function() {
            $("#" + _this.id).animate({
              'margin-top': mt
            });
            that.focus();
            $(that).blur(function() {
              $("#" + _this.id).animate({
                'margin-top': _this.mTopBefore
              });
            });
          }, 250);
        })
      }
    },
    _submit: function() {
      var _this = this;
      status_submit = 0;
      $.getJSON("http://203.195.162.47/xywx/show/ilove/ajax.php", {
        name: $("#f_name").val(),
        phone: $("#f_tel").val(),
        school: $("#f_school").val(),
        email: $("#f_email").val(),
      }, function(data) {

        if (data.status == "success") {
          status_submit = 1;
          $("body").append(_this.alertDom('' + '提交成功' + '', 'formFn.alertConfirm()', 'OK')).find("#popAlert").fadeIn(200);
          $(".aSubmit").html('提交成功！');
        } else if (data.status == "error") {
          $("body").append(_this.alertDom('' + data.msg + '', 'formFn.alertConfirm()', 'OK')).find("#popAlert").fadeIn(200);
          status_submit = 1;

        } else {
          $("body").append(_this.alertDom('' + '提交个人信息_失败' + '', 'formFn.alertConfirm()', 'OK')).find("#popAlert").fadeIn(200);
          status_submit = 1;
        }
      }).error(function(err) {
        console.log(err);
        $(".aSubmit").html('提交出错！');
      });
    },
    test: function() {
      var _this = this;
      if (!$("#f_name") || $("#f_name").val().length < 1) {
        $("body").append(_this.alertDom('请输入姓名！', 'formFn.alertConfirm()', 'OK')).find("#popAlert").fadeIn(200);
        return false;
      } else if (!$("#f_tel") || !_this.chkMobile($("#f_tel").val())) {
        $("body").append(_this.alertDom('请输入规范的手机号！', 'formFn.alertConfirm()', 'OK')).find("#popAlert").fadeIn(200);
        return false;
      } else if (!$("#f_school") || $("#f_school").val().length < 1) {
        $("body").append(_this.alertDom('请输入学校！', 'formFn.alertConfirm()', 'OK')).find("#popAlert").fadeIn(200);
        return false;
      } else if (!$("#f_email") || !_this.chkEmail($("#f_email").val())) {
        $("body").append(_this.alertDom('请输入规范的邮箱！', 'formFn.alertConfirm()', 'OK')).find("#popAlert").fadeIn(200);
        return false;
      } else {
        return true;
      }
    },
    chkMobile: function(tel) {
      if (/^12\d{9}$/g.test(tel) || /^13\d{9}$/g.test(tel) || (/^15\d{9}$/g.test(tel)) || (/^17\d{9}$/g.test(tel)) || (/^18\d{9}$/g.test(tel))) {
        return true;
      } else {
        return false;
      }
    },
    chkEmail: function(email) {
      if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    initAlert: function() {
      var styles = '<style></style>';
      $("body").append(styles);

    },
    alertDom: function(PH_content, PH_confirm_fn, PH_confirm_text) {
      var PH = '<div id="popAlert">' +
        '<div id="popAlert-bg"></div>' +
        '<div id="popAlert-body">' +
        '<div id="popAlert-body-con">' + PH_content + '</div>' +
        '<a href="javascript:" id="popAlert-con-btn" onClick="' + PH_confirm_fn + '">' + PH_confirm_text + '</a>' +
        '</div>' +
        '</div>';
      return PH;
    },
    alertConfirm: function() {
      $("#popAlert").animate({
        opacity: '0'
      }, 200, function() {
        $(this).remove();
      });
    }


  }

})(window);