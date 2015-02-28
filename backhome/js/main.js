



window.onload=function(){

  var circleCanvasW=250;
  var circleCanvasH=circleCanvasW;

  var group1=d("group1");

  var erase1=new Erase();
  erase1.init({
    canvas:group1.getElementsByTagName("canvas")[0],
    b:group1,
    imgSrc:'img/ca.png',
    W:circleCanvasW,
    H:circleCanvasH

  })
  erase1.showErase();

  var group2=d("group2");
  var erase2=new Erase();
  erase2.init({
    canvas:group2.getElementsByTagName("canvas")[0],
    b:group2,
    imgSrc:'img/ca.png',
    W:circleCanvasW,
    H:circleCanvasH

  })
  erase2.showErase();

  var group3 = d("group3");
  var erase3 = new Erase();
  erase3.init({
    canvas: group3.getElementsByTagName("canvas")[0],
    b: group3,
    imgSrc: 'img/ca.png',
    W: circleCanvasW,
    H: circleCanvasH

  })
  erase3.showErase();

  var secIndex=1;
  var secLength=document.getElementsByClassName("m-page").length;
  $('.next').click(function(event) {
     //console.log('c')
     var that=this;
     var sec=$(that).parent();
     sec.hide('slow', function() {

        if(secIndex<secLength){
           sec.next().show('slow');
           secIndex++;
        }else{
           $(".m-page").first().show('slow');
           secIndex=1;
        }




     });
  });

}

// document.body.addEventListener('touchstart', function(e){
//   e.preventDefault();
//   //console.log('touchstart');

// }, false)

document.body.addEventListener('touchmove', function(e){
  e.preventDefault();
  //console.log('touchmove');


}, false)







function d(id) {
  return document.getElementById(id);
}




// init music
// if(is_ios()){
//     var music = document.getElementById('music')
//     music.play()
//   }
var one = function() {

  var music = document.getElementById('music')
  music.play()

  setInterval(function() {
    var music = document.getElementById('music');
    music.pause();
    music.play();
  }, 33000);


  window.removeEventListener('touchstart', one, false)
};

function is_ios() {
  // 判断是否 iPhone 或者 iPod
  if ((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))) {
    return true;
  } else {
    return false;
  }
}

//页面初始点击监听
//window.addEventListener('touchstart', one, false)