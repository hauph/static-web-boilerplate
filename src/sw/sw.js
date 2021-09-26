// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('first-app').then((cache) => {
//       cache.addAll(['/', '/index.html', '/style/main.css', '/js/bundle.js']);
//     }),
//   );
//   // return self.clients.claim();
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((res) => {
//       return res;
//     }),
//   );
// });
