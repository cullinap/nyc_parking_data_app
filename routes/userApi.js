const express = require("express");
const router = express.Router();
const data = require("../data");
const tickets = data.apiData;

router.route("/plate/:id").get(async (req, res) => {
    try {
        const licPlate = req.params.id
        const getPlateData = await tickets.getParkingDataByLic(licPlate);
        res.json(getPlateData);
    } catch(e) {
        res.status(404).json({error: e})
    }
});

router.route("/total/:id").get(async (req, res) => {
    try {
        const licPlate = req.params.id
        const getTotalCost = await tickets.getTotalCost(licPlate);
        res.json(getTotalCost);
    } catch(e) {
        res.status(404).json({error: e})
    }
});


module.exports = router;