const Level = require('../models/levelType')

module.exports = {
    Query: {
        leveltypes: (parent, args) => {
            return Level.find()
        }
    },
    Connections: {
        LevelID(parent) {
            return Level
                .findById(parent.LevelID)
        }
    }
}