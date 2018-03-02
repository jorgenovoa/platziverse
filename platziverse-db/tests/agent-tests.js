'use strict'

const test = require('ava')
// import test from 'ava'

let config = {
  logging: function () {}
}
let db = null

test.beforeEach(async () => {
  const setupDatabase = require('../')
  db = await setupDatabase(config)
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist')
})
