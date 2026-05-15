const CACHE_NAME = "papprito-hr-v5";

const urlsToCache = [

"/",
"/index.html",
"/employee.html",
"/attendance.html",
"/payroll.html",
"/employeeportal.html",
"/hrapproval.html",
"/trackleaves.html",
"/payslip.html",
"/manifest.json",
"/icon-192.png",
"/icon-512.png"

];

self.addEventListener("install",event=>{

self.skipWaiting();

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache=>{

return cache.addAll(urlsToCache);

})

);

});

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys().then(keys=>{

return Promise.all(

keys.map(key=>{

if(key !== CACHE_NAME){

return caches.delete(key);

}

})

);

})

);

return self.clients.claim();

});

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)
.then(response=>{

return response || fetch(event.request);

})

);

});
