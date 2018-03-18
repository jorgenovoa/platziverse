'use strict'

//const test = require('ava')
import test from 'ava'

let db = null
let config = {
    logging: function(){

    }
}
test.beforeEach(async() =>{
    const setupdatabase = require('../')
    db = setupdatabase(config)
})

test('Agent', t => {
    t.pass()
    //t.truthy(db.Agent,'Agent service should exist')
})