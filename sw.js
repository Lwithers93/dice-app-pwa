//
// Major version: changes in behavior / new buttons etc
// Minor version: new/edited words / bug fixes
const version = "v1.0";
const staticCacheName = "diceApp-" + version;

////

// List the files to precache
const precacheResources = [
  "/dice-app/",
  "/dice-app/index.html",
  "/dice-app/index.js",
  "/dice-app/manifest.json",
  "/dice-app/styles.css",
  "/dice-app/W-logo.png",
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
