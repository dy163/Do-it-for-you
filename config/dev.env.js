'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST: '"http://47.94.215.133/"'
})
  //环境ip  http://47.94.215.133/


