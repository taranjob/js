window.onload=function(){

  var talks=Array();


  var turn =window.tt=new Turn();
  turn.init({
    sec:document.getElementsByTagName("section"),
    pageIndex:0,
    speed:400,
    onMoveComplete: function(t) {
      console.log('page:'+t.pageIndex);
      talks[t.pageIndex]=new Array();
      //console.dir(talks);

      talks[t.pageIndex]=t.sec[t.pageIndex].getElementsByClassName("anim");
      console.dir(talks[t.pageIndex]);
      if (talks[t.pageIndex].length>0) {//发射炮
         //console.log('in')

         for(var i=0;i<talks[t.pageIndex].length;i++){

            var showtime=parseInt(talks[t.pageIndex][i]['attributes']['data-show'].value);
            var hidetime=parseInt(talks[t.pageIndex][i]['attributes']['data-hide'].value);
            addInOut(t.pageIndex,i,showtime,hidetime);
         }

      }

      if(t.pageIndex==5){
           setTimeout(function(){
               var imgCat=t.sec[t.pageIndex].getElementsByClassName("hd-cat")[0];
               imgCat.classList.add('fadeOut');

               setTimeout(function(){
                  var imgCatSmall=document.getElementById("hd-cat-small");
                  imgCatSmall.style.opacity='1';
               }, 100);

           }, 2500);
      }

    }
  })

  function addInOut(pageIndex,index,showtime,hidetime){

    console.log('t index:'+index);
    setTimeout(function(){
      talks[pageIndex][index].classList.add('fadeIn');
      setTimeout(function(){
        //if(talks[index].classList.hasClass('fadeIn')){
          talks[pageIndex][index].classList.remove('fadeIn');
        //}

      }, hidetime);
    }, showtime);

  }
  function addIn(time,index){

    setTimeout(function(){
      talks[pageIndex][index].classList.add('fadeIn');

    }, time);

  }


  //canvas
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

  var group3=d("group3");
  var erase3=new Erase();
  erase3.init({
    canvas:group3.getElementsByTagName("canvas")[0],
    b:group3,
    imgSrc:'img/ca.png',
    W:circleCanvasW,
    H:circleCanvasH

  })
  erase3.showErase();


  $(".next").click(function(event) {
    //console.log('c')
    turn.move();
  });







}

function d(id) {
  return document.getElementById(id);
}