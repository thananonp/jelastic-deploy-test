const stationResolver = require('./stationResolver.js');
const connectionResolver = require('./connectionResolver.js')
const levelResolver = require('./levelResolver')
const currentResolver = require('./currentResolver')

module.exports = [stationResolver, connectionResolver, levelResolver, currentResolver]