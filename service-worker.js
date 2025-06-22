// service-worker.js
// Handles caching for offline support

const CACHE_NAME = 'pwa-clock-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/reg.js',
  '/service-worker.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/alarm.mp3'
];

// Install event: cache all necessary files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// Activate event: clean up old caches if any
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

// Fetch event: serve cached files if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
