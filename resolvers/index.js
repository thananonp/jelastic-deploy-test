const stationResolver = require('./stationResolver.js');
const connectionResolver = require('./connectionResolver.js')
const levelResolver = require('./levelResolver')

module.exports = [stationResolver, connectionResolver, levelResolver]