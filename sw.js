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

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activate event!");
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener("fetch", (event) => {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
