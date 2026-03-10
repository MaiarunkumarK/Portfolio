/* ═══════════════════════════════════════════
   MAIARUNKUMAR K — PORTFOLIO JAVASCRIPT
═══════════════════════════════════════════ */

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── DARK/LIGHT TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');

const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
  <button class="mobile-close" id="mobileClose"><i class="fas fa-times"></i></button>
  <a href="#about" class="mob-link">About</a>
  <a href="#skills" class="mob-link">Skills</a>
  <a href="#projects" class="mob-link">Projects</a>
  <a href="#experience" class="mob-link">Experience</a>
  <a href="#contact" class="mob-link">Contact</a>
`;
document.body.appendChild(mobileMenu);

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
document.getElementById('mobileClose').addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── SCROLL TO TOP ──
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── REVEAL ANIMATIONS ──
// Hero reveals on load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 100);
});

// Scroll reveals with IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// ── SKILL BAR ANIMATION ──
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-width');
        bar.style.width = target + '%';
        bar.classList.add('animated');
      });
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) barObserver.observe(skillsSection);

// ── ACTIVE NAV LINK ──
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1800);
  });
}

// ── SMOOTH CURSOR TRAIL (subtle) ──
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 8px;
  height: 8px;
  background: rgba(110,231,183,0.6);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  mix-blend-mode: screen;
`;
document.body.appendChild(cursor);

let cx = -100, cy = -100;
document.addEventListener('mousemove', (e) => {
  cx = e.clientX;
  cy = e.clientY;
  cursor.style.left = cx - 4 + 'px';
  cursor.style.top  = cy - 4 + 'px';
});

document.querySelectorAll('a, button, .project-card, .tech-pill').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(3)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

// ── TYPING ANIMATION IN HERO ──
const roles = ['Full Stack Developer', 'Web Developer', 'Django Developer', 'React Developer', 'Problem Solver'];
const roleEl = document.querySelector('.hero-role');

if (roleEl) {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeRole() {
    const current = roles[roleIndex];
    const prefix = '<span class="role-prefix">—</span> ';

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    roleEl.innerHTML = prefix + current.substring(0, charIndex);

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 300;
    }

    setTimeout(typeRole, speed);
  }

  setTimeout(typeRole, 1500);
}

// ── PARTICLE BACKGROUND (subtle) ──
const canvas = document.createElement('canvas');
canvas.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
`;
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.4 + 0.1,
  };
}

for (let i = 0; i < 60; i++) particles.push(createParticle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const color = isDark ? '110,231,183' : '5,150,105';

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
    ctx.fill();
  });

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(${color}, ${0.06 * (1 - dist/120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target % 1 !== 0 ? target.toFixed(2) : target;
      clearInterval(timer);
    } else {
      el.textContent = target % 1 !== 0 ? start.toFixed(2) : Math.floor(start);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    const nums = document.querySelectorAll('.stat-num');
    const targets = [2, 3, 8.98];
    nums.forEach((num, i) => animateCounter(num, targets[i]));
    statsObserver.disconnect();
  }
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
