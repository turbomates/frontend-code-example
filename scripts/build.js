const webpack = require('webpack')
const config = require('../webpack.config.staging')

const STAGE = process.argv[2] || 'dev'

webpack(config(STAGE)).run()