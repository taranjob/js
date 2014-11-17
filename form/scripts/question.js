"use strict";
(function(win) {

  win.Taran = win.Taran || {};
  var QA = win.Taran.QA = function(args) {
    var arg;
    for (arg in args) {
      this[arg] = args[arg];
    }
  }

  QA.prototype={

  }


})(window)