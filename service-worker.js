// Service worker to cache app files for offline use

const CACHE_NAME = 'pwa-clock-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/reg.js',
  '/service-worker.js',
  '/manifest.json',
  '/alarm_clock.png', // Your 128x128 icon
  '/alarm.mp3'
];

// Install event: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate event: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// Fetch event: serve from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
