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

async function getFirstOffence(licensePlate) {
	let formatPlate = forceUpperCase(licensePlate);
	
	let apiData = await getApiData(formatPlate);

	let dates = []
	for (const [key,value] of Object.entries(apiData)) {
		dates.push(new Date(value['issue_date']))
	}

	let maxDate = new Date(Math.max.apply(null,dates));
	let minDate = new Date(Math.min.apply(null,dates));

	return [minDate, maxDate]
}

//async function 



// individual data
// get highest amount
// map of where fines occurred 
// output to csv
// by time of day 

// total data: "dumb querying"
// total ticket revenue gen'd by year
// person with most fines (don't display lic plate)
// chloropleth map of fines
// support for api key (to get more data)
// output to csv

// prediction support 
// where you are most likely to get ticketed
// what time you are most likely to get ticketed

// UI: enter data into UI and get back info


module.exports = {
  getParkingDataByLic,
  getTotalCost,
  getFirstOffence
};
