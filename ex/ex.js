var express = require('express')
var mongoose = require('mongoose')
var app = express()
var status = require('../index.js')
var config = {
  mongo: 'mongodb://localhost/test'
}


mongoose.Promise = Promise;
var options = {
    // db: { native_parser: true },
    // server: { poolSize: 5 },
    // replset: { rs_name: 'myReplicaSetName' },
    // user: 'myUserName',
    // pass: 'myPassword'
}
mongoose.connect('mongodb://localhost/blog', options);

var blogSchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
});
var Blog = mongoose.model('Blog', blogSchema)

app.use('/api/v1/system/status', 
	status({
	  app: app,
	  config: config,
	  auth: true,
	  user: 'admin',
	  pass: 'pass',
	  extra: {},
	  mongoose:mongoose
	})
)

app.get('/', function (req, res) {
  res.send('This is the index route.  You are probably looking for the <a href="/api/v1/system/status/api">System Status</a> route!')
})
app.listen(3000, function () {
  console.log('Simple example app listening at port %s', 3000)
})
module.exports = app