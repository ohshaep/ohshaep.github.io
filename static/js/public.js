gsap.registerPlugin(ScrollTrigger); // 注册插件
// 常用方法
/** 
@function: addActive 给一组dom元素添加active类
@description: 监听点击事件，给一组dom元素添加删除active类,
@param: domlist 一组dom元素，eventname 事件名称默认为click
*/
function addActive(domlist, eventname = 'click', other_domlist = null) {
  if (domlist.length > 0) {
    if (other_domlist) {
      domlist.forEach((item, index) => {
        item.addEventListener(eventname, function () {
          domlist.forEach((item, index) => {
            swiper_wpx;
            item.classList.remove('active');
            other_domlist[index].classList.remove('active');
          });
          this.classList.add('active');
          other_domlist[index].classList.add('active');
        });
      });
    } else {
      domlist.forEach((item, index) => {
        item.addEventListener(eventname, function () {
          domlist.forEach((item, index) => {
            item.classList.remove('active');
          });
          this.classList.add('active');
        });
      });
    }
  }
}
/**
 @param: domlist 一组dom元素
 @description: 得到元素的最高高度：再赋值给每个元素；
*/
function togHeight(domlist) {
  let temp_height = 0;
  domlist.forEach((item) => {
    if (temp_height < item.offsetHeight) {
      temp_height = item.offsetHeight;
    }
  });
  domlist.forEach((item) => {
    item.style.height = temp_height + 'px';
  });
}
//form下拉
setTimeout(() => {
  const form_select = document.querySelectorAll('.footer-form-phone');
  if (form_select.length) {
    form_select.forEach((item) => {
      let phone = item.querySelector('.footer-form-phone-select');
      item.addEventListener('click', function () {
        this.classList.toggle('active');
      });
      item.addEventListener('blur', function () {
        this.classList.remove('active');
      });
      item.querySelectorAll('.footer-form-phone-select-lsit').forEach((item) => {
        item.addEventListener('click', function (e) {
          phone.innerText = e.target.innerText;
        });
      });
    });
  }
}, 1000);

// 视频弹窗com-pop-video
// const video_pop_btn = document.querySelectorAll('.video-pop-btn');
// const com_video = document.querySelector('.com-pop-video');
// if (video_pop_btn.length > 0 && com_video) {
//   const video_btn = com_video.querySelector('.close-pop-btn');
//   const type_box = com_video.querySelector('.com-pop-video-box');
//   const video_clone = com_video.querySelector('.media-type').cloneNode(true);
//   video_pop_btn.forEach((item) => {
//     item.addEventListener('click', () => {
//       com_video.classList.add('active');
//       if (item.getAttribute('img-data')) {
//         const temp_img = document.createElement('img');
//         temp_img.classList.add('media-type');
//         temp_img.src = item.getAttribute('img-data');
//         type_box.replaceChild(temp_img, com_video.querySelector('.com-pop-video-box .media-type'));
//       } else {
//         type_box.replaceChild(video_clone, com_video.querySelector('.com-pop-video-box .media-type'));
//         type_box.querySelector('video').src = item.getAttribute('video-data') || '';
//       }
//     });
//   });
//   video_btn.addEventListener('click', () => {
//     com_video.classList.remove('active');
//   });
//   com_video.addEventListener('click', (e) => {
//     if (e.target.classList.contains('com-pop-video')) {
//       com_video.classList.remove('active');
//     }
//   });
// }
// 导航栏控制
window.addEventListener('load', () => {
  const nav = document.querySelector('#header_pc');
  let start_time = 0;
  let end_time = 0;
  let temp_time = null;

  if (window.innerWidth > 768 && nav) {
    nav.addEventListener('mouseenter', () => {
      nav.classList.remove('active');
    });
    if (nav.classList.contains('light')) {
      window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
          nav.classList.add('light');
          nav.classList.remove('active');
          clearTimeout(temp_time); //清除定时器
          return;
        }
        nav.classList.remove('light');
        start_time = new Date().getTime();
        if ((start_time - end_time) / 1000 > 3) {
          nav.classList.remove('active');
          clearTimeout(temp_time);
          temp_time = setTimeout(() => {
            nav.classList.add('active');
            end_time = new Date().getTime();
          }, 1000);
        }
      });
    } else {
      window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
          nav.classList.remove('active');
          return;
        }
        nav.classList.add('active');
      });
    }
  }
});

