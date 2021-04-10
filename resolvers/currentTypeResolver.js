const Current = require('../models/currentType')

module.exports = {
    Query:{
        currenttypes: (parent, args) => {
            return Current.find()
        }
    },
    Connections: {
        CurrentTypeID(parent) {
            // console.log(parent)
            return Current
                .findById(parent.CurrentTypeID)
        }
    }
}