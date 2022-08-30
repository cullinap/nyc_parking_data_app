
$(document).ready(function() {
	const nycdatalink = "https://data.cityofnewyork.us/resource/nc67-uf89.json";
	
	function unique(arr) {
		return $.grep(arr, function(el, index) {
				return index === $.inArray(el, arr)
		});
	}
	
	$('#searchform').submit(function(event){
		event.preventDefault();
		let search_term = $('#search_plate').val().trim();
		let plate = search_term.toUpperCase();
		
    	let licenseQueryStr = "?plate=";
		let fullUrl = nycdatalink + licenseQueryStr + plate;
		
		$.getJSON(fullUrl, function(data) {
			let paymentAmount = 0;
			let dates = []
			let years = []
			$('#totalAmount').empty();
			$('#minDate').empty();
			$('#maxDate').empty();
			$('#ticketYears').empty();

			for(const [key,value] of Object.entries(data)) {
				paymentAmount += +value['payment_amount'];
			}	  
			for(const [key,value] of Object.entries(data)) {
				dates.push(new Date(value['issue_date'])) 
			}

		    let minDate = new Date(Math.min.apply(null,dates))		
			let maxDate = new Date(Math.max.apply(null,dates))

			$('#totalAmount').append(paymentAmount);
			$('#minDate').append('Your first ticket was on: ' + minDate.toDateString());
			$('#maxDate').append('Your most recent ticket was on: ' + maxDate.toDateString());
			
			for(var [key,value] of Object.entries(dates)) {
				years.push(value.getFullYear())
			}
			
			let ticketYears = unique(years).sort()
		
			let allYearsAmount = {}	
			for(year of ticketYears){
				let yearAmount = 0 
				for(var [key,value] of Object.entries(data)) {
					tmp = new Date(value['issue_date'])
					if (tmp.getFullYear() == year) {
						yearAmount += +value['payment_amount']	
					}
				}
				allYearsAmount[year] = yearAmount;
			}

			$('#ticketYears').append(`<p>Breakdown By Year</p>`)
			for(const [key, value] of Object.entries(allYearsAmount)){
				$('#ticketYears')
				.append(
					`<li>${key}: $ ${value}</li>`				
				)
			}
			
		});
	})	
})


