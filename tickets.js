const axios = require("axios");
const nycTicketDataUrl =
  "https://data.cityofnewyork.us/resource/nc67-uf89.json";

function forceUpperCase(str) {
  split_str = str.split("");
  updatedPlate = [];
  for (let char of split_str) {
    if (char.match(/[a-z]/i)) {
      updatedPlate.push(char.toUpperCase());
    } else {
      updatedPlate.push(char);
    }
  }

  return updatedPlate.join("");
}

async function getApiData(licensePlate) {
  licenseQueryStr = "?plate=";
  fullUrl = nycTicketDataUrl + licenseQueryStr + licensePlate;
  let { data } = await axios.get(fullUrl);
  return data;
}

async function getParkingDataByLic(licensePlate) {
  let formatPlate = forceUpperCase(licensePlate);

  let apiData = await getApiData(formatPlate);

  return apiData;
}

async function getTotalCost(licensePlate) {
  let formatPlate = forceUpperCase(licensePlate);

  let apiData = await getApiData(formatPlate);
  
  let paymentAmount = 0
  for (const [key,value] of Object.entries(apiData)) {
    paymentAmount += +value["payment_amount"] 
    
  }

  return paymentAmount;
}


module.exports = {
  getParkingDataByLic,
  getTotalCost
};
