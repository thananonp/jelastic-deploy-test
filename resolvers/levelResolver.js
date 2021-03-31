const Level = require('../models/levelType')

module.exports = {
    Query: {
        leveltypes: (parent, args) => {
            return Level.find()
        }
    },
    Connections: {
        LevelType(parent) {
            return Level
                .findById(parent.LevelID)
        }
    }
}