//
// Major version: changes in behavior / new buttons etc
// Minor version: new/edited words / bug fixes
const version = "v1.0";
const staticCacheName = "diceApp-" + version;

self.addEventListener("install", (e) => {
  console.log("Registering sw");
  e.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) =>
        cache.addAll([
          "/dice-app/",
          "/dice-app/index.html",
          "/dice-app/index.js",
          "/dice-app/manifest.json",
          "/dice-app/styles.css",
          "/dice-app/W-logo.png",
        ])
      )
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
