// ===========================
// SERENE RETREAT — CORE JS
// ===========================

// Theme Engine
const ThemeEngine = {
  init() {
    const saved = localStorage.getItem('retreat-theme') || 'dark';
    if (saved === 'bright') this.enable();
    else this.disable(); // Ensure icons match dark default
    this.bindToggle();
  },
  enable() {
    document.body.classList.add('bright-mode');
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.innerHTML = '🌙';
      el.title = 'Switch to Dark Mode';
    });
    localStorage.setItem('retreat-theme', 'bright');
  },
  disable() {
    document.body.classList.remove('bright-mode');
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.innerHTML = '☀️';
      el.title = 'Switch to Bright Mode';
    });
    localStorage.setItem('retreat-theme', 'dark');
  },
  toggle() {
    document.body.classList.contains('bright-mode') ? this.disable() : this.enable();
  },
  bindToggle() {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      // Remove previous listener to avoid duplicates if re-called
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', () => this.toggle());
    });
  }
};

// RTL Engine
const RTLEngine = {
  init() {
    const saved = localStorage.getItem('retreat-dir') || 'ltr';
    if (saved === 'rtl') this.enable();
    this.bindToggle();
  },
  enable() {
    document.documentElement.setAttribute('dir', 'rtl');
    document.querySelectorAll('.dir-label').forEach(el => el.textContent = 'LTR');
    localStorage.setItem('retreat-dir', 'rtl');
  },
  disable() {
    document.documentElement.setAttribute('dir', 'ltr');
    document.querySelectorAll('.dir-label').forEach(el => el.textContent = 'RTL');
    localStorage.setItem('retreat-dir', 'ltr');
  },
  toggle() {
    document.documentElement.getAttribute('dir') === 'rtl' ? this.disable() : this.enable();
  },
  bindToggle() {
    document.querySelectorAll('.dir-toggle').forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', () => this.toggle());
    });
  }
};

// Scroll Animations
const ScrollAnimator = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }
};

// Particle Generator (Hero)
const ParticleEngine = {
  init(containerId, count = 18) {
    const container = document.getElementById(containerId);
    if (!container) return;
    // Clear existing particles if re-called
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${Math.random() * 0.6 + 0.2};
      `;
      container.appendChild(p);
    }
  }
};

// Navbar scroll effect
const NavbarEffect = {
  init() {
    const nav = document.querySelector('.navbar-retreat');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }
};

// Booking Multi-step Wizard
const BookingWizard = {
  currentStep: 1,
  totalSteps: 3,
  init() {
    const panels = document.querySelectorAll('.step-panel');
    if (!panels.length) return;
    this.updateUI();
    document.querySelectorAll('.step-next').forEach(btn => {
      btn.addEventListener('click', () => this.next());
    });
    document.querySelectorAll('.step-prev').forEach(btn => {
      btn.addEventListener('click', () => this.prev());
    });
  },
  next() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateUI();
    }
  },
  prev() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
    }
  },
  updateUI() {
    document.querySelectorAll('.step-panel').forEach((panel, i) => {
      panel.classList.toggle('active', i + 1 === this.currentStep);
    });
    document.querySelectorAll('.step-dot').forEach((dot, i) => {
      dot.classList.remove('active', 'done');
      if (i + 1 === this.currentStep) dot.classList.add('active');
      else if (i + 1 < this.currentStep) dot.classList.add('done');
    });
    document.querySelectorAll('.step-line').forEach((line, i) => {
      line.classList.toggle('active', i + 1 < this.currentStep);
    });
  }
};

// Questionnaire Progress
const QuestionnaireProgress = {
  init() {
    const form = document.getElementById('wellness-form');
    if (!form) return;
    const fill = document.getElementById('progress-fill');
    const label = document.getElementById('progress-label');
    const fields = form.querySelectorAll('input, select, textarea');

    const update = () => {
      let filled = 0;
      fields.forEach(f => {
        if (f.type === 'radio' || f.type === 'checkbox') {
          const group = form.querySelectorAll(`[name="${f.name}"]:checked`);
          if (group.length > 0) filled++;
        } else if (f.value.trim()) filled++;
      });
      const names = new Set();
      fields.forEach(f => {
        if (f.type === 'radio' || f.type === 'checkbox') names.add(f.name);
      });
      const total = fields.length - [...form.querySelectorAll('[type=radio],[type=checkbox]')].length + names.size;
      const pct = Math.round((filled / total) * 100);
      if (fill) fill.style.width = pct + '%';
      if (label) label.textContent = pct + '%';
    };

    fields.forEach(f => {
        f.removeEventListener('change', update);
        f.removeEventListener('input', update);
        f.addEventListener('change', update);
        f.addEventListener('input', update);
    });
  }
};

// Add-ons Cart
const AddonsCart = {
  items: [],
  init() {
    const cartBadge = document.getElementById('cart-badge');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    document.querySelectorAll('.btn-add-addon').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.addon-card');
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);

        if (this.items.find(i => i.id === id)) {
          this.items = this.items.filter(i => i.id !== id);
          card.classList.remove('in-cart');
          btn.textContent = '+ Add to Itinerary';
          btn.classList.remove('btn-success-retreat');
          btn.classList.add('btn-primary-retreat');
        } else {
          this.items.push({ id, name, price });
          card.classList.add('in-cart');
          btn.innerHTML = '✓ Added';
          btn.classList.remove('btn-primary-retreat');
          btn.classList.add('btn-success-retreat');
        }

        const total = this.items.reduce((s, i) => s + i.price, 0);
        if (cartCount) cartCount.textContent = this.items.length;
        if (cartTotal) cartTotal.textContent = '$' + total;
        if (cartBadge) cartBadge.style.display = this.items.length ? 'flex' : 'none';
      });
    });
  }
};

// Package Filter
const PackageFilter = {
  init() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.package-item').forEach(item => {
          if (filter === 'all' || item.dataset.category.includes(filter)) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.4s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
};

// Stat Counter Animation
const StatCounter = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
            this.count(el);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stats-strip').forEach(el => observer.observe(el));
  },
  count(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const inc = target / 60;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + suffix;
    }, 25);
  }
};

// Global init function
window.initAppLogic = () => {
    ThemeEngine.init();
    RTLEngine.init();
    ScrollAnimator.init();
    NavbarEffect.init();
    ParticleEngine.init('hero-particles');
    BookingWizard.init();
    QuestionnaireProgress.init();
    AddonsCart.init();
    PackageFilter.init();
    StatCounter.init();
};

// Init on load
document.addEventListener('DOMContentLoaded', window.initAppLogic);
