self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("dbEdi")
      .then((cache) => {
        return cache.addAll([
          "./",
          "./BIBLIADB.js",
          "./index.js",
          "./manifest.json",
          "./edi-icon-md.svg",
          "./edi-icon.svg"
          
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

self.addEventListener("fetch", (e) => {

  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return res ? res : e.request;
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
