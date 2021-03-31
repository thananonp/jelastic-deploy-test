const Level = require('../models/Levels')

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