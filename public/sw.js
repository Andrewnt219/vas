if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return t[s]||(e=new Promise((async e=>{if("document"in self){const t=document.createElement("script");t.src=s,document.head.appendChild(t),t.onload=e}else importScripts(s),e()}))),e.then((()=>{if(!t[s])throw new Error(`Module ${s} didn’t register its module`);return t[s]}))},e=(e,t)=>{Promise.all(e.map(s)).then((s=>t(1===s.length?s[0]:s)))},t={require:Promise.resolve(e)};self.define=(e,n,f)=>{t[e]||(t[e]=Promise.resolve().then((()=>{let t={};const a={uri:location.origin+e.slice(1)};return Promise.all(n.map((e=>{switch(e){case"exports":return t;case"module":return a;default:return s(e)}}))).then((s=>{const e=f(...s);return t.default||(t.default=e),t}))})))}}define("./sw.js",["./workbox-a8b10d99"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/chunks/05d954cf.db3da8affc75201ebc4c.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/13.ea87fcb667c51e222a2e.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/14.7b6656a57e7a30930dee.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/15.273c8f9bf55970360aeb.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/16.01fa5a24f55bdd2daaa3.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/17.d3836c3575441c3bd9bd.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/18.212fc6add301544400a2.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/19.1eb10a3140028ad0a8c0.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/1af9cdd6402ca3a52779d434ec6b2d20dfd2da85.4d86a712a2639710953e.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/1bfc9850.f569f674c09982792fa7.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/20.e9275c226843b7f0d97a.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/21.39256f2b3ba9ee693037.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/22.553418d4e4663a746f95.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/23.bfaf7aa1125007683e18.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/24.0f67c0fd23f0c9fefc2d.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/25.6eb45aa9387570987804.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/26.8c98bd738d43d791d4c0.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/265b2531e6473c6cd63d49e965664a00de96c8bf.8165af84ee92478b810f.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/27.016e2edda9ee2c62f4c7.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/28.ebc85561405e75c24095.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/29.135be8eb278a6288db85.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/30.58f5e19a7e176a7db2ec.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/31.0e78e4308063f5a099ff.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/32.647565587be8d2299345.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/33.2a364cba8a02232ddeb5.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/34.8f870d8bd93e94d02738.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/3ff4ff2ba5ac015c5b200f84c9959b25495594de.c821c59db7d89517f944.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/7428acbff1f5c89bc3baf9429eccc3269282db9d.6a1eddf6bda68d6c4582.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/7964706f7eafa5658ef8b2fb1a82ceed401f51be.31ddf144a2b727c7db9d.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/adbc56f2289cc68d6adfa0ef742432303482873c.c99f3b8596000acd8355.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/bf619f8bdac3809812a1f5579e39e7b510785992.a9d185e7bf5e57baefed.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/commons.47881fbb2c4809366709.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/ded4287750fe5db8a6ceb980ff32597bda52b373.5d3d5b87eb30ebe64250.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/framework.29f9e2f3d4a33bafbaa5.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/main-1f5afbb5c39df35f64d5.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/_app-2757a44c8b41c2a23998.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/_error-d904bb699c0a28ef423b.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/about-us-192d293f452d7c5f8d6c.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/about-us/members-489a68c1b6d8e6498034.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/about-us/partners-f55e1188fab1592b2e9b.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/blogs-5e1283750fb9774fdd46.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/blogs/posts/%5Bslug%5D-37c06082fc4b8f2e77ac.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/contact-us-b350e9f36cb51bbeb7a8.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/events-8bacf09287289210c7da.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/events/orientations-ee4b3d2a8dc2fe99f3cf.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/events/posts/%5Bslug%5D-c243b24cd10666a014a8.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/events/tet-7909a69f2c6ca1191139.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/index-32d7eae2ce0fe87a72eb.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/news-6ce039ce3fa009316f6a.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/news/posts/%5Bslug%5D-9dae53d4b3c28fb4f952.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/pages/posts/%5Buid%5D-ff49ab03f576a91d510d.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/polyfills-1841a75d87a09cd1eb5b.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/chunks/webpack-31af17f44c8d8c117951.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/fs_fWhU2kF8VNCtkAlSpy/_buildManifest.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/_next/static/fs_fWhU2kF8VNCtkAlSpy/_ssgManifest.js",revision:"fs_fWhU2kF8VNCtkAlSpy"},{url:"/browserconfig.xml",revision:"83df22a95d2198e014b5d34391573983"},{url:"/favicon.ico",revision:"c66883b0f7fcf0d9bd6b832e84615653"},{url:"/fonts/dm-sans-v6-latin-500.woff",revision:"e8ddece75654bb332c89ffec3594e05a"},{url:"/fonts/dm-sans-v6-latin-500.woff2",revision:"fde3d0124cb7ec9415ce2b8ebaf89118"},{url:"/fonts/dm-sans-v6-latin-500italic.woff",revision:"9b2cbd8a06c85b3eff0a6adad5de429e"},{url:"/fonts/dm-sans-v6-latin-500italic.woff2",revision:"86c7883fa84fd42ad31ace076a258eb7"},{url:"/fonts/dm-sans-v6-latin-700.woff",revision:"082b291662e763b97fd53d99571e4732"},{url:"/fonts/dm-sans-v6-latin-700.woff2",revision:"171ccc885c8deb88a0f3b55096584514"},{url:"/fonts/dm-sans-v6-latin-700italic.woff",revision:"64fcc55d4ad9df50734c32da293a76e8"},{url:"/fonts/dm-sans-v6-latin-700italic.woff2",revision:"73ae5e41616df360ee29f8db5b10e14f"},{url:"/fonts/dm-sans-v6-latin-italic.woff",revision:"57dd34a3656a4ee4cfca30e21190b844"},{url:"/fonts/dm-sans-v6-latin-italic.woff2",revision:"60bc34c098f3f1d07592c2eb81d39320"},{url:"/fonts/dm-sans-v6-latin-regular.woff",revision:"54706a9e804757f8d8edea7d7e9f2577"},{url:"/fonts/dm-sans-v6-latin-regular.woff2",revision:"ad513518b8de790106aefb37f7304835"},{url:"/fonts/inter-v3-vietnamese-500.woff",revision:"6910d1904437d9a0ce8abdc47b08de2c"},{url:"/fonts/inter-v3-vietnamese-500.woff2",revision:"b56b9a966538482e396a5c1ebe88810c"},{url:"/fonts/inter-v3-vietnamese-700.woff",revision:"12a71c3f1ac36dd425d9fd73243585e5"},{url:"/fonts/inter-v3-vietnamese-700.woff2",revision:"5f5ea172c1c9bf6c97ac3f66581b3ac3"},{url:"/fonts/inter-v3-vietnamese-regular.woff",revision:"f5873bfa4fefd38d81b3fbfe5bd9af8d"},{url:"/fonts/inter-v3-vietnamese-regular.woff2",revision:"18110e90ffb39053e8eb6c7479607a4a"},{url:"/site.webmanifest",revision:"8961ac32a12eca3a85177c2445cde3b1"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[new s.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\/api\/.*$/i,new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/.*/i,new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
