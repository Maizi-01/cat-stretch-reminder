const CACHE_NAME = "cat-stretch-reminder-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.webmanifest",
  "./assets/cat-hero.png",
  "./assets/cat-icon-sheet.png",
  "./assets/icon-bell.png",
  "./assets/icon-eyes.png",
  "./assets/icon-shoulders.png",
  "./assets/icon-stretch.png",
  "./assets/icon-timer-macos.png",
  "./assets/icon-water.png",
  "./assets/audio/reminder-01.mp3",
  "./assets/audio/reminder-02.mp3",
  "./assets/audio/reminder-03.mp3",
  "./assets/audio/reminder-04.mp3",
  "./assets/audio/reminder-05.mp3",
  "./assets/audio/reminder-06.mp3",
  "./assets/audio/reminder-07.mp3",
  "./assets/audio/reminder-08.mp3",
  "./assets/audio/reminder-09.mp3",
  "./assets/audio/reminder-10.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request);
    })
  );
});
