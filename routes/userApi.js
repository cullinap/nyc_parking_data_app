const express = require("express");
const router = express.Router();
const data = require("../data");
const tickets = data.apiData;

router.get('/', async (req, res) => {
    try {
        res.render('tickets/search', {title: 'Ticket Finder'})
    } catch(e) {
        res.status(404).json({error: 'Not Found'})
    }
})

router.post('/searchplates', async (req, res) => {
    try {
        const licPlate = req.body.showSearchTerm;
        const getTotalCost = await tickets.getTotalCost(licPlate);

        res.render('tickets/searchresults', {
            title: 'total cost',
            cost: getTotalCost
        })

    } catch(e) {
        res.status(404).json({error: e})
    }

})

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
        res.render('tickets/index', {
            title: 'total cost',
            cost: getTotalCost
        })
    } catch(e) {
        res.status(404).json({error: e})
    }
});


module.exports = router;