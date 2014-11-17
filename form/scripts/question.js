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
    _curr: 0,
    _clickCan: ture,
    _switch: function(idx) {

    },
    answersArr: function(q_idx, a_idx) {

    },
    answer:function(q_idx,a_idx){

    },
    dom:function(){

    },
    init:function(){

    }

  }


})(window);