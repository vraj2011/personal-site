// ===== THEME TOGGLE =====
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('vraj-theme') || 'dark';

root.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('vraj-theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  themeBtn.style.transform = 'rotate(360deg) scale(1.2)';
  setTimeout(() => themeBtn.style.transform = '', 400);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ===== CURSOR TRAIL =====
const trail = [];
const TRAIL_COUNT = 8;

for (let i = 0; i < TRAIL_COUNT; i++) {
  const dot = document.createElement('div');
  dot.classList.add('cursor-dot');
  dot.style.width = (8 - i) + 'px';
  dot.style.height = (8 - i) + 'px';
  dot.style.opacity = (1 - i / TRAIL_COUNT) * 0.6;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  trail[0].x += (mouseX - trail[0].x) * 0.35;
  trail[0].y += (mouseY - trail[0].y) * 0.35;

  for (let i = 1; i < TRAIL_COUNT; i++) {
    trail[i].x += (trail[i - 1].x - trail[i].x) * 0.5;
    trail[i].y += (trail[i - 1].y - trail[i].y) * 0.5;
  }

  trail.forEach(t => {
    t.el.style.left = t.x + 'px';
    t.el.style.top = t.y + 'px';
  });

  requestAnimationFrame(animateTrail);
}
animateTrail();

// ===== YEAR IN FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== SKILL CARD STAGGER ANIMATION =====
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

// ===== PROJECT CARD HOVER TILT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `translateY(-8px) scale(1.01) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== EASTER EGG: Konami Code =====
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
const flash = document.createElement('div');
flash.classList.add('konami-flash');
document.body.appendChild(flash);

document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konami.length) {
      konamiIdx = 0;
      flash.style.opacity = '0.3';
      setTimeout(() => flash.style.opacity = '0', 300);
      document.querySelector('.hero-name').style.fontFamily = "'Gochi Hand', cursive";
      const msg = document.createElement('div');
      msg.textContent = '🎉 u found the secret! vraj is a legend!';
      msg.style.cssText = `
        position: fixed; bottom: 24px; left: 50%;
        transform: translateX(-50%);
        background: #ff6b35; color: white;
        font-family: 'Gochi Hand', cursive; font-size: 1.2rem;
        padding: 12px 28px; border-radius: 99px;
        z-index: 9999; animation: fadeUp 0.4s ease both;
      `;
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    }
  } else {
    konamiIdx = 0;
  }
});
