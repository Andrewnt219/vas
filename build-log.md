info  - Creating an optimized production build...
info  - Using external babel configuration from D:\Workspace\vas\frontend\.babelrc.js
Webpack Bundle Analyzer saved report to D:\Workspace\vas\frontend\.next\analyze\server.html
Webpack Bundle Analyzer saved report to D:\Workspace\vas\frontend\.next\analyze\client.html
info  - Compiled successfully
info  - Collecting page data...
info  - Generating static pages (0/4)
info  - Generating static pages (1/4)
info  - Generating static pages (2/4)
info  - Generating static pages (3/4)
info  - Generating static pages (4/4)
info  - Finalizing page optimization...

Page                                                           Size     First Load JS
┌ ○ /                                                          5.67 kB          93 kB
├   /_app                                                      0 B            80.1 kB
├ ○ /404                                                       2.78 kB        82.8 kB
├ λ /api/entry                                                 0 B            80.1 kB
├ λ /api/posts/increaseViews                                   0 B            80.1 kB
└ ● /blogs/[slug]                                              6.6 kB         93.9 kB
    └ /blogs/test
+ First Load JS shared by all                                  80.1 kB
  ├ chunks/06ca1aa2f3adb52a230e4204e30c7e3f241be985.e53250.js  14.7 kB
  ├ chunks/commons.f49261.js                                   13.3 kB
  ├ chunks/framework.ae602c.js                                 41.8 kB
  ├ chunks/main.6b1b60.js                                      6.32 kB
  ├ chunks/pages/_app.116278.js                                2.79 kB
  └ chunks/webpack.fe7666.js                                   1.19 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)

