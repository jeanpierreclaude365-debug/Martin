// Offline helper for Times Tables Fun.
// It keeps a copy of the game on the device so it still opens without internet.
// The game's own files are always fetched fresh when online, so updates show straight away.
// Leaderboard traffic (Firebase) is never stored here.

const CACHE = "ttf-v5";
const CORE = [
  "./",
  "./index.html",
  "./firebase-config.js",
  "./manifest.webmanifest",
  "./images/icon.svg",
  "./images/icon-192.png",
  "./images/icon-512.png",
  "./images/apple-touch-icon.png",
  "./images/favicon-32.png",
  "./images/qr-code.svg"
];
// Libraries and fonts from other sites that the game needs to start
const SHARED_HOSTS = ["www.gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The game's own files: try the internet first, fall back to the saved copy
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }

  // Firebase library and fonts: use the saved copy if there is one
  if (SHARED_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
  // Everything else (such as the Firebase database) goes straight to the internet
});
