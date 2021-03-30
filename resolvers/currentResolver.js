const Current = require('../models/CurrentTypes')

module.exports = {
    Connections: {
        CurrentType(parent) {
            console.log(parent)
            return Current
                .findById(parent.CurrentTypeID)
                .then(current => current)
                .catch(e => {
                    console.error(e)
                    return e
                })
        }
    }
}