// ======= Navbar Search Toggle =======
document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.getElementById('search-icon');
  const searchBox = document.getElementById('search-box');
  const closeSearch = document.getElementById('close-search');

  // Show search box
  searchIcon.addEventListener('click', (event) => {
    event.preventDefault();
    searchBox.style.display = 'block';
    searchBox.querySelector('input').focus();
  });

  // Hide search box when clicking outside
  document.addEventListener('click', (event) => {
    if (!searchBox.contains(event.target) && event.target !== searchIcon) {
      searchBox.style.display = 'none';
    }
  });

  // Hide search box when clicking close button
  if (closeSearch) {
    closeSearch.addEventListener('click', () => {
      searchBox.style.display = 'none';
    });
  }
});

// ======= Hero Slider Logic =======
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.hero-slider-wrapper .dot');
  const prevBtn = document.querySelector('.hero-slider-wrapper .prev');
  const nextBtn = document.querySelector('.hero-slider-wrapper .next');
  let currentSlide = 0;
  let slideTimer;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      showSlide(Number(this.dataset.slide));
      resetTimer();
    });
  });

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

  // Auto-slide logic
  function startTimer() {
    slideTimer = setInterval(nextSlide, 5000);
  }
  function resetTimer() {
    clearInterval(slideTimer);
    startTimer();
  }

  // Initialize
  showSlide(0);
  startTimer();
});

// ======= Category Box Hover Overlay =======
document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.category-box');
  boxes.forEach(box => {
    box.addEventListener('mouseenter', function () {
      this.querySelector('.overlay').style.opacity = 1;
    });
    box.addEventListener('mouseleave', function () {
      this.querySelector('.overlay').style.opacity = 0;
    });
  });
});

// ======= Product Card Button Ripple Effect (Optional) =======
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      if (getComputedStyle(this).position === 'static') {
        this.style.position = 'relative';
      }
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 2;
      `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Ripple animation keyframes injection
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});