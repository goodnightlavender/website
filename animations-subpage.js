/* =========================================================================
   GOODNIGHT LAVENDER — Subpage GSAP Animations
   Dispatches by pathname. Loaded on all pages except landing.
   ========================================================================= */
(function () {
  'use strict';

  if (window.GL_ANIM && window.GL_ANIM.disabled) return;

  var PUNK = window.GL_ANIM.PUNK;
  var glitchIn = window.GL_ANIM.glitchIn;
  var microGlitch = window.GL_ANIM.microGlitch;
  var animateBack = window.GL_ANIM.animateBack;

  // =========================================================================
  //  GALLOWS
  // =========================================================================
  function initGallows() {
    animateBack();

    // Reveal containers — their children are animated individually
    gsap.set('.gallows-logo-wrap', { opacity: 1 });
    gsap.set('.tracklist', { opacity: 1 });

    // Presents text — hard cut
    var presents = document.querySelector('.gallows-presents');
    if (presents) {
      gsap.fromTo(presents,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: PUNK.slam, delay: 0.2 }
      );
    }

    // Album title — glitch in
    var title = document.querySelector('.gallows-title');
    if (title) {
      glitchIn(title, { duration: 0.5, delay: 0.1 });
    }

    // Kanji — glitch in, offset
    var kanji = document.querySelector('.gallows-kanji');
    if (kanji) {
      glitchIn(kanji, { duration: 0.5, delay: 0.35, intensity: 0.7 });
      // Recurring micro-glitch
      gsap.delayedCall(1, function () {
        microGlitch(kanji, { minDelay: 5, maxDelay: 10, strength: 3 });
      });
    }

    // Track rows — ScrollTrigger, slam from left with skew
    var rows = document.querySelectorAll('.track-row');
    if (rows.length && typeof ScrollTrigger !== 'undefined') {
      rows.forEach(function (row) {
        gsap.fromTo(row,
          { opacity: 0, x: -30, skewX: -2 },
          {
            opacity: 1,
            x: 0,
            skewX: 0,
            duration: 0.4,
            ease: PUNK.slam,
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Unreleased tracks: red border flash
        if (row.querySelector('.track-unreleased')) {
          gsap.fromTo(row,
            { borderColor: 'rgba(203, 7, 7, 0.5)' },
            {
              borderColor: 'rgba(203, 7, 7, 0.15)',
              duration: 0.8,
              ease: PUNK.decay,
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });
    }

    // Page CTA
    var cta = document.querySelector('.page-cta');
    if (cta && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(cta,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.4,
          ease: PUNK.slam,
          scrollTrigger: {
            trigger: cta,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // =========================================================================
  //  ABOUT
  // =========================================================================
  function initAbout() {
    animateBack();

    // About content block
    var content = document.querySelector('.about-content');
    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: PUNK.slam, delay: 0.2 }
      );
    }

    // Bio paragraphs — staggered on scroll
    var bios = document.querySelectorAll('.about-bio');
    if (bios.length && typeof ScrollTrigger !== 'undefined') {
      bios.forEach(function (bio) {
        gsap.fromTo(bio,
          { opacity: 0, y: 10 },
          {
            opacity: 1, y: 0,
            duration: 0.4,
            ease: PUNK.slam,
            scrollTrigger: {
              trigger: bio,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }

    // Gallery entrance
    var gallery = document.querySelector('.gallery');
    if (gallery && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(gallery,
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0,
          duration: 0.4,
          ease: PUNK.slam,
          scrollTrigger: {
            trigger: gallery,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // GSAP parallax on gallery images (desktop only)
      if (!GL_ANIM.isMobile) {
        var imgs = gallery.querySelectorAll('.gallery-slide img');
        imgs.forEach(function (img) {
          gsap.to(img, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: gallery,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          });
        });
      }
    }
  }

  // =========================================================================
  //  LIVE
  // =========================================================================
  function initLive() {
    animateBack();

    // Reveal containers
    gsap.set('.tour-hero', { opacity: 1 });

    // Tour title — glitch in
    var title = document.querySelector('.tour-title');
    if (title) {
      glitchIn(title, { duration: 0.5, delay: 0.15 });
    }

    // Widget container — fade in after title
    var widget = document.querySelector('.widget-container');
    if (widget) {
      gsap.fromTo(widget,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: PUNK.decay, delay: 0.5 }
      );
    }

    // Page CTA
    var cta = document.querySelector('.page-cta');
    if (cta) {
      gsap.fromTo(cta,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: PUNK.slam, delay: 2.5 }
      );
    }
  }

  // =========================================================================
  //  STORE
  // =========================================================================
  function initStore() {
    animateBack();

    // Reveal containers
    gsap.set('.tour-hero', { opacity: 1 });
    gsap.set('.store-section', { opacity: 1 });

    // Cart icon
    var cartIcon = document.querySelector('.header-cart');
    if (cartIcon) {
      gsap.fromTo(cartIcon,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.3, ease: PUNK.slam }
      );
    }

    // Store title — glitch in
    var title = document.querySelector('.tour-title');
    if (title) {
      glitchIn(title, { duration: 0.5, delay: 0.15 });
    }

    // Section titles — hard cut
    var sectionTitles = document.querySelectorAll('.store-section-title');
    if (sectionTitles.length && typeof ScrollTrigger !== 'undefined') {
      sectionTitles.forEach(function (el) {
        gsap.fromTo(el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.15,
            ease: PUNK.slam,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }

    // Product cards — fast stagger per section
    var sections = document.querySelectorAll('.store-section');
    if (sections.length && typeof ScrollTrigger !== 'undefined') {
      sections.forEach(function (section) {
        var cards = section.querySelectorAll('.store-card');
        if (!cards.length) return;

        gsap.fromTo(cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: PUNK.slam,
            stagger: 0.06,
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }

    // Enhanced cart drawer
    enhanceCartDrawer();
  }

  function enhanceCartDrawer() {
    var observer = new MutationObserver(function (mutations, obs) {
      var drawer = document.querySelector('.cart-drawer');
      if (!drawer) return;
      obs.disconnect();

      // Watch for .open class toggle
      var drawerObs = new MutationObserver(function () {
        if (drawer.classList.contains('open')) {
          // Override CSS transition with GSAP
          drawer.style.transition = 'none';
          gsap.fromTo(drawer,
            { x: '100%' },
            { x: '0%', duration: 0.35, ease: PUNK.slam }
          );

          // Stagger cart items
          var items = drawer.querySelectorAll('.cart-item');
          if (items.length) {
            gsap.fromTo(items,
              { opacity: 0, x: 20 },
              {
                opacity: 1, x: 0,
                duration: 0.25,
                ease: PUNK.slam,
                stagger: 0.04,
                delay: 0.15
              }
            );
          }
        }
      });

      drawerObs.observe(drawer, { attributes: true, attributeFilter: ['class'] });
    });

    observer.observe(document.body, { childList: true });
  }

  // =========================================================================
  //  JOIN
  // =========================================================================
  function initJoin() {
    animateBack();

    // Reveal container
    gsap.set('.join-hero', { opacity: 1 });

    var tl = gsap.timeline({ delay: 0.1 });

    // Title — glitch in
    var title = document.querySelector('.join-title');
    if (title) {
      tl.add(glitchIn(title, { duration: 0.5 }));
    }

    // Card — slam up
    var card = document.querySelector('.join-card');
    if (card) {
      tl.fromTo(card,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.35, ease: PUNK.slam },
        '-=0.15'
      );
    }

    // Form elements — fast stagger
    var formEls = [
      document.querySelector('.join-incentive'),
      document.querySelector('.join-field'),
      document.querySelector('.join-submit'),
      document.querySelector('.join-fine-print')
    ].filter(Boolean);

    if (formEls.length) {
      tl.fromTo(formEls,
        { opacity: 0, y: 8 },
        {
          opacity: 1, y: 0,
          duration: 0.25,
          ease: PUNK.slam,
          stagger: 0.05
        },
        '-=0.15'
      );
    }
  }

  // =========================================================================
  //  404 — Glitch Showcase
  // =========================================================================
  function init404() {
    animateBack();

    var errorCode = document.querySelector('.error-code');
    if (!errorCode) return;

    var tl = gsap.timeline({ delay: 0.15 });

    // Phase 1: rapid glitch frames
    tl.set(errorCode, { opacity: 1 });
    tl.to(errorCode, { x: 15, skewX: 12, duration: 0.04, ease: 'none' });
    tl.to(errorCode, { x: -10, skewX: -8, filter: 'blur(3px)', duration: 0.04, ease: 'none' });
    tl.to(errorCode, { x: 8, skewX: 5, filter: 'blur(0px)', duration: 0.04, ease: 'none' });
    tl.to(errorCode, { x: -15, skewX: -10, duration: 0.04, ease: 'none' });
    tl.to(errorCode, { x: 5, skewX: 3, filter: 'blur(2px)', duration: 0.04, ease: 'none' });
    tl.to(errorCode, { x: -3, skewX: -2, filter: 'blur(0px)', duration: 0.04, ease: 'none' });

    // Phase 2: slam to rest
    tl.to(errorCode, {
      x: 0, skewX: 0,
      duration: 0.25,
      ease: PUNK.slam
    });

    // Phase 3: recurring micro-glitch
    tl.call(function () {
      microGlitch(errorCode, { minDelay: 3, maxDelay: 6, strength: 5 });
    });

    // Error message — fades in after 404 settles
    var msg = document.querySelector('.error-message');
    if (msg) {
      tl.fromTo(msg,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: PUNK.decay },
        '-=0.1'
      );
    }
  }

  // =========================================================================
  //  DISPATCHER
  // =========================================================================
  var path = location.pathname.replace(/\/+$/, '') || '/';

  if (path.startsWith('/gallows'))       initGallows();
  else if (path.startsWith('/about'))    initAbout();
  else if (path.startsWith('/live'))     initLive();
  else if (path.startsWith('/store'))    initStore();
  else if (path.startsWith('/join'))     initJoin();

  // 404 — detect by .error-page presence
  if (document.querySelector('.error-page')) init404();
})();
