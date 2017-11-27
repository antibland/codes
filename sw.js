var CACHE_NAME = 'andyhoffman.codes-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/prod/style.css',
  '/img/bg-square.png',
  '/img/bg-square.webp',
  '/img/me.jpg',
  '/img/me.webp',
  '/img/me@2x.jpg',
  '/img/me@2x.webp'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      }
    )
  );
});
