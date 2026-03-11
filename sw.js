var CACHE = 'gl-v9';
var PRECACHE = [
  '/',
  '/style.css',
  '/favicon-256.png',
  '/favicon.ico',
  '/404.html'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(PRECACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      var stale = keys.filter(function (k) { return k !== CACHE; });
      if (stale.length && self.cookieStore) {
        stale.push(
          self.cookieStore.getAll().then(function (cookies) {
            return Promise.all(cookies.map(function (c) {
              return self.cookieStore.delete(c.name);
            }));
          })
        );
      }
      return Promise.all(
        stale.map(function (k) {
          return typeof k === 'string' ? caches.delete(k) : k;
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);

  // Only handle same-origin GET requests
  if (e.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // Skip audio/video — range requests need native handling
  if (url.pathname.match(/\.(mp3|mp4|wav|ogg|flac|webm)$/)) return;

  // HTML: network-first
  if (e.request.headers.get('Accept').indexOf('text/html') !== -1) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var clone = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(e.request, clone); });
        return res;
      }).catch(function () {
        return caches.match(e.request).then(function (cached) {
          return cached || caches.match('/404.html');
        });
      })
    );
    return;
  }

  // Static assets: cache-first
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      if (cached) return cached;
      return fetch(e.request).then(function (res) {
        var clone = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(e.request, clone); });
        return res;
      });
    })
  );
});
