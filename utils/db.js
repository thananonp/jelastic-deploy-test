//module is in strict mode by default ;)
const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true,
            });
        return connection;
    } catch (e) {
        console.log('Connection to db failed: ' + e);
    }
};


module.exports = mongoose.connection;
