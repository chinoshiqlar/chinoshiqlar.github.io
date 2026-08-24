const CACHE='chin-oshiklar-pwa-v8';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
  event.respondWith(
    fetch(event.request).then(res=>{
      const resClone = res.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request, resClone));
      return res;
    }).catch(()=>caches.match(event.request))
  );
});
