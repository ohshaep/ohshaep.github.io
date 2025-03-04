gsap.registerPlugin(ScrollTrigger); // 注册插件
new WOW().init(); // wow初始化
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
  const getRealHeight = (element) => {
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.display === 'none') {
      element.style.display = 'block'; // 临时显示
      let height = element.offsetHeight;
      element.style.display = ''; // 还原显示状态
      return height;
    }
    return element.offsetHeight;
  };
  domlist.forEach((item) => {
    item.style.height = 'auto'; // 先重置高度
    temp_height = Math.max(temp_height, getRealHeight(item));
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
const video_pop_btn = document.querySelectorAll('.video-pop-btn');
const com_video = document.querySelector('.com-pop-video');
if (video_pop_btn.length > 0 && com_video) {
  const video_btn = com_video.querySelector('.close-pop-btn');
  const type_box = com_video.querySelector('.com-pop-video-box');
  const video_clone = com_video.querySelector('.media-type').cloneNode(true);
  video_pop_btn.forEach((item) => {
    item.addEventListener('click', () => {
      com_video.classList.add('active');
      if (item.getAttribute('img-data')) {
        const temp_img = document.createElement('img');
        temp_img.classList.add('media-type');
        temp_img.src = item.getAttribute('img-data');
        type_box.replaceChild(temp_img, com_video.querySelector('.com-pop-video-box .media-type'));
      } else {
        type_box.replaceChild(video_clone, com_video.querySelector('.com-pop-video-box .media-type'));
        type_box.querySelector('video').src = item.getAttribute('video-data') || '';
      }
    });
  });
  video_btn.addEventListener('click', () => {
    com_video.classList.remove('active');
  });
  com_video.addEventListener('click', (e) => {
    if (e.target.classList.contains('com-pop-video')) {
      com_video.classList.remove('active');
    }
  });
}
// 导航栏控制
setTimeout(() => {
  if (document.querySelector('.index') && window.innerWidth > 768) {
    const nav = document.querySelector('#header_pc');
    let start_time = 0;
    let end_time = 0;
    let temp_time = null;
    if (window.innerWidth > 768 && nav) {
      // nav.addEventListener('mouseenter', () => {
      //   nav.classList.remove('active');
      // });
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
  } else {
    const nav = document.querySelector('#header_pc');
    nav.classList.add('active');
  }
}, 1000);

// h5导航按钮
setTimeout(() => {
  const h5_nav_btn = document.querySelector('.header-center-content-icon');
  const h5_nav_panel = document.querySelector('.header-center-content-status');
  if (h5_nav_btn) {
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
  document.querySelector('body').addEventListener('click', () => {
    if (event.target.classList.contains('header-center-content-status')) {
      h5_nav_panel.classList.toggle('active');
      h5_nav_btn.classList.toggle('active');
    }
  });
}, 1000);

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
// 全局视频点击播放
document.querySelectorAll('video').forEach((video) => {
  // if (window.innerWidth < 768) {
  //   video.addEventListener('touch', () => {
  //     video.paused ? video.play() : video.pause();
  //   });
  // }
  if (video.className.includes('bg-vieo')) {
  } else {
    if (window.innerWidth < 768) {
      video.addEventListener('tap', (e) => {
        e.preventDefault();
        video.paused ? video.play() : video.pause();
      });
    } else {
      // video.addEventListener('click', (e) => {
      //   e.preventDefault();
      //   video.paused ? video.play() : video.pause();
      // });
    }
  }
});

// index-s3

window.onload = function () {
  togHeight(document.querySelectorAll('.index-s3-subtitle'));
  window.onresize = function () {
    togHeight(document.querySelectorAll('.index-s3-subtitle'));
  };
};

const index_s3_swiper = new Swiper('.index-s3-swiper', {
  slidesPerView: 1.3,
  spaceBetween: 20,
  // freeMode: true,
  // loop: true,
  speed: 1500,
  navigation: {
    nextEl: '.index-s3-container .tools-next',
    prevEl: '.index-s3-container .tools-prev'
  },
  // autoplay: {
  //   delay: 3000
  // },
  breakpoints: {
    1400: {
      slidesPerView: 3.8,
      spaceBetween: '1%'
      // autoplay: {
      //   delay: 0
      // }
    },
    1366: {
      slidesPerView: 3.3,
      spaceBetween: '1%'
      // autoplay: {
      //   delay: 0
      // }
    },
    1000: {
      slidesPerView: 2.8,
      spaceBetween: '1%'
      // autoplay: {
      //   delay: 0
      // }
    }
  }
});

// // 存放鼠标悬浮时的transform属性（行内属性）
// let nextTransForm = '';
// // 轮播图从暂停位置移动到原本应到的位置所用的时间
// let nextTime = 0;

// // 鼠标悬浮暂停轮播
// index_s3_swiper.el.onmouseenter = function () {
//   nextTransForm = document.getElementsByClassName('index-s3-swiper')[0].getElementsByClassName('swiper-wrapper')[0]
//     .style.transform;
//   // 轮播图原本应移动到的位置
//   let nextTransPosition =
//     -1 *
//     parseInt(
//       document
//         .getElementsByClassName('index-s3-swiper')[0]
//         .getElementsByClassName('swiper-wrapper')[0]
//         .style.transform.split('translate3d(')[1]
//         .split('px')[0]
//     );

//   // 鼠标悬浮时时轮播图位置
//   let nowTransPosition =
//     -1 *
//     parseInt(
//       window
//         .getComputedStyle(
//           document.getElementsByClassName('index-s3-swiper')[0].getElementsByClassName('swiper-wrapper')[0],
//           false
//         )
//         ['transform'].split('1, ')[2]
//         .split(',')[0]
//     );
//   // 存放鼠标悬浮时轮播图的真实transform属性（非行内属性）
//   let nowTransForm = window.getComputedStyle(
//     document.getElementsByClassName('index-s3-swiper')[0].getElementsByClassName('swiper-wrapper')[0],
//     false
//   )['transform'];
//   // 计算轮播图从暂停位置移动到原本应到的位置所用的时间（370是我自定义的每个slide的宽度）
//   nextTime = 5500 * ((nextTransPosition - nowTransPosition) / 370);
//   // 改变行内transform属性
//   document.getElementsByClassName('index-s3-swiper')[0].getElementsByClassName('swiper-wrapper')[0].style.transform =
//     nowTransForm;
//   // 不写也没关系
//   document
//     .getElementsByClassName('index-s3-swiper')[0]
//     .getElementsByClassName('swiper-wrapper')[0].style.transitionDuration = '0ms';
//   index_s3_swiper.autoplay.stop();
// };
// // 鼠标离开轮播图开始轮播
// index_s3_swiper.el.onmouseleave = function () {
//   // 恢复原样
//   document.getElementsByClassName('index-s3-swiper')[0].getElementsByClassName('swiper-wrapper')[0].style.transform =
//     nextTransForm;
//   document
//     .getElementsByClassName('index-s3-swiper')[0]
//     .getElementsByClassName('swiper-wrapper')[0].style.transitionDuration = nextTime + 'ms';
//   index_s3_swiper.autoplay.start();
// };

// hire-s2-swiper
new Swiper('.hire-s2-swiper', {
  slidesPerView: 2,
  spaceBetween: 10,
  speed: 5000,
  grid: {
    fill: 'row',
    rows: 2
  },

  breakpoints: {
    768: {
      autoplay: false,
      slidesPerView: 4,
      spaceBetween: '1%',
      grid: {
        fill: 'row',
        rows: 1
      }
    }
  }
});

// hire-s3-swiper
const hire_s3_swiper = new Swiper('.hire-s3-swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  speed: 3000,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false
  },
  breakpoints: {
    768: {
      slidesPerView: 2.2,
      spaceBetween: '2%',
      centeredSlides: true,
      centeredSlidesBounds: true
    }
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});
const prev = document.querySelector('.hire-s3-content .tools-prev');
const next = document.querySelector('.hire-s3-content .tools-next');
if (prev) {
  next.addEventListener('click', () => {
    hire_s3_swiper.slideNext();
  });
  prev.addEventListener('click', () => {
    hire_s3_swiper.slidePrev();
  });
}

// product-s2-left-item

const parentElement = document.querySelector('.product-s2');
if (parentElement) {
  const product_s2_left_item = document.querySelectorAll('.product-s2-left-item');
  const product_s2_content = document.querySelector('.product-s2-content');
  const product_s2_right_item = document.querySelectorAll('.product-s2-right-item');
  const product_s2_title = document.querySelector('.product-s2-title');
  // 获取两者的位置信息
  const parentRect = parentElement.getBoundingClientRect();
  const childRect = product_s2_content.getBoundingClientRect();
  // 计算相对高度差
  const distance = childRect.top - parentRect.top; // 获取两者之间的距离
  product_s2_title.style.top = product_s2_title.getBoundingClientRect().top - parentRect.top;

  let tempheight = product_s2_content.offsetHeight;
  if (window.innerWidth > 768) {
    product_s2_left_item.forEach((item, index) => {
      let temp_height = item.offsetHeight;
      let temp_top = distance + index * 20 + 'px';
      item.style.top = temp_top;
      let temp_opacity = 0.3 + 0.7 * ((index + 1) / product_s2_left_item.length);
      let temp_num = 0.3 * ((index + 1) / product_s2_left_item.length);
      let tempscale = 0.7 + temp_num;
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: `top ${distance}`,
          end: () => `+=${item.offsetHeight}}`,
          scrub: true,
          onUpdate: (self) => {
            product_s2_right_item[index].classList.add('active');
            if (self.progress === 1 || self.progress === 0) {
              product_s2_right_item[index].classList.remove('active');
            }
            if (index == 2 && self.progress > 0) {
              product_s2_title.classList.add('active');
              product_s2_title.style.transform = `translateY(${tempheight - temp_height}px)`;
            } else {
              product_s2_title.classList.remove('active');
              product_s2_title.style.transform = `none`;
            }
          }
        },
        duration: 1,
        ease: 'none',
        scale: tempscale,
        transformOrigin: 'top center',
        opacity: temp_opacity
      });
    });
    let place_height = 10;
    product_s2_right_item.forEach((item, index) => {
      if (index > 0) {
        place_height += product_s2_left_item[index - 1].offsetHeight;
      }
      let temp_height = place_height;
      item.addEventListener('click', () => {
        window.scroll({
          top: product_s2_content.offsetTop - distance + temp_height, // 减去导航栏高度
          behavior: 'smooth'
        });
      });
    });
  }

  if (window.innerWidth < 768) {
    addActive(product_s2_right_item, 'click', product_s2_left_item);
  }
}

