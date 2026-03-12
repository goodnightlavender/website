/* =========================================================================
   GOODNIGHT LAVENDER — Landing Page GSAP Animations
   ========================================================================= */
(function () {
  'use strict';

  if (window.GL_ANIM && window.GL_ANIM.disabled) return;

  var PUNK = window.GL_ANIM.PUNK;
  var glitchIn = window.GL_ANIM.glitchIn;
  var microGlitch = window.GL_ANIM.microGlitch;

  function runLandingAnimations() {
    var master = gsap.timeline();

    // -- Band name: glitch into existence --
    var bandName = document.querySelector('.band-name');
    if (bandName) {
      master.add(glitchIn(bandName, { duration: 0.5 }));
    }

    // -- Kanji: glitch in, overlapping --
    var kanji = document.querySelector('.kanji');
    if (kanji) {
      master.add(glitchIn(kanji, { duration: 0.5, intensity: 0.7 }), '-=0.3');
      // Recurring micro-glitch on kanji
      master.call(function () {
        microGlitch(kanji, { minDelay: 4, maxDelay: 8, strength: 4 });
      });
    }

    // -- Nav links: hard stagger, snap on --
    var links = document.querySelectorAll('.link-text');
    if (links.length) {
      master.fromTo(links,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: PUNK.slam,
          stagger: 0.06
        },
        '-=0.15'
      );
    }

    // -- Join CTA: quick snap --
    var joinCta = document.querySelector('.join-cta');
    if (joinCta) {
      master.fromTo(joinCta,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.25, ease: PUNK.slam },
        '-=0.1'
      );
    }

    // -- Socials: snap in --
    var socials = document.querySelector('.socials');
    if (socials) {
      master.fromTo(socials,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: PUNK.slam },
        '-=0.08'
      );
    }
  }

  // -- Hook into preloader flow --
  var preloader = document.getElementById('preloader');
  var landing = document.querySelector('.landing');

  if (!preloader) {
    // No preloader (fonts cached, already removed by inline script)
    // Landing is already visible, run animations
    runLandingAnimations();
    return;
  }

  // Preloader exists — override the inline script's transition with GSAP
  // The inline script handles font loading and adds .preloader-done / .preloader-ready
  // We observe for the preloader being removed, then fire our animations
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      for (var j = 0; j < mutations[i].removedNodes.length; j++) {
        if (mutations[i].removedNodes[j] === preloader) {
          observer.disconnect();
          // Landing should now be visible (preloader-hidden removed by inline script)
          landing.classList.remove('preloader-hidden');
          runLandingAnimations();
          return;
        }
      }
    }
  });
  observer.observe(preloader.parentNode, { childList: true });

  // Fallback: if preloader is somehow already gone
  setTimeout(function () {
    if (!preloader.parentNode) {
      observer.disconnect();
      landing.classList.remove('preloader-hidden');
      runLandingAnimations();
    }
  }, 2500);
})();
