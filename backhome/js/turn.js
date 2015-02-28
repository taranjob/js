(function(win){

  var Turn=win.Turn=function(){
    this.sec=null;
    this._Width=window.innerWidth;
    this._Height=window.innerHeight;

    this.pageIndex = 0;
    this.speed = 300;
    this.preIndex=0;//上一个Section索引
    this.moveSec = null;//下一个Section
    this.moveIndex = 0;//下一个Section索引
    this.secClassArr=new Array();
    this.secClassIn="fadeIn";
    this.secClassOut="fadeOutLeft";
    this.secLength = 1;//Section长度
    this.onMoveComplete=null;

  }
  Turn.prototype={
    init:function(args){
      for (var p in args) {
        this[p] = args[p]
      }
      this.secLength = this.sec.length;
      this.moveIndex=this.pageIndex;
      this.preIndex=this.pageIndex;
      //init First Section
      this.initMoveClass();
      //this.sec[this.pageIndex].classList.add(this.secClassArr[0]['InAction']);
      console.log('init');
    },
    initMoveClass:function(){

      var arrAction = null;
      for (var i = 0; i < this.secLength; i++) {
        arrAction = new Array();
        arrAction['InAction'] = this.sec[i]['attributes']['data-in'] == undefined ? this.secClassIn : this.sec[i]['attributes']['data-in'].value;
        arrAction['OutAction'] = this.sec[i]['attributes']['data-out'] == undefined ? this.secClassOut : this.sec[i]['attributes']['data-out'].value;

        this.secClassArr[i] = arrAction;

      }
      //console.dir(this.secClassArr);


    },
    move:function(){
      var _this=this;
      if(this.pageIndex<this.secLength-1){
         this.moveIndex=this.pageIndex+1;
      }else{
         this.moveIndex=0;
      }

      this.sec[this.pageIndex].classList.remove(this.secClassArr[this.pageIndex]['InAction']);
      this.sec[this.pageIndex].classList.add(this.secClassArr[this.pageIndex]['OutAction'])


      this.preIndex=this.pageIndex;
      setTimeout(function(){
         _this.sec[_this.preIndex].classList.remove('show');
      }, 1000);

      this.sec[this.moveIndex].classList.remove(this.secClassArr[this.moveIndex]['OutAction']);

      _this.sec[_this.moveIndex].classList.add('show');
      _this.sec[_this.moveIndex].classList.add(_this.secClassArr[_this.moveIndex]['InAction']);

      this.pageIndex=this.moveIndex;

      _this.onMoveComplete(_this);

    }
  }

})(window)