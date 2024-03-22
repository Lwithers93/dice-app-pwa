//
// Major version: changes in behavior / new buttons etc
// Minor version: new/edited words / bug fixes
const version = "v1.0";
const staticCacheName = "diceApp-" + version;

////

// List the files to precache
const precacheResources = [
  "/dice-app-pwa/",
  "/dice-app-pwa/index.html",
  "/dice-app-pwa/index.js",
  "/dice-app-pwa/manifest.json",
  "/dice-app-pwa/styles.css",
  "/dice-app-pwa/W-logo.png",
];

self.addEventListener("install", (e) => {
  console.log("Registering Service Worker");
  e.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
