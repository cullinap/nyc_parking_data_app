
$(document).ready(function() {
	const nycdatalink = "https://data.cityofnewyork.us/resource/nc67-uf89.json";
	
	$('#searchform').submit(function(event){
		event.preventDefault();
		let search_term = $('#search_plate').val().trim();
		let plate = search_term.toUpperCase();
		
    	let licenseQueryStr = "?plate=";
		let fullUrl = nycdatalink + licenseQueryStr + plate;
		
		$.getJSON(fullUrl, function(data) {
			let paymentAmount = 0;
			let dates = []
			for(const [key,value] of Object.entries(data)) {
				paymentAmount += +value['payment_amount'];
			}	  
			for(const [key,value] of Object.entries(data)) {
				dates.push(new Date(value['issue_date'])) 
			}
		    let minDate = new Date(Math.min.apply(null,dates))		
			let maxDate = new Date(Math.max.apply(null,dates))
			console.log(minDate.toDateString());	
			$('#totalAmount').append(paymentAmount);
			$('#minDate').append(minDate);
		});
	})	
})


