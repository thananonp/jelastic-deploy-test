const stationResolver = require('./stationResolver.js');
const connectionResolver = require('./connectionResolver.js')
const levelResolver = require('./levelResolver')
const currentResolver = require('./currentTypeResolver')
const connectionTypeResolver = require('./connectionTypeResolver')
const userResolver = require('./userResolver')

module.exports = [stationResolver, connectionResolver, levelResolver, currentResolver,
    connectionTypeResolver,userResolver]