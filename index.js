'use strict'

var _ = require('lodash')
var express = require('express')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var helmet = require('helmet')
var compression = require('compression')
var os = require('os')
var dns = require('dns')
var path = require('path')
var status = express()
var basicAuth = require('basic-auth-connect')

status.use(bodyParser.json())
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
status.use(methodOverride())
// well-known web vulnerabilities
status.use(helmet())
// Gzip compressing
status.use(compression())
// cache=memory or swig dies in NODE_ENV=production
status.locals.cache = 'memory'
var swig = require('swig')
status.engine('html', swig.renderFile)
status.set('view engine', 'html')
status.use(express.static(path.join(__dirname, 'client/'), {
  maxAge: 31557600000
}))

function createObj (data) {
  var obj = {
    process: {
      versions: process.versions,
      arch: process.arch,
      platform: process.platform,
      argv: process.argv,
      pid: process.pid,
      release: process.release,
      uptime: process.uptime()
    },
    os: {
      EOL: os.EOL,
      arch: os.arch(),
      cpus: os.cpus(),
      cpuCount: os.cpus().length,
      endianness: os.endianness(),
      freemem: os.freemem() / (1024 * 1024),
      freememPercentage: os.freemem() / os.totalmem(),
      homedir: os.homedir(),
      hostname: os.hostname(),
      loadavg: os.loadavg(),
      networkInterfaces: os.networkInterfaces(),
      platform: os.platform(),
      release: os.release(),
      tmpdir: os.tmpdir(),
      totalmem: os.totalmem() / (1024 * 1024),
      type: os.type(),
      uptime: os.uptime()
    },
    dns: {
      servers: dns.getServers()
    },
    global: {
      __dirname: __dirname,
      __filename: __filename
    }
  }
  if (data.extra) {
    obj.extra = data.extra
  }
  if (data.config) {
    obj.config = data.config
  }
  if (data.app) {
    obj.express = {
      settings: data.app.settings,
      locals: data.app.locals
    }
  }
  if (data.mongoose) {
    obj.mongoose = {
      replica: data.mongoose.connection.replica,
      hosts: data.mongoose.connection.hosts,
      host: data.mongoose.connection.host,
      port: data.mongoose.connection.port,
      user: data.mongoose.connection.user,
      options: data.mongoose.connection.options,
      config: data.mongoose.connection.config,
      name: data.mongoose.connection.name,
      models: data.mongoose.modelSchemas,
      readyState: data.mongoose.connection.readyState === 0 ? 0 : 1,
      closeCalled: data.mongoose.connection._closeCalled,
      hasOpened: data.mongoose.connection._hasOpened,
      listening: data.mongoose.connection._listening
    }
  }
  return obj
}
// 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
module.exports = function (data) {
  if (data.auth) {
    status.use(basicAuth(function (user, pass) {
      var authorize = {
        user: 'admin',
        pass: 'pass'
      }
      if (data.user && data.pass) authorize = {
          user: data.user,
          pass: data.pass
        }
      return authorize.user == user && authorize.pass == pass
    }))
  }

  status.get('/status.html', function (req, res) {
    res.render(path.resolve(__dirname,'index.html'), {
      obj: createObj(data)
    })
  })
  status.get('/api', function (req, res) {
    res.status(200).send(createObj(data))
  })
  return status
}
