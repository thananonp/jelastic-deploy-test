const chargeMapRouter = require('express').Router();
const chargemapController = require('../controllers/chargemapController')

chargeMapRouter
    .route('/stations/')
    .get(chargemapController.getStations)
    .post(chargemapController.addNewStation)
    .patch(chargemapController.editStation)

chargeMapRouter
    .route('/station/:id')
    .get(chargemapController.getStationById)
    .delete(chargemapController.deleteStationById)

module.exports = chargeMapRouter;
