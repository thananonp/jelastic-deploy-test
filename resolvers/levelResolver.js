const Level = require('../models/Levels')

module.exports = {
    Query: {
        leveltypes: (parent, args) => {
            return Level.find()
        }
    },
    Connections: {
        LevelType(parent) {
            // console.log(parent)
            return Level
                .findById(parent.LevelID)
                .then(level => level)
                .catch(e => {
                    console.error(e)
                    return e
                })
        }
    }
}