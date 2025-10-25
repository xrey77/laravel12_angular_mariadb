
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 2,
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "route": "/productlist"
  },
  {
    "renderMode": 2,
    "route": "/productcatalog"
  },
  {
    "renderMode": 2,
    "route": "/productsearch"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5248, hash: '95f4dc3bd54b8760374d30bd3d86407b2933603ac54d3f627db70b0a769ba94e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1220, hash: 'd09f019b28235aaec0439e4bc412f50732165cbd69cf8e2465472fa318705f01', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 43652, hash: 'd984863833863bb8dc5cb4cd6c08412fa4c6064f7cddcc5c17aad9ee80b85277', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'index.html': {size: 49485, hash: '8be92ef6e8318666073beb6cefead6a82854f093d31e249a93b721c7ad59c42c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'productlist/index.html': {size: 45730, hash: '8eb7ea3633bc446b26f66b4e2d2daf5b7b52681f744e4d026060f58836536ec0', text: () => import('./assets-chunks/productlist_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 43109, hash: '5a171e701d2217d0a2372715937e0e665b951df43f9acc479205d76219443422', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'productcatalog/index.html': {size: 43838, hash: 'ed9cf44041be41dbf21737ac680ef1f9b4616797dc52a702496ef51854c98e0e', text: () => import('./assets-chunks/productcatalog_index_html.mjs').then(m => m.default)},
    'productsearch/index.html': {size: 42054, hash: '8cca2adfba61d43a1b17e60755ef5f470c1a9cda70f6192d555f1b65bcfdc033', text: () => import('./assets-chunks/productsearch_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 51001, hash: '0c731076d5630d154b43794e597e91fcea2f6051f3d2f1b3febf46d647179da4', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'styles-VRDYZCWE.css': {size: 230966, hash: 'yJEOwb9t5lw', text: () => import('./assets-chunks/styles-VRDYZCWE_css.mjs').then(m => m.default)}
  },
};
