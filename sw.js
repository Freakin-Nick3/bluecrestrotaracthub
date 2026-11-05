const CACHE='bcr-hub-v17';
const ASSETS=['./','./index.html','./css/styles.css','./css/social-members.css','./css/public-articles.css','./js/app.js','./manifest.webmanifest','./icons/logo.png','./Assert/login.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('push',e=>{
  let data={};try{data=e.data?.json()||{}}catch{data={body:e.data?.text()||''}}
  e.waitUntil(self.registration.showNotification(data.title||'BlueCrest Rotaract Hub',{body:data.body||'There is a new club update.',icon:'./icons/logo.png',badge:'./icons/logo.png',tag:data.tag||'club-update',data:{url:data.url||'./'}}));
});
self.addEventListener('notificationclick',e=>{e.notification.close();const target=new URL(e.notification.data?.url||'./',self.location.origin).href;e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{const client=clients.find(item=>item.url.startsWith(self.location.origin));if(client){client.navigate(target);return client.focus()}return self.clients.openWindow(target)}))});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(e.request.method!=='GET'||url.hostname.endsWith('.supabase.co')||url.origin!==self.location.origin)return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(response=>{
    if(response.ok)caches.open(CACHE).then(cache=>cache.put(e.request,response.clone()));
    return response;
  }).catch(()=>caches.match('./index.html'))));
});

