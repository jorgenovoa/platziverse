'use strict'
const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const agentfixtures = require('./fixtures/agent')
// import test from 'ava'

let config = {
  logging: function () {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}

let single = Object.assign({}, agentfixtures.single)
let id = 1
let AgentStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  AgentStub = {
    hasMany: sandbox.spy()
  }

//model findById Stub

  AgentStub.findById = sandbox.stub()
  AgentStub.findById.withArgs(id).returns(Promise.resolve(agentfixtures.findById(id)))

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist')
})

test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasmany was executed')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the MetricModel')
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongTo was executed')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument Should be the AgentModel')
})

test.serial('Agent#findById', async t => {
  let agent = await db.Agent.findById(id)

  t.true(AgentStub.findById.called, 'findById should be called on model')
  t.true(AgentStub.findById.calledOnce,'findById should be called once')
  t.true(AgentStub.findById.calledWith(id),'findById should be called with Id')

  t.deepEqual(agent, agentfixtures.findById(id), 'Should be the same')
})
