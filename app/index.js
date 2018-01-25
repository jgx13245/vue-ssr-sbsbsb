/*vue-ssr*/
const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const microcache = require('route-cache')
const serveStatic = require('serve-static')
const logger = require('./util/logger')
const bodyParser = require('body-parser')
const apiRouter = require('./router/api')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`


const app = express()

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('../dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
//即将渲染的dom页面
const templatePath = resolve('../src/index.template.html')
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('../dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('../build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
// gzip 压缩
app.use(compression())

// 访问日志
app.use(logger.access)

// 解析请求体数据
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}))

// 静态服务器目录
app.use(serveStatic('public'))
// vue-ssr
//app.use(compression({ threshold: 0 }))
//app.use(favicon('../public/logo-48.png'))
//app.use('/dist', serve('../dist', true))
//app.use('/public', serve('../public', true))
//app.use('/manifest.json', serve('../manifest.json', true))
//app.use('/service-worker.js', serve('../dist/service-worker.js'))
//app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

// 接口
app.use('/active/api', apiRouter)

function render (req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // 渲染错误的页面或者或报错
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: '活动系统2.0', // 默认标题
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      //处理异常
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})


module.exports = app
