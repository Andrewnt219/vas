if (!self.define) {
	const e = (e) => {
			'require' !== e && (e += '.js');
			let s = Promise.resolve();
			return (
				i[e] ||
					(s = new Promise(async (s) => {
						if ('document' in self) {
							const i = document.createElement('script');
							(i.src = e), document.head.appendChild(i), (i.onload = s);
						} else importScripts(e), s();
					})),
				s.then(() => {
					if (!i[e]) throw new Error(`Module ${e} didn’t register its module`);
					return i[e];
				})
			);
		},
		s = (s, i) => {
			Promise.all(s.map(e)).then((e) => i(1 === e.length ? e[0] : e));
		},
		i = { require: Promise.resolve(s) };
	self.define = (s, t, n) => {
		i[s] ||
			(i[s] = Promise.resolve().then(() => {
				let i = {};
				const a = { uri: location.origin + s.slice(1) };
				return Promise.all(
					t.map((s) => {
						switch (s) {
							case 'exports':
								return i;
							case 'module':
								return a;
							default:
								return e(s);
						}
					})
				).then((e) => {
					const s = n(...e);
					return i.default || (i.default = s), i;
				});
			}));
	};
}
define('./sw.js', ['./workbox-a8b10d99'], function (e) {
	'use strict';
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_next/static/chunks/05d954cf.08e2edb12770399693cb.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/10.9b781c25095b234040e5.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/11.83fe4f281f056c3e40b8.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/12.6481e84d9e6b47ac9dcf.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/13.72f7e79e190b2c88a073.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/14.b1a7e9ce47eb317eb397.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/15.ce25ce1ebfcefc036054.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/16.3b70c451fed973ff52ae.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/17.c4d34ef36879eeca9918.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/18.b55c91eafb2b9695291f.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/19.3b8e9b3627badf89ba39.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/1bfc9850.872fa549def3ee642eb2.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/20.23388a2a51def76d17a7.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/21.d7937de1c221095f592e.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/22.6c44422c0657382bf636.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/23.34157f768036f309fa95.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/24.a5280d1c9108f68f7c19.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/25.c65c509e63aa8a070081.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/26.56054b1bcfe8c004d33b.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/27.12e08974895081aec07c.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/28.1be0310a50508c53f9b8.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/29.4f4b265a403bf8c9385f.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url:
						'/_next/static/chunks/2a6f90bc1eeb2c32a62f3e447bf261a93131b324.fdd8f095bb24e24a30f6.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/30.f1d05527501deafff9ac.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url:
						'/_next/static/chunks/57a6da5006f4cb771c5bbd4825447bf8de6e0fe0.c821c59db7d89517f944.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url:
						'/_next/static/chunks/6cb18159c449248eddcfb1cfda46c7f90946a0bd.285a45966d5bf3a706c3.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/9.a3dbd0693c926aab5a42.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url:
						'/_next/static/chunks/adbc56f2289cc68d6adfa0ef742432303482873c.7d82a940590e6a515a3e.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url:
						'/_next/static/chunks/c3c264dcb0c7e601455dff93d80e5ca9df293ca1.2e95658bc38a2fba46e4.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/commons.47881fbb2c4809366709.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/framework.9d524150d48315f49e80.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/main-7019520a30538e273367.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/pages/_app-105538a61d0a5126db56.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/pages/_error-14c06651a84b4d53471b.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/pages/about-us-86e60899f167f3819cf9.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url:
						'/_next/static/chunks/pages/about-us/members-f384438716ed6b5d9ec8.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url:
						'/_next/static/chunks/pages/about-us/partners-936aee7d1f57689b39ba.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url:
						'/_next/static/chunks/pages/categories/%5Buid%5D-edce2fe9f6dd897c0c7e.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/pages/contact-us-0993657a0a81bc03974d.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/pages/index-3d40735196a8d418a6bb.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url:
						'/_next/static/chunks/pages/posts/%5Buid%5D-3827a6126ac8a6c60da5.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/polyfills-ea132d9ba2d532752374.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/chunks/webpack-fd2035ebc9101a19a69f.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/qfTdFCdyWt9IHkL2FZimE/_buildManifest.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/_next/static/qfTdFCdyWt9IHkL2FZimE/_ssgManifest.js',
					revision: 'qfTdFCdyWt9IHkL2FZimE',
				},
				{
					url: '/browserconfig.xml',
					revision: '83df22a95d2198e014b5d34391573983',
				},
				{ url: '/favicon.ico', revision: 'c66883b0f7fcf0d9bd6b832e84615653' },
				{
					url: '/fonts/dm-sans-v6-latin-500.woff',
					revision: 'e8ddece75654bb332c89ffec3594e05a',
				},
				{
					url: '/fonts/dm-sans-v6-latin-500.woff2',
					revision: 'fde3d0124cb7ec9415ce2b8ebaf89118',
				},
				{
					url: '/fonts/dm-sans-v6-latin-500italic.woff',
					revision: '9b2cbd8a06c85b3eff0a6adad5de429e',
				},
				{
					url: '/fonts/dm-sans-v6-latin-500italic.woff2',
					revision: '86c7883fa84fd42ad31ace076a258eb7',
				},
				{
					url: '/fonts/dm-sans-v6-latin-700.woff',
					revision: '082b291662e763b97fd53d99571e4732',
				},
				{
					url: '/fonts/dm-sans-v6-latin-700.woff2',
					revision: '171ccc885c8deb88a0f3b55096584514',
				},
				{
					url: '/fonts/dm-sans-v6-latin-700italic.woff',
					revision: '64fcc55d4ad9df50734c32da293a76e8',
				},
				{
					url: '/fonts/dm-sans-v6-latin-700italic.woff2',
					revision: '73ae5e41616df360ee29f8db5b10e14f',
				},
				{
					url: '/fonts/dm-sans-v6-latin-italic.woff',
					revision: '57dd34a3656a4ee4cfca30e21190b844',
				},
				{
					url: '/fonts/dm-sans-v6-latin-italic.woff2',
					revision: '60bc34c098f3f1d07592c2eb81d39320',
				},
				{
					url: '/fonts/dm-sans-v6-latin-regular.woff',
					revision: '54706a9e804757f8d8edea7d7e9f2577',
				},
				{
					url: '/fonts/dm-sans-v6-latin-regular.woff2',
					revision: 'ad513518b8de790106aefb37f7304835',
				},
				{
					url: '/fonts/inter-v3-vietnamese-500.woff',
					revision: '6910d1904437d9a0ce8abdc47b08de2c',
				},
				{
					url: '/fonts/inter-v3-vietnamese-500.woff2',
					revision: 'b56b9a966538482e396a5c1ebe88810c',
				},
				{
					url: '/fonts/inter-v3-vietnamese-700.woff',
					revision: '12a71c3f1ac36dd425d9fd73243585e5',
				},
				{
					url: '/fonts/inter-v3-vietnamese-700.woff2',
					revision: '5f5ea172c1c9bf6c97ac3f66581b3ac3',
				},
				{
					url: '/fonts/inter-v3-vietnamese-regular.woff',
					revision: 'f5873bfa4fefd38d81b3fbfe5bd9af8d',
				},
				{
					url: '/fonts/inter-v3-vietnamese-regular.woff2',
					revision: '18110e90ffb39053e8eb6c7479607a4a',
				},
				{
					url: '/site.webmanifest',
					revision: '8961ac32a12eca3a85177c2445cde3b1',
				},
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			'/',
			new e.NetworkFirst({
				cacheName: 'start-url',
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 1,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: 'google-fonts',
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 4,
						maxAgeSeconds: 31536e3,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 4,
						maxAgeSeconds: 604800,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 64,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\/api\/.*$/i,
			new e.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 16,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			'GET'
		),
		e.registerRoute(
			/.*/i,
			new e.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			'GET'
		);
});
