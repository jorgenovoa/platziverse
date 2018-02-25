'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupMetricModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('metric', {
    type: {
      type: Sequelize.STRING,
      allownull: false
    },
    value: {
      type: Sequelize.TEXT,
      allownull: false
    }
  })
}
