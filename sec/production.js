const production = (app, port) => {

    console.log("Production Environment")
    console.log(`Access the website at port:${port}`)
    app.enable('trust proxy');

    app.use((req, res, next) => {
        if (req.secure) {
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
    });

    app.listen(port);
};

module.exports = production;
