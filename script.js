// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        // بستن همه
        document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
            openItem.classList.remove('open');
            const openBtn = openItem.querySelector('.faq-question');
            if(openBtn) openBtn.setAttribute('aria-expanded', 'false');
        });
        // باز یا بسته کردن فعلی
        if(!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        } else {
            item.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
});

// افکت اسکرول برای هدر
window.addEventListener('scroll', function() {
  const header = document.querySelector('.main-header');
  if (!header) return;
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// مدیریت ساید منو موبایل و مخفی کردن همبرگری هنگام باز بودن ساید
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const closeMenu = document.querySelector('.close-menu');
const overlay = document.querySelector('.side-overlay');

// باز کردن ساید منو
menuToggle && menuToggle.addEventListener('click', () => {
    navbar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    menuToggle.classList.add('hide-menu-toggle');
});
// بستن ساید منو با ضربدر
closeMenu && closeMenu.addEventListener('click', () => {
    navbar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle.classList.remove('hide-menu-toggle');
});
overlay && overlay.addEventListener('click', () => {
    navbar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle.classList.remove('hide-menu-toggle');
});

function handleAdvisorVisibility() {
    const advisor = document.querySelector('.advisor-fixed-box');
    const footer = document.querySelector('.site-footer');
    if (!advisor || !footer) return;
    // فقط در موبایل فعال باشد
    if (window.innerWidth > 600) {
        advisor.classList.remove('advisor-hide');
        return;
    }
    const advisorRect = advisor.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    // اگر پایین advisor به بالای فوتر نزدیک شد (مثلاً فاصله کمتر از 20px)
    if (advisorRect.bottom > footerRect.top - 20) {
        advisor.classList.add('advisor-hide');
    } else {
        advisor.classList.remove('advisor-hide');
    }
}
window.addEventListener('scroll', handleAdvisorVisibility);
window.addEventListener('resize', handleAdvisorVisibility);
document.addEventListener('DOMContentLoaded', handleAdvisorVisibility);

// مدیریت تاخیر بسته شدن ساب‌منو خدمات
(function() {
    var dropdown = document.querySelector('.has-dropdown');
    var submenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
    var timer;
    if(dropdown && submenu) {
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timer);
            submenu.style.display = 'block';
        });
        dropdown.addEventListener('mouseleave', function() {
            timer = setTimeout(function() {
                submenu.style.display = 'none';
            }, 300); // تاخیر ۳۰۰ میلی‌ثانیه
        });
        submenu.addEventListener('mouseenter', function() {
            clearTimeout(timer);
            submenu.style.display = 'block';
        });
        submenu.addEventListener('mouseleave', function() {
            timer = setTimeout(function() {
                submenu.style.display = 'none';
            }, 300);
        });
    }
})();

// بهبود نهایی: کنترل ساب‌منو فقط در موبایل با JS، در دسکتاپ فقط CSS
(function() {
    function isMobile() {
        return window.innerWidth <= 900;
    }
    var dropdown = document.querySelector('.has-dropdown');
    var submenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
    var timer;
    if(dropdown && submenu) {
        // باز و بسته شدن با کلیک یا لمس فقط در موبایل
        dropdown.addEventListener('click', function(e) {
            if(isMobile()) {
                e.preventDefault();
                if(submenu.style.display === 'block') {
                    submenu.style.display = '';
                } else {
                    submenu.style.display = 'block';
                }
            }
        });
        // باز شدن با هاور فقط در موبایل (برای تبلت یا دستگاه لمسی)
        dropdown.addEventListener('mouseenter', function() {
            if(isMobile()) {
                clearTimeout(timer);
                submenu.style.display = 'block';
            }
        });
        dropdown.addEventListener('mouseleave', function() {
            if(isMobile()) {
                timer = setTimeout(function() {
                    submenu.style.display = '';
                }, 300);
            }
        });
        submenu.addEventListener('mouseenter', function() {
            if(isMobile()) {
                clearTimeout(timer);
                submenu.style.display = 'block';
            }
        });
        submenu.addEventListener('mouseleave', function() {
            if(isMobile()) {
                timer = setTimeout(function() {
                    submenu.style.display = '';
                }, 300);
            }
        });
        // بستن ساب‌منو با کلیک بیرون فقط در موبایل
        document.addEventListener('click', function(e) {
            if(isMobile() && !dropdown.contains(e.target)) {
                submenu.style.display = '';
            }
        });
        // ریست وضعیت ساب‌منو هنگام تغییر سایز صفحه
        window.addEventListener('resize', function() {
            if(!isMobile()) {
                submenu.style.display = '';
            }
        });
    }
})();

// Testimonials Slider
(function() {
    var slides = document.querySelectorAll('.testimonials-slide');
    var indicators = document.querySelectorAll('.indicator');
    if (!slides.length || !indicators.length) return;
    var current = 0;
    var autoplayInterval;
    var isHovered = false;
    function showSlide(idx, direction = 'next') {
        slides.forEach(function(slide) {
            slide.classList.remove('active');
        });
        indicators.forEach(function(indicator) {
            indicator.classList.remove('active');
        });
        slides[idx].classList.add('active');
        indicators[idx].classList.add('active');
    }
    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current, 'next');
    }
    function goToSlide(idx) {
        current = idx;
        showSlide(current);
    }
    function startAutoplay() {
        if (!isHovered) {
            autoplayInterval = setInterval(nextSlide, 2500); // 2.5 ثانیه
        }
    }
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    indicators.forEach(function(indicator, idx) {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goToSlide(idx);
            stopAutoplay();
            startAutoplay();
        });
    });
    var slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', function() {
            isHovered = true;
            stopAutoplay();
        });
        slider.addEventListener('mouseleave', function() {
            isHovered = false;
            startAutoplay();
        });
    }
    showSlide(current);
    startAutoplay();
})(); 

// Tabs for Content Tabs Section
(function() {
  var tabBtns = document.querySelectorAll('.content-tabs .tab-btn');
  var tabContents = document.querySelectorAll('.content-tabs-info .tab-content');
  var tabImages = document.querySelectorAll('.content-tabs-image .tab-image');
  if (!tabBtns.length || !tabContents.length) return;
  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // حذف اکتیو از همه تب‌ها و محتواها و عکس‌ها
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabContents.forEach(function(tc) { tc.classList.remove('active'); });
      tabImages.forEach(function(img) { img.classList.remove('active'); });
      // اکتیو کردن تب و محتوای انتخابی و عکس مربوطه
      btn.classList.add('active');
      var tabId = btn.getAttribute('data-tab');
      var content = document.getElementById('tab-' + tabId);
      var image = document.getElementById('img-' + tabId);
      if(content) content.classList.add('active');
      if(image) image.classList.add('active');
    });
  });
})(); 