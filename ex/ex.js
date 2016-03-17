var express = require('express')
var app = express()
var status = require('../index.js')
var config = {
  mongo: 'mongodb://localhost/test'
}
app.use('/api/v1/system/status', 
	status({
	  app: app,
	  config: config,
	  auth: true,
	  user: 'admin',
	  pass: 'pass',
	  extra: {}
	})
)

app.get('/', function (req, res) {
  res.send('This is the index route.  You are probably looking for the <a href="/api/v1/system/status">System Status</a> route!')
})
app.listen(3000, function () {
  console.log('Simple example app listening at port %s', 3000)
})
module.exports = app