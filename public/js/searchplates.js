
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
			for(const [key,value] of Object.entries(data)) {
				paymentAmount += +value['payment_amount'];
			}	  
			console.log(paymentAmount);	
			$('#totalAmount').append(paymentAmount);
		});
	})	
})


