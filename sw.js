//
// Major version: changes in behavior / new buttons etc
// Minor version: new/edited words / bug fixes
const version = "v1.1";
const staticCacheName = "diceApp-" + version;

////

// List the files to precache
const precacheResources = [
  "/dice-app-pwa/",
  "/dice-app-pwa/index.html",
  "/dice-app-pwa/index.js",
  "/dice-app-pwa/manifest.webmanifest",
  "/dice-app-pwa/styles.css",
  "/dice-app-pwa/w-logo.png",
  "/dice-app-pwa/src/dice1.png",
  "/dice-app-pwa/src/dice2.png",
  "/dice-app-pwa/src/dice3.png",
  "/dice-app-pwa/src/dice4.png",
  "/dice-app-pwa/src/dice5.png",
  "/dice-app-pwa/src/dice6.png",
  "/dice-app-pwa/src/dices.png",
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
