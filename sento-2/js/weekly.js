
window.addEventListener('DOMContentLoaded', function() {
  // elements
  var $window,
      $html,
      $body;

  // const
  var WAYPOINT_OFFSET = '33.3%',
      SCROLL_DURATION = 400;


  var isMobile = function() {
    return $window.width() <= 768;
  };


  var visibleCover = 1;

  var isSpScrollInitialized = false;


  $(function() {
    $window = $(window);
    $html = $('html');
    $body = $('body');

    initialize();
    switchCover();
    
    
    anchorScroll();
    pagetop();
    
if(0){
    imagesLoaded(document.querySelector('.weekly-cover'), function() {
      swipeCover();
    });
  }

    if(!isMobile()) {

      changeBackground();

      var $layout = $('.weekly-layout');
      var n = 1;

      
    }

    if(isMobile()) {
      showSections();

      changeBackgroundSp();

      var timer = setTimeout(function() {
        $html.removeClass('is-section-1 is-section-2 is-section-3');
      }, 1000);
    }


    // $window.on('scroll', _.debounce(onScrollTrump, 500));

    new Waypoint({
      element: document.getElementById('section-2'),
      handler: function(direction) {
        if(direction === 'down') {
          $('.weekly-layout-bg').addClass('is-half');
        } else {
          $('.weekly-layout-bg').removeClass('is-half');
        }
      },
      offset: '50%'
    });

    new Waypoint({
      element: document.getElementById('section-3'),
      handler: function(direction) {
        if(direction === 'down') {
          $('.weekly-layout-bg').addClass('is-full');
        } else {
          $('.weekly-layout-bg').removeClass('is-full');
        }
      },
      offset: '50%'
    });
  });





  /**
   * 初期化
   */
  function initialize() {
    var $coverContainer = $('.weekly-cover-container');
    var hasRelated = $coverContainer.data('related');

    var onResize = function() {
      var windowWidth = $window.width();
      var coverHeight = hasRelated ? windowWidth * 1.82 : windowWidth * 1.5;
      // var coverHeight = windowWidth * 1.5;

      if(isMobile()) {
        $coverContainer.css({
          height: coverHeight
        });
      } else {
        $coverContainer.css({
          height: 'auto'
        });
      }
    };

    

    _cloneSections();

    $window.on('resize', onResize).trigger('resize');
  }

  function _cloneSections() {
    var $section1 = $("#section-1").html(),
        $section2 = $("#section-2").html(),
        $section3 = $("#section-3").html();

    $('.js-section-1-content').append($section1);
    $('.js-section-2-content').append($section2);
    $('.js-section-3-content').append($section3);
  }


  /**
   * カバー切り替え(PC)
   */
  function switchCover() {
    var $tabItem = $('.js-tab-item');

    var onMouseenter,
        onMouseleave;

    onMouseenter = function(e) {
      var eventTarget = $(e.currentTarget),
          index = +eventTarget.data('index');

      $('.js-tab-item.is-current').removeClass('is-current');
      eventTarget.addClass('is-current');

      switch(index) {
        case 1:
          $html.removeClass('is-cover-2-visible is-cover-3-visible is-cover-4-visible');
          break;

        case 2:
          $html
            .addClass('is-cover-2-visible')
            .removeClass('is-cover-3-visible is-cover-4-visible');

          break;

        case 3:
          $html
            .addClass('is-cover-3-visible')
            .removeClass('is-cover-2-visible is-cover-4-visible');

          break;

        case 4:
          $html
            .addClass('is-cover-4-visible')
            .removeClass('is-cover-1-visible is-cover-2-visible is-cover-3-visible');

          break;

        default:
          break;
      }
    };

    onMouseleave = function() {};

    $tabItem
      .on('click', function(e) {
        e.preventDefault();
      })
      .hover(onMouseenter, onMouseleave);
  }


  /**
   * カバー切り替え(SP)
   */
  function swipeCover() {
    var isSwiped = false;

    var $cover = $('.weekly-cover');

    var onTouchmove = function(e) {
      e.originalEvent.preventDefault();
    };

    var onSwipeupImage1 = function() {
      toggleSwiped();

      $html
        .addClass('is-cover-2-visible')
        .removeClass('is-cover-3-visible');

      visibleCover = 2;
    };

    var onSwipeupImage2 = function() {
      toggleSwiped();

      $html
        .addClass('is-cover-3-visible')
        .removeClass('is-cover-2-visible');

      visibleCover = 3;
    };

    var onSwipeupImage3 = function() {
      toggleSwiped();

      $html
        .addClass('is-cover-4-visible')
        .removeClass('is-cover-3-visible');

      visibleCover = 3;
    };

    var onSwipedownImage1 = function(e) {
      toggleSwiped();

      $html.removeClass('is-cover-2-visible is-cover-3-visible is-cover-4-visible');

      visibleCover = 1;
    };

    var onSwipedownImage2 = function() {
      toggleSwiped();

      $html
        .addClass('is-cover-2-visible')
        .removeClass('is-cover-3-visible is-cover-4-visible');

      visibleCover = 2;
    };

    var onSwipedownImage3 = function() {
      toggleSwiped();

      $html
        .addClass('is-cover-3-visible')
        .removeClass('is-cover-4-visible');

      visibleCover = 3;
    };

    var toggleSwiped = function() {
      if(!isSwiped) {
        $cover.addClass('is-swiped');
        isSwiped = true;
      }
    };

    $('.js-hitArea').on('touchmove', onTouchmove);

    var hammertime1 = new Hammer(document.querySelector('.js-hitArea-1'));
    hammertime1.get('swipe').set({ 
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 5
    });
    hammertime1.on('swipeup', onSwipeupImage1);
    hammertime1.on('swipedown', onSwipedownImage1);

    var hammertime2 = new Hammer(document.querySelector('.js-hitArea-2'));
    hammertime2.get('swipe').set({
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 5
    });
    hammertime2.on('swipeup', onSwipeupImage2);
    hammertime2.on('swipedown', onSwipedownImage2);


    var hammertime3 = new Hammer(document.querySelector('.js-hitArea-3'));
    hammertime3.get('swipe').set({
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 5
    });
    hammertime3.on('swipeup', onSwipeupImage3);
    hammertime3.on('swipedown', onSwipedownImage3);
  }


  /**
   * 各セクションを表示する  
   */
  function showSections() {
    if(!isMobile()) {
      return;
    }

    var onClick = function(e) {
      var eventTarget,
          id,
          coverIndex;

      eventTarget = $(e.currentTarget);
      id = eventTarget.attr('href');
      coverIndex = eventTarget.data('cover');

      if(coverIndex == 4) {
        return;
      }

      e.preventDefault();

      // if(isMobile()) {
      //   stick();
      // }

      if(!isSpScrollInitialized) {
        setTimeout(function() {
          changeBackgroundSp();

          isSpScrollInitialized = true;
        }, 2000);
        
        // var OFFSET = 100;
        // var sectionHeader1 = document.querySelector('.js-section-1-content .weekly-section-header');
        // var sectionHeader2 = document.querySelector('.js-section-2-content .weekly-section-header');
        // var sectionHeader3 = document.querySelector('.js-section-3-content .weekly-section-header');

        // alert('sp scroll')
        // setTimeout(function() {
        //   new Waypoint.Sticky({
        //     element: sectionHeader1,
        //     offset: OFFSET
        //   });

        //   new Waypoint.Sticky({
        //     element: sectionHeader2,
        //     offset: OFFSET
        //   });

        //   new Waypoint.Sticky({
        //     element: sectionHeader3,
        //     offset: OFFSET
        //   });

        //   $window.trigger('resize');
        // }, 1000);
      }

      

      if(coverIndex === visibleCover) {
        show(id);  
      } else {
        // console.log('いかない')
      }
    };

    var onClickBack = function(e) {
      e.preventDefault();

      hide();
    };

    var show = function(id) {
      var target = null;

      switch(id) {
        case '#section-1':
          target = $('.js-section-1');
          $html.addClass('is-section-1');
          break;
        case '#section-2':
          target = $('.js-section-2');
          $html.addClass('is-section-2');
          break;
        case '#section-3':
          target = $('.js-section-3');
          $html.addClass('is-section-3');
          break;
        default:
          break;
      }

      $('.weekly-cover').addClass('is-hidden');
      $('.weekly-article-sp').addClass('is-visible');

      var timer = setTimeout(function() {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1);
      }, 400);
    }

    var hide = function() {
      $('.weekly-cover').removeClass('is-hidden');

      $html.removeClass('is-section-1 is-section-2 is-section-3');
      $('.weekly-article-sp').removeClass('is-visible');
    };

    $('.js-cover').on('click', onClick);
    $('.js-back-cover, .weekly-header').on('click', onClickBack)
  }


  /**
   * 背景ノイズ
   */

  var bgw = ".weekly-bg-inner-1,.weekly-bg-inner-2,.weekly-bg-inner-3";


   function backgroundNoise(num){



// Start rumble on element
//$(bgw).addClass("buruburu");
bgchanging();
//$("body").addClass("pt_on");

// Stop rumble on element

   }



  /**
   * 背景切り替え(PC)
   */
  function changeBackground() {


    new Waypoint({
      element: document.querySelector('.js-waypoint-2'),
      handler: function(direction) {
backgroundNoise(3);
        if(direction === 'down') {
          $html.addClass('is-section-2');
        } else {
          $html.removeClass('is-section-2');
        }
      },
      offset: WAYPOINT_OFFSET
    });

    new Waypoint({
      element: document.querySelector('.js-waypoint-3'),
      handler: function(direction) {

backgroundNoise(3);

        if(direction === 'down') {
          $html.addClass('is-section-3');
        } else {
          $html.removeClass('is-section-3');
        }
      },
      offset: WAYPOINT_OFFSET
    });
  }

  /**
   * 背景切り替え(SP)
   */
  function changeBackgroundSp() {
    new Waypoint({
      element: document.querySelector('.js-waypoint-2-sp'),
      handler: function(direction) {
        backgroundNoise(3);

        if(direction === 'down') {
          $html.addClass('is-section-2');
        } else {
          $html.removeClass('is-section-2');
        }
      },
      offset: WAYPOINT_OFFSET
    });

    new Waypoint({
      element: document.querySelector('.js-waypoint-3-sp'),
      handler: function(direction) {
        backgroundNoise(3);

        if(direction === 'down') {
          $html.addClass('is-section-3');
        } else {
          $html.removeClass('is-section-3');
        }
      },
      offset: WAYPOINT_OFFSET
    });
  }


  /**
   * アンカー
   */
  function anchorScroll() {
    var $anchor = $('.js-anchor');

    var onClick = function(e) {
      var eventTarget,
          id;

      e.preventDefault();

      if(isMobile()) {
        return;
      }

      eventTarget = $(e.currentTarget);
      id = eventTarget.attr('href');

      $('html, body').animate({
        scrollTop: $(id).offset().top
      }, SCROLL_DURATION);
    };

    $anchor.on('click', onClick);
  }


  /**
   * ページトップ  
   */
  function pagetop() {
    var $pagetop = $('.js-pagetop');

    var offsetTop = 0;

    var onClick,
        onScroll,
        onMousewheel;

    var isCoverVisible = false;

    onClick = function(e) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: 0
      }, SCROLL_DURATION);
    };

    onMousewheel = function(e) {
      var deltaY = e.deltaY;

      if(!isMobile()) {
        if(isCoverVisible) {
          if(deltaY > 1) {
            // 上に戻ったとき
            $html.addClass('is-pagetop-shown');
          } else if(deltaY < -1) {
            // 下に進んだとき
            $html.removeClass('is-pagetop-shown');
          }
        }  
      }
    };

    var onScroll = function() {
      var currentOffsetTop = $window.scrollTop();
      
      if(isCoverVisible) {
        if(currentOffsetTop < offsetTop ) {
          $html.addClass('is-pagetop-shown');
        } else {
          $html.removeClass('is-pagetop-shown');
        }

        offsetTop = currentOffsetTop;
      }
    };

    new Waypoint({
      element: document.body,
      handler: function(direction) {
        if(direction === 'down') {
          isCoverVisible = true;
        } else {
          isCoverVisible = false;
          $html.removeClass('is-pagetop-shown');
        }
      },
      offset: -$window.height() / 3
    });

    $pagetop.on('click', onClick);

    // $window.on('mousewheel', onMousewheel);
    if(!isMobile()) {
      $window.on('mousewheel', onMousewheel);
    } else {
      $window.on('scroll', _.throttle(onScroll, 500));
    }
  }
});