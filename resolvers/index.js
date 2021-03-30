const stationResolver = require('./stationResolver.js');
const connectionResolver = require('./connectionResolver.js')
const levelResolver = require('./levelResolver')
const currentResolver = require('./currentTypeResolver')
const connectionTypeResolver = require('./connectionTypeResolver')

module.exports = [stationResolver, connectionResolver, levelResolver, currentResolver,
    connectionTypeResolver]