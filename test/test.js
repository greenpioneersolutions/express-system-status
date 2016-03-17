var assert = require('assert')
var request = require('supertest')
var _ = require('lodash')
var app = require('../ex/ex.js')

describe('System Status', function () {
    it('GET /api/v1/system/status/api', function (done) {
      request(app)
        .get('api/v1/system/status/api')
        .expect(200, function (err, res) {
          if (err) return done(err)
          done()
        })
    })
})