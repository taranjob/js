

window.onload = function() {
  console.log('load')
  cc.game.onStart = function() {
    var g_resources = ["HelloWorld.png","res/background.png","res/start_N.png","res/start_S.png","res/sushi_1n/sushi_1n.png","res/sushi.plist","res/sushi.png"];
    cc.LoaderScene.preload(g_resources, function() {
       console.log('preload');
      cc.director.runScene(new StartScene());
      //cc.director.runScene(new PlayScene());
    }, this);
  }

  cc.game.run("gameCanvas");

}