// h5导航按钮
setTimeout(() => {
  const h5_nav_btn = document.querySelector('.header-center-content-icon');

  if (h5_nav_btn) {
    const h5_nav_panel = document.querySelector('.header-center-content-status');
    h5_nav_btn.addEventListener('click', () => {
      h5_nav_btn.classList.toggle('active');
      h5_nav_panel.classList.toggle('active');
    });
  }
  const h5_nav_list = document.querySelectorAll('.header-center .nav li');
  h5_nav_list.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
}, 1200);

//轮播绑定方法
/**
 * @作用 使一串dom元素绑定到swiper上
 * @param {*} domlist dom元素列表 type：Array （伪数组）
 * @param {*} swiper  swiper实例 type：Swiper
 */
function btnSwiper(domlist, swiper, double = false) {
  if (domlist.lenght < 1) return;
  if (double) {
    swiper.on('slideChange', function () {
      domlist.forEach((item, index) => {
        item.forEach((item2, index2) => {
          item2.classList.remove('active');
        });
        domlist[index][this.activeIndex].classList.add('active');
      });
    });
    domlist.forEach((item, index) => {
      item.forEach((item2, index2) => {
        item2.addEventListener('click', function () {
          swiper.slideTo(index2);
        });
      });
    });
  } else {
    swiper.on('slideChange', function () {
      domlist.forEach((item, index) => {
        item.classList.remove('active');
      });
      domlist[this.activeIndex].classList.add('active');
    });
    domlist.forEach((item, index) => {
      item.addEventListener('click', function () {
        swiper.slideTo(index);
      });
    });
  }
}
// 全局锚点控制
const anchor_list = document.querySelectorAll('a[href^="#"]');
if (anchor_list.length) {
  anchor_list.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      window.scroll({
        top: targetElement.offsetTop - 100, // 减去导航栏高度
        behavior: 'smooth'
      });
    });
  });
}

// index-s8
new Swiper('.index-s8-swiper', {
  slidesPerView: 3, //一行显示8个
  loop: true,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  breakpoints: {
    768: {
      slidesPerView: 8,
      spaceBetween: 20
    }
  }
});
// index-s6
const index_s6_thumbs = new Swiper('.index-s6-swiper-thumbs', {
  slidesPerView: 4,
  spaceBetween: 10,
  speed: 3000,
  normalizeSlideIndex: false,
  breakpoints: {
    768: {
      slidesPerView: 4,
      spaceBetween: 14
    }
  }
});
const index_s6_swiper = new Swiper('.index-s6-swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 3000,
  thumbs: {
    swiper: index_s6_thumbs
  },
  navigation: {
    nextEl: '.index-s6-swiper .swiper-button-next',
    prevEl: '.index-s6-swiper .swiper-button-prev'
  }
});
// index-s6-end

// product-list-fm14.html s2
const product_s2_thumbs = new Swiper('.product-s2-swiper_thumbs', {
  slidesPerView: 4,
  spaceBetween: 14,
  speed: 3000,
  normalizeSlideIndex: false
});
const product_s2_swiper = new Swiper('.product-s2-swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 3000,
  thumbs: {
    swiper: product_s2_thumbs
  },
  navigation: {
    nextEl: '.product-s2-swiper .swiper-button-next',
    prevEl: '.product-s2-swiper .swiper-button-prev'
  }
});
// product-list-fm14.html s2-end

// product

const product_s1_item = document.querySelectorAll('.product-s1-right-bottom-item');
if (product_s1_item.length) {
  if (window.innerWidth > 768) {
    addActive(product_s1_item, 'mouseenter');
    product_s1_item.forEach((item, index) => {
      item.addEventListener('mouseleave', function () {
        item.classList.remove('active');
      });
    });
  } else {
    product_s1_item.forEach((item, index) => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        if (item.classList.contains('active')) {
          window.location.href = item.href || item.querySelector('a').href;
        } else {
          product_s1_item.forEach((item2, index2) => {
            item2.classList.remove('active');
          });
          item.classList.add('active');
        }
      });
    });
  }
}

// 手机端收缩
if (document.querySelectorAll('.product-s1-content-tag-item').length) {
  if (window.innerWidth < 768) {
    const product_tag = document.querySelector('.product-s1-tag-kind');
    product_tag.querySelector('.product-s1-content-tag-title').addEventListener('click', function () {
      product_tag.classList.toggle('active');
    });
  }
  document.querySelectorAll('.product-s1-content-tag-item').forEach((item, index) => {
    item.addEventListener('click', function () {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        return;
      }
      document.querySelectorAll('.product-s1-content-tag-item').forEach((item2, index2) => {
        item2.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
}
// 手机端收缩 end

// down下拉

// if (layui) {
try {
  layui.use(function () {
    var form = layui.form;
    var layer = layui.layer;
    // select 事件
    form.on('select(demo-select-filter)', function (data) {
      var elem = data.elem; // 获得 select 原始 DOM 对象
      var value = data.value; // 获得被选中的值
      var othis = data.othis; // 获得 select 元素被替换后的 jQuery 对象

      layer.msg(this.innerHTML + ' 的 value: ' + value); // this 为当前选中 <option> 元素对象
    });
  });
} catch (e) {
  console.log(e);
}

// }
// down下拉 end

// 弹窗com-pop

const com_video = document.querySelector('.com-pop-video');
const video_box = document.querySelector('.com-pop-video-box');
if (com_video) {
  var video_clone = video_box.querySelector('.pop-video').cloneNode(true);
  var img_clone = video_box.querySelector('.pop-img').cloneNode(true);
  var com_pop_content = video_box.querySelector('.com-pop-content');
  com_pop_content.innerHTML = '';

  const video_pop_btn = document.querySelectorAll('.video-pop-btn');
  const img_pop_btn = document.querySelectorAll('.img-pop-btn');
  console.log(img_clone, 1111);

  video_pop_btn.forEach((item) => {
    item.addEventListener('click', () => {
      com_video.classList.add('active');
      if (item.getAttribute('video-data')) {
        com_pop_content.innerHTML = '';
        video_clone.src = item.getAttribute('video-data');
        com_pop_content.appendChild(video_clone);
      }
    });
  });

  img_pop_btn.forEach((item) => {
    item.addEventListener('click', () => {
      com_video.classList.add('active');
      if (item.getAttribute('img-data')) {
        com_pop_content.innerHTML = '';
        img_clone.src = item.getAttribute('img-data');
        console.log(img_clone, 1111);

        com_pop_content.appendChild(img_clone);
      }
    });
  });

  const video_btn = com_video.querySelector('.close-pop-btn');
  video_btn.addEventListener('click', () => {
    com_video.classList.remove('active');
  });
  com_video.addEventListener('click', (e) => {
    if (e.target.classList.contains('com-pop-video')) {
      com_video.classList.remove('active');
    }
  });
}
// 弹窗com-pop

// index 荣誉资质

if (window.innerWidth < 768) {
  new Swiper('.swiper-index', {
    // autoplay: true ,
    slidesPerView: 1,
    pagination: {
      el: '.index-s7 .swiper-pagination',
      clickable: true
    }
  });
}
if (window.innerWidth < 768) {
  new Swiper('.swiper-index-2', {
    speed: 3000,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true
    }, //可选选项，自动滑动
    slidesPerView: 1,
    // spaceBetween: 10,
    pagination: {
      el: '.index-s2 .swiper-pagination',
      clickable: true // 分页器可点击
    }
    //     鼠标进入时暂停自动轮播
    // swiper.el.addEventListener('mouseenter', () => {
    //   swiper.autoplay.stop();}
    //  鼠标离开时恢复自动轮播
    // swiper.el.addEventListener('mouseleave', () => {
    //   swiper.autoplay.start();}
  });
}
if (window.innerWidth < 768) {
  new Swiper('.swiper-index-1', {
    autoplay: true, //可选选项，自动滑动
    slidesPerView: 1,
    pagination: {
      el: '.index-s5 .swiper-pagination',
      clickable: true // 分页器可点击
    }
  });

  new Swiper('.why-choose-s3  .swiper-index-4', {
    autoplay: true, //可选选项，自动滑动
    slidesPerView: 1,
    pagination: {
      el: '.why-choose-s3 .swiper-pagination',
      clickable: true // 分页器可点击
    }
  });

  new Swiper('.why-choose-s6  .swiper-index-5', {
    autoplay: true, //可选选项，自动滑动
    slidesPerView: 1,
    pagination: {
      el: '.why-choose-s6 .swiper-pagination',
      clickable: true // 分页器可点击
    }
  });
}



if (window.innerWidth < 768) {
  new Swiper('.swiper-index-5', {
    // autoplay: true ,//可选选项，自动滑动
    slidesPerView: 1,
    spaceBetween: 20 // 幻灯片之间的间隔
  });
}

// index 荣誉资质 end

// about-us页面轮播
var mySwiper = new Swiper('.swiper_wpx', {
  slidesPerView: 1, // 显示1.25个幻灯片
  centeredSlides: true, // 确保选中的幻灯片在中间显示
  spaceBetween: 20, // 幻灯片之间的间隔
  loop: true, // 开启循环播放
  // autoplay: true,

  speed: 3000,
  breakpoints: {
    768: {
      slidesPerView: 1.5
    }
  },
  pagination: {
    el: '.eve .swiper-pagination',
    clickable: true // 分页器可点击
  },
  navigation: {
    nextEl: '.left-right',
    prevEl: '.left-two'
  }
});
new Swiper('.new-product-swiper', {
  slidesPerView: 3,
  loop: true,
  spaceBetween: 20,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  breakpoints: {
    768: {
      slidesPerView: 5
    }
  }
});
// about-us页面轮播

// about-us our culture轮播
var mySwiper = new Swiper('swiper_wpx_w', {
  pagination: {
    el: '.swiper-pagination'
  }
});
var mySwiper = new Swiper('.swiper_wpx_w', {
  slidesPerView: 1, // 显示1.25个幻灯片
  centeredSlides: true, // 确保选中的幻灯片在中间显示
  spaceBetween: 20, // 幻灯片之间的间隔
  loop: true, // 开启循环播放
  // autoplay: true,

  speed: 3000,
  breakpoints: {
    768: {
      slidesPerView: 1.5
    }
  },
  pagination: {
    el: '.eve .swiper-pagination',
    clickable: true // 分页器可点击
  },
  navigation: {
    nextEl: '.left-right',
    prevEl: '.left-two'
  }
});
// about-us  our culture轮播

//询盘弹窗
setTimeout(() => {
  $(function () {
    if ($(window).width() < 1136) {
      $('.yzqh').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
        } else {
          $(this).addClass('on').siblings().removeClass('on');
        }
      });
    }

    $('.start-project').click(function () {
      $('.shadow').show();
      $('.popupBox').show();
      $('body,html').css({
        overflow: 'hidden'
      });
    });
    $('.get-started').click(function () {
      $('.shadow').show();
      $('.popupBox').show();
      $('body,html').css({
        overflow: 'hidden'
      });
    });

    $('.tyanniu .learn-more').click(function () {
      $('.shadow').show();
      $('.popupBox').show();
      $('body,html').css({
        overflow: 'hidden'
      });
    });
  });

  $(function () {
    $('.searchbox .search').click(function () {
      if ($('.searchbox').hasClass('on')) {
        $('.searchbox').removeClass('on');
      } else {
        $('.searchbox').addClass('on');
        $('.nav-item').removeClass('on');
      }
    });
  });

  $(function () {
    $('.pop').click(function () {
      $('.popupBox').addClass('on');
    });

    $('.close').click(function () {
      $('.popupBox').removeClass('on');
    });

    $('.to_top').click(function () {
      $('html,body').animate(
        {
          scrollTop: 0
        },
        980
      );
    });
  });
}, 1000);

// 空白处点击关闭弹窗

window.addEventListener('load', function () {
  document.querySelector('.popupBox').addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('on');
    }
  });
});
// 空白处点击关闭弹窗-end

// 询盘弹窗

// support轮播
if (window.innerWidth < 768) {
  new Swiper('.swiper-support', {
    autoplay: true, //可选选项，自动滑动
    slidesPerView: 1
  });
}
// support轮播

// faq多个点击下拉收缩
const temp_list = document.querySelectorAll('.faq-s2-content-tit');
if (temp_list.length && window.innerWidth < 768) {
  temp_list.forEach((item, index) => {
    item.querySelector('.faq-s2-content-tit-s.h5').addEventListener('click', function () {
      item.classList.toggle('active');
    });
  });
}
// faq多个点击下拉收缩
// 防止多指触屏缩放
document.addEventListener(
  'touchstart',
  function (e) {
    if (e.touches.length > 1) {
      e.preventDefault(); // 阻止缩放
    }
  },
  { passive: false }
);

// 手势开始时禁止捏放缩放
document.addEventListener(
  'gesturestart',
  function (e) {
    e.preventDefault(); // 阻止缩放
  },
  { passive: false }
);
