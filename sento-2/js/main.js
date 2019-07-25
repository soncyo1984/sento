jQuery.noConflict();
var $ = jQuery;
$(function ($) {
bgchanging();


$('a[href^="#"]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    if(window.innerWidth<766){
      href=href+"-sp";
    }
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });


  $(window).load(function () {
   // bgchanging();
    twload();
  
  //setInterval(twload, 1000);

  });
  var $win = $(window);
  $win.scroll(function () {
    scrolled();
  });
  if ('ontouchstart' in window) {
    $win.bind('touchmove', function () {
      scrolled();
    });
  }
  scrolled();
  m_set();
});


function m_set() {
  $(".weekly-a dt").each(function (index) {
    $(this).attr("dtname", $(this).text());
  });
}



function scrolled() {
  fixarea();
}

function fixarea() {
  var whc = $(".weekly-header").offset().top - window.pageYOffset + 100;
  if (whc < 0) {
    whc = 0;
  }
  var f_height = window.innerHeight;
  var ahc = $(".article-head-container").offset().top - window.pageYOffset;
  if (f_height > ahc) {
    f_height = ahc;
  }
  if (ahc < 0) {
    ahc = 0;
  }
  $(".fixarea").css("height", f_height + "px").css("top", whc + "px");
}

var rope_odd = 0;

function bgchanging() {




  $("body").addClass("bgchanging");

setTimeout(function(){
  $("body").removeClass("bgchanging");
  },40);

}
function fCamelToSnake(p){
   return p.replace(/([A-Z])/g,
                function(s) {
                    return '_' + s.charAt(0).toLowerCase();
                }
        );
    
}

function twload(){





//console.log("twl");



  $(".weekly-sp blockquote.twitter-tweet").each(function (index) {



    for (key in $(this).data()) {
$(this).removeAttr("data-"+fCamelToSnake(key).replace("_","-").replace("_","-"));
//      $(this).removeData(key);
//  alert('key:' + key + ' value:' + $(this).data()[key]);
}

      $(this).data("lang","ja");


  });


twttr.widgets.load();


}

var skipTo3 = function() {
  var position;
  if (window.innerWidth <= 765) {
    position = $('#section-3-sp').offset().top;
  } else {
    position = $('#section-3').offset().top;
  };
  $('html, body').animate({scrollTop:position}, 0, 'swing');
  return false;
};
