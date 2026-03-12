/* =========================================================================
   GOODNIGHT LAVENDER — GSAP Animation Core
   ========================================================================= */
(function () {
  'use strict';

  // Reduced-motion guard
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.animation = 'none';
    });
    window.GL_ANIM = { disabled: true };
    return;
  }

  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Mark body so CSS knows GSAP is active
  document.body.setAttribute('data-gsap', '');

  // --- Easing palette ---
  var PUNK = {
    slam:       'power4.out',
    brutal:     'power4.inOut',
    decay:      'power2.out',
    glitchSteps: SteppedEase.config(5),
    none:       'none'
  };

  // --- Mobile detection ---
  var isMobile = matchMedia('(pointer: coarse)').matches;

  // --- glitchIn: signature animation ---
  // Rapid x/skewX jitter frames with blur flashes, then slam to rest
  function glitchIn(target, opts) {
    opts = opts || {};
    var duration = opts.duration || 0.5;
    var delay = opts.delay || 0;
    var intensity = opts.intensity || 1;

    var tl = gsap.timeline({ delay: delay });

    tl.set(target, { opacity: 0, visibility: 'visible' });

    if (isMobile) {
      // 2 frames on mobile
      tl.to(target, {
        opacity: 1,
        duration: 0.05,
        x: gsap.utils.random(-12, 12) * intensity,
        skewX: gsap.utils.random(-6, 6) * intensity
      });
      tl.to(target, {
        duration: 0.05,
        x: gsap.utils.random(-5, 5) * intensity,
        skewX: gsap.utils.random(-3, 3) * intensity
      });
    } else {
      // 3 frames on desktop
      tl.to(target, {
        opacity: 1,
        duration: 0.05,
        x: gsap.utils.random(-15, 15) * intensity,
        skewX: gsap.utils.random(-8, 8) * intensity
      });
      tl.to(target, {
        duration: 0.05,
        x: gsap.utils.random(-10, 10) * intensity,
        skewX: gsap.utils.random(-5, 5) * intensity,
        filter: 'blur(2px)'
      });
      tl.to(target, {
        duration: 0.05,
        x: gsap.utils.random(-5, 5) * intensity,
        skewX: gsap.utils.random(-3, 3) * intensity,
        filter: 'blur(0px)'
      });
    }

    // Slam to final position
    tl.to(target, {
      duration: duration - (isMobile ? 0.1 : 0.15),
      x: 0,
      skewX: 0,
      filter: 'blur(0px)',
      ease: PUNK.slam
    });

    return tl;
  }

  // --- microGlitch: recurring subtle jitter ---
  function microGlitch(target, opts) {
    opts = opts || {};
    var minDelay = opts.minDelay || 3;
    var maxDelay = opts.maxDelay || 6;
    var strength = opts.strength || 5;

    function fire() {
      var wait = gsap.utils.random(minDelay, maxDelay);
      gsap.delayedCall(wait, function () {
        gsap.to(target, {
          x: gsap.utils.random(-strength, strength),
          skewX: gsap.utils.random(-3, 3),
          duration: 0.05,
          yoyo: true,
          repeat: 1,
          ease: 'none',
          onComplete: fire
        });
      });
    }
    fire();
  }

  // --- animateBack: back arrow entrance ---
  function animateBack() {
    var el = document.querySelector('.header-back');
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.3, ease: PUNK.slam }
    );
  }

  // Export
  window.GL_ANIM = {
    disabled: false,
    PUNK: PUNK,
    isMobile: isMobile,
    glitchIn: glitchIn,
    microGlitch: microGlitch,
    animateBack: animateBack
  };
})();
