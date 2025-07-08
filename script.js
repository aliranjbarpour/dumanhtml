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
// بستن ساید منو با کلیک روی overlay
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