document.addEventListener('DOMContentLoaded', () => {
  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // crosshair reticle follows cursor (desktop only, respects reduced motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    const reticle = document.createElement('div');
    reticle.className = 'reticle';
    document.body.appendChild(reticle);
    window.addEventListener('mousemove', (e) => {
      reticle.classList.add('on');
      reticle.style.left = e.clientX + 'px';
      reticle.style.top = e.clientY + 'px';
    });
    window.addEventListener('mouseleave', () => reticle.classList.remove('on'));
  }

  // animate stat bars into view
  const bars = document.querySelectorAll('.stat-bar span');
  if (bars.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.transform = 'scaleX(' + (el.dataset.fill || 1) + ')';
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => {
      b.style.transform = 'scaleX(0)';
      b.style.transition = 'transform 0.8s cubic-bezier(.2,.8,.2,1)';
      obs.observe(b);
    });
  }
});
