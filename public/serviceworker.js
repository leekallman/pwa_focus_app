const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];
const self = this;

// Install ServiceWorker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('opened cache');
                return cache.addAll(urlsToCache);
            })

    );
})

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // for the fetch we respond with matching all the requests
        caches.match(event.request)
            .then(() => {
                // for all the requests, we fetch them again
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            ))
    )
});