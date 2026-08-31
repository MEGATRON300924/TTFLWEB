// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Gallery filter + lightbox (only present on gallery.html)
  var filterChips = document.querySelectorAll('.filter-chip');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      filterChips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
      var category = chip.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        var match = category === 'all' || item.getAttribute('data-category') === category;
        item.style.display = match ? '' : 'none';
      });
    });
  });

  var lightbox = document.getElementById('lightbox');
  var lightboxBody = document.getElementById('lightbox-body');
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      if (!lightbox || !lightboxBody) return;
      var title = item.getAttribute('data-title') || '';
      var desc = item.getAttribute('data-desc') || '';
      lightboxBody.innerHTML = '<h3>' + title + '</h3><p>' + desc + '</p>';
      lightbox.classList.add('open');
    });
  });
  var closeBtn = document.querySelector('.lightbox-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }
});
