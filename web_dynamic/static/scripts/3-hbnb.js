$( document ).ready(function(){
	let amenities = []
	let amenity_names = []
	//let amenity_names = $('.amenities h4')
	$('input[type="checkbox"]').change(function() {
		if($(this).is(':checked')) {
			amenities.push($(this).data("id"))
			amenity_names.push($(this).data("name"))
		}
		else {
			amenities.pop($(this).data("id"))
			amenity_names.pop($(this).data("name"))
		}
		for (let index = 0; index < amenities.length; index++){
			console.log(amenities[index])
		}
		$('.amenities h4').text(amenity_names)
	})
	$.get('http://0.0.0.0:5001/api/v1/status/', function(response) {
		if (response.status === 'OK') {
			$('#api_status').addClass('available')
		} else {
			$('#api_status').removeClass('available')
		}
	}).fail(function(xhr, status, error) {
		console.error(error)
	})
	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({}),
		success: (response_data) => {
			response_data.forEach((place) => 
				$('section.places').append(
					`
					<article>
					  <div class="title_box">
			                    <h2>${place.name}</h2>
			                    <div class="price_by_night">$${place.price_by_night}</div>
			                  </div>
			                  <div class="information">
			                    <div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					    }</div>
			                    <div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					  }</div>
			                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					  }</div>
			                  </div> 
			                  <div class="description">
			                  ${place.description}
			                  </div>
					</article>
					`
				)
			);
		},
		error: function(xhr, status, error) {
			console.error(error)
		},
	});
});

