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
});

