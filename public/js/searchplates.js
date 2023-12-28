$(document).ready(function () {
  const nycdatalink = "https://data.cityofnewyork.us/resource/nc67-uf89.json";

  function unique(arr) {
    return $.grep(arr, function (el, index) {
      return index === $.inArray(el, arr);
    });
  }

  $("#searchform").submit(function (event) {
    event.preventDefault();
    let search_term = $("#search_plate").val().trim();
    let plate = search_term.toUpperCase();

    let licenseQueryStr = "?plate=";
    let fullUrl = nycdatalink + licenseQueryStr + plate;

    $.getJSON(fullUrl, function (data) {
	  let fineAmount = 0;
	  let penaltyAmount = 0;
	  let interestAmount = 0;
	  let reductionAmount = 0;
	  let paymentAmount = 0;
	  let totalDueAmount = 0;
      let dates = [];
      let years = [];

      $('#totalFineAmaount').empty();
	  $('#totalPenaltyAmount').empty();
	  $('#totalInterestAmount').empty();
	  $('#totalReductionAmount').empty();
	  $("#totalAmount").empty();
	  $("#totalDueAmount").empty();
      $("#minDate").empty();
      $("#maxDate").empty();
      $("#ticketYears").empty();
	  $("#fineYears").empty();
	  $("#penaltyYears").empty();
	  $("#reductionYears").empty();

	  for (const [key, value] of Object.entries(data)) {
        fineAmount += +value["fine_amount"];
      }
	  for (const [key, value] of Object.entries(data)) {
        penaltyAmount += +value["penalty_amount"];
      }
	  for (const [key, value] of Object.entries(data)) {
        interestAmount += +value["interest_amount"];
      }
	  for (const [key, value] of Object.entries(data)) {
        reductionAmount += +value["reduction_amount"];
      }
      for (const [key, value] of Object.entries(data)) {
        paymentAmount += +value["payment_amount"];
      }
      for (const [key, value] of Object.entries(data)) {
        totalDueAmount += +value["amount_due"];
      }
      for (const [key, value] of Object.entries(data)) {
        dates.push(new Date(value["issue_date"]));
      }

      let minDate = new Date(Math.min.apply(null, dates));
      let maxDate = new Date(Math.max.apply(null, dates));
	  
	  $('#totalFineAmaount').append(
		"You've been fined a total of: $" + fineAmount.toLocaleString()
	  )
	  $('#totalPenaltyAmount').append(
		"You've incurred a total penalty amount of: $" + penaltyAmount.toLocaleString()
	  )
	  $('#totalInterestAmount').append(
		"You've incurred a total interest amount of: $" + interestAmount.toLocaleString()
	  )
	  $('#totalReductionAmount').append(
		"You've incurred a total reduction amount of: $" + reductionAmount.toLocaleString()
	  )
      $("#totalAmount").append(
        "You've paid a total of: $" + paymentAmount.toLocaleString()
      );
      $("#totalDueAmount").append(
        "You have a total due of: $" + totalDueAmount.toLocaleString()
      );
      $("#minDate").append(
        "Your first ticket was on: " + minDate.toDateString()
      );
      $("#maxDate").append(
        "Your most recent ticket was on: " + maxDate.toDateString()
      );
	  

      for (var [key, value] of Object.entries(dates)) {
        years.push(value.getFullYear());
      }

      let ticketYears = unique(years).sort();

      let allYearsAmount = {};
      for (year of ticketYears) {
        let yearAmount = 0;
        for (var [key, value] of Object.entries(data)) {
          tmp = new Date(value["issue_date"]);
          if (tmp.getFullYear() == year) {
            yearAmount += +value["payment_amount"];
          }
        }
        allYearsAmount[year] = yearAmount;
      }

	  let allYearsFines = {};
      for (year of ticketYears) {
        let yearAmount = 0;
        for (var [key, value] of Object.entries(data)) {
          tmp = new Date(value["issue_date"]);
          if (tmp.getFullYear() == year) {
            yearAmount += +value["fine_amount"];
          }
        }
        allYearsFines[year] = yearAmount;
      }

	  let allYearsPenalty = {};
      for (year of ticketYears) {
        let yearAmount = 0;
        for (var [key, value] of Object.entries(data)) {
          tmp = new Date(value["issue_date"]);
          if (tmp.getFullYear() == year) {
            yearAmount += +value["penalty_amount"];
          }
        }
        allYearsPenalty[year] = yearAmount;
      }

	  let allYearsReduction = {};
      for (year of ticketYears) {
        let yearAmount = 0;
        for (var [key, value] of Object.entries(data)) {
          tmp = new Date(value["issue_date"]);
          if (tmp.getFullYear() == year) {
            yearAmount += +value["reduction_amount"];
			console.log(yearAmount)
          }
        }
        allYearsReduction[year] = yearAmount;
      }

      $("#ticketYears").append(`<p>Payment breakdown by year</p>`);
      for (const [key, value] of Object.entries(allYearsAmount)) {
        $("#ticketYears").append(`<li>${key}: $${value.toLocaleString()}</li>`);
      }

	  $("#fineYears").append(`<p>Fine breakdown by year</p>`);
      for (const [key, value] of Object.entries(allYearsFines)) {
        $("#fineYears").append(`<li>${key}: $${value.toLocaleString()}</li>`);
      }

	  $("#penaltyYears").append(`<p>Penalty breakdown by year</p>`);
      for (const [key, value] of Object.entries(allYearsPenalty)) {
        $("#penaltyYears").append(`<li>${key}: $${value.toLocaleString()}</li>`);
      }

	  $("#reductionYears").append(`<p>reduction breakdown by year</p>`);
      for (const [key, value] of Object.entries(allYearsReduction)) {
        $("reductionYears").append(`<li>${key}: $${value.toLocaleString()}</li>`);
      }

    });
  });
});
