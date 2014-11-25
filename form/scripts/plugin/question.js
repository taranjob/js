"use strict";
(function(win) {

  win.Taran = win.Taran || {};
  var QA = win.Taran.QA = function(args) {
    var arg;
    for (arg in args) {
      this[arg] = args[arg];
    }
  }

  QA.prototype = {
    _curr: 0,//当前题目序号
    _currError:0,//当前题错误次数
    _clickCan: ture,
    _switch: function(idx) {
       //切换下一页
    },
    errorArr:function(q_idx, _currError){
       //错误提示
       var arrError=['在想想是哪一个','再努力想下，没这么容易哦','再努力想想，应该就是它了'];

    },
    answersArr: function(q_idx, a_idx) {
       //判断回答是否正确
       var arrRgith=new Array(0,1,4,4,4);
       if(a_idx===arrRgith[q_idx]){
        return true;
       }else{
        return false
       }
    },
    answer:function(q_idx,a_idx){
       //单击选项会传入题号，回答的选项

       /*
        1.判断回答是否正确
        2.1正确->_errcount=0、下一题
        2.2错误->_errcount++、弹出对应错误提示
       */
    },
    dom:function(){
       //初始化dom结构
    },
    init:function(){
      //初始化

    }

  }


})(window);