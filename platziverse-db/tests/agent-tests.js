'use strict'
const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
// import test from 'ava'

let config = {
  logging: function () {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}

let AgentStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  AgentStub = {
    hasMany: sandbox.spy()
  }

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(t => {
  sandbox && sinon.sandbox.restore()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist')
})

test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasmany was executed')
  t.true(AgentStub.hasMany.calledWidth(MetricStub),'Argument should be the MetricModel')
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongTo was executed')
  t.true(MetricStub.belongsTo.calledWith(AgentStub),'Argument Should be the AgentModel')
})
