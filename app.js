const tickets = require("./tickets")

async function testLicensePlateDataRetrieval() {
    try {
        let getPlateData = await tickets.getParkingDataByLic('EDU7310')
        console.log(getPlateData)
    } catch(e) {
        console.log(e)
    }
}

async function testTotalAmountByLicPlate() {
    try {
        let getTotalCost = await tickets.getTotalCost('EDU7310')
        console.log(getTotalCost)
    } catch(e) {
        console.log(e)
    }
}

//testLicensePlateDataRetrieval() 
testTotalAmountByLicPlate() 