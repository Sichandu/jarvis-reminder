// const CACHE = 'jarvis-v2';
// const ASSETS = ['/', '/index.html', '/founder.html', '/manifest.json'];

// self.addEventListener('install', e => {
//   e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
//   self.skipWaiting();
// });

// self.addEventListener('activate', e => {
//   e.waitUntil(caches.keys().then(keys =>
//     Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
//   ));
//   self.clients.claim();
// });

// self.addEventListener('fetch', e => {
//   e.respondWith(
//     caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
//   );
// });




const CACHE_NAME = "jarvis-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Install
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});