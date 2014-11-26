

window.onload = function() {
  console.log('load')
  cc.game.onStart = function() {
    var g_resources = "HelloWorld.png";
    cc.LoaderScene.preload(["HelloWorld.png"], function() {
       console.log('preload');
      cc.director.runScene(new StartScene());
    }, this);
  }

  cc.game.run("gameCanvas");

}