var UI={
 score:0,
 pg:0,
 lastTime:0,
 multiplier:1,
 addScore:function(s){

 },
 end:function(){

 },
}


var Manager={
  gameTime:0,
  cat:null,
  aliveDogs:0,
  maxAliveDogs:8,
  clear:function(){

  },
  init:function(scene){

  },
  run:function(){

  },
  addDogs:function(){

  },
}

var Doge=cc.Sprite.extend({
  state:1,
  rotRate:25,
  rotLeft:true,
  target:null,
  attackDist:80,
  attackDelay:1.5,
  left:true,
  alive:true,
  type:0,
  avail:false,
  ctor:function(target){

  },
  reset:function(){

  },
  walk:function(){

  },
  charge:function(){

  },
  attack:function(){

  },
  dead:function(){

  },
  fadeOut:function(){

  },
  hide:function(){

  },
  hurt:function(){

  },
  update:function(dt){

  }
});

Dage.getFromPool=function(){
  var d=new Doge(Manager.cat);
  cc.director.getRunningScene().addChild(d);
  d.reset();
  dogs.push(d);
  return d;

}

var Husky=cc.Sprite.extend({
  state:1,
  rotRate:25,
  rotLeft:true,
  target:null,
  attackDisk:120,
  attackDelay:1.5,
  left:true,
  alive:true,
  type:1,
  avail:false,
  ctor:function(target){

  },
  reset:function(){

  },
  walk:function(){

  },
  charge:function(){

  },
  attack:function(){

  },
  dead:function(){

  },
  fadeOut:function(){

  },
  hide:function(){

  },
  hurt:function(){

  },
  update:function(dt){

  }
});

Husky.getFromPool=function(){
  var d=new Husky(Manager.cat);
  cc.director.getRunningScene().addChild(d);
  d.reset();
  dogs.push(d);
  return d;
}

var Cat=cc.Sprite.extend({
  state:0,
  rotRate:25,
  rotLeft:true,
  touchtime:Infinity,
  targetPos:null,
  left:true,
  attackDist:140,
  speed:135,
  sceenHeight:0,
  ctor:function(){

  },
  idle:function(){

  },
  walk:function(){

  },
  atack:function(){
    this.stopAllActions();
    this.state=2;
    this.setTextureRect(cc.rect(80,2,52,54));
    this.tourchtime=Infinity;
  },
  hurt:function(){

  },
  update:function(dt){

  }
});

var MyScene=cc.Scene.extend({
  cat:null,
  touchbeginpos:null,
  onEnter:function(){

  }
});

window.onload=function(){

};

var ShareUI=cc.LayerColor.extend({
  ctor:function(){

  },
  onEnter:function(){
    this._super();
  }
})



