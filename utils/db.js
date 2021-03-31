//module is in strict mode by default ;)
const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true,
            });
        console.log('DB connected successfully');
    } catch (e) {
        console.log('Connection to db failed: ' + e);
    }
})();


module.exports = mongoose.connection;
