var TOUCHDELAY=150;
var COLSIZE=24;
var dogs=[];


var debugModel=false;


var UI={
  score:0,
  pg:0,
  lastTime:0,
  multiplier:1,
  addScore:function(s){
    var now=Date.now();
    var timeD=now-this.lastTime;
    if(timeD<500){
      this.multiplier++;
    }else{
      this.multiplier=1；
    }

    this.score+=s*this.multiplier;
    this.scoreLabel.string=this.score;//得分板
    this.lastTime=now;
    this.scoreLabel.stopAllActions();
    this.scoreLabel.setScale((this.multiplier-1)*0.5+1.5);
    this.scoreLabel.runAction(cc.scaleTo(0.3,1));
    this.pg++;
    this.pgLabel.string=this.pg;

  },
  end:function(){
    var sp=new cc.Sprite("end.png");
    cc.director.getRunningScene().addChild(sp,5);
    sp.setPosition(160,cc.director.getVisbleSize().height/2);
    var hiscore=169;

    var rand=Math.random()*12454;
    var rank=0;
    var percent='';
    var lb=cc.LabelTTF.create("地球太危险");
    lb.strokeStyle=cc.color(0,0,0);
    lb.lineWidth=2;
    sp.addChild(lb);
    lb.setPosition(sp.getContentSize().widht/2+2,sp.getContentSize().height/2-5);

    cc.eventManager.addListener({
      event:cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches:true,
      onTouchBegan:function(t,e){
        return true;
      },
      onTouchEnded:function(t,e){
        var pos=t.getLocation();
        var sh=cc.director.getVisibleSize().height;
        if(cc.rectContainsPoint(cc.rect(38,sh/2-128,116,41),pos)){
          var share=new ShareUI();
          cc.director.getRunningScene().addChild(share,15);
        }else if(cc.rectContainsPoint(cc.rect(167,sh/2-128,116,41),pos)){
          e.getCurrentTarget().removeFromParent();
          Manager.clear();
          Manager.init(cc.director.getRunningScene());
        }
      }
    },sp);
  }

};

var Manager={

    gameTime:0,
    cat:null,
    aliveDogs:0,
    maxAliveDogs:8,
    clear:function(){
      for(var i=dogs.length-1;i>=0;i--){
        dogs[i].removeFromParent();
      }
      dogs=[];
      this.cat.idle();//状态
      UI.scoreLabel.setString(0);
      UI.pgLabel.setString(0);
    },
    init:function(scene){
        UI.score=0;
        UI.lastTime=0;
        UI.multiplier=0;
        UI.pg=0;
        this.aliveDogs=0;
        this.gameTime=Date.now();
        var size=cc.director.getVisibleSize();
        if(!this.cat){
          this.cat=new Cat;
        }
        this.cat.attr({
          x:size.width/2,
          y:size.height/2
        });
        scene.addChild(this.cat,1);

        scene.scheduleOnce(this.run,1.5);
        this.addDogesBinded=this.addDogs.bind(this);
    },
    run:function(){
      var a=Doge.getFromPool();
      a.reset();
      var b=Doge.getFromPool();
      b.reset();
      this.aliveDogs=2;

    },
    addDogs:function(){
      var num=0|(Math.random()*2)+1;
      if(this.aliveDogs+num<=this.maxAliveDogs){
        this.aliveDogs+num;

        var elapsed=Date.now()-this.gameTime;
        var r=Math.random();
        var seed=r+(cc.clampf(20,10,(elapsed/1000))-10)*0.07;
        if(seed>0.7){
          Husky.getFromPool().reset();
        }else{
          Doge.getFromPool().reset();
        }

        if(num===2){
           var r=Math.random();
           var seed=r+(cc.clampf(20,10,(elapsed/1000))-10)*0.07;
           if(seed>0.7){
            Husky.getFromPool().reset();
           }else{
            Doge.getFromPool().reset();
           }
        }
      }

    }
}



/*
游戏场景
*/
var MyScene=cc.Scene.extend({

});