const form_btn = document.querySelector('.form-btn');
if (form_btn) {
  form_btn.addEventListener('click', (event) => {
    event.preventDefault();
  });
}

const product_s1_list = document.querySelectorAll('.product-s1-left-item-text');
if (product_s1_list.length) {
  const a = product_s1_list[0].querySelectorAll('div');
  const b = product_s1_list[1].querySelectorAll('div');
  const c = product_s1_list[2].querySelectorAll('div');
  a.forEach((item, index) => {
    let to_height = [item, b[index], c[index]];
    togHeight(to_height);
    if (window.innerWidth > 768 && !document.querySelector('.en')) {
      const max_height = Math.max(item.offsetHeight, b[index].offsetHeight, c[index].offsetHeight);
      item.style.lineHeight = `${max_height}px`;
    }
  });
}

new Swiper('.banner-swiper', {
  slidesPerView: 1,
  speed: 2000,
  loop: true,
  autoplay: {
    delay: 4000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.banner-swiper .swiper-button-prev',
    prevEl: '.banner-swiper .swiper-button-next'
  }
});

// hire-s6
if (window.innerWidth < 768) {
  const hire_s6_swiper = new Swiper('.hire-s6-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 1000
  });
  btnSwiper(document.querySelectorAll('.hire-s6-content.first .hire-s6-list-title'), hire_s6_swiper);
}

// hire
new Swiper('.hire-s1-swiper', {
  slidesPerView: 1
});
