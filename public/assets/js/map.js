// This code of lines were added by Amer on June 11,2017 at 11:11pm
$("#submitSwapLocation").on("click", function(event){
	event.preventDefault();
	var map;             
	var swapLocation = $("#swapLocation").attr("data");
	console.log(swapLocation);
	initMap();
	
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: -34.397,
				lng: 150.644
			}, // end of center
			zoom: 8
		});

		var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + swapLocation + '&sensor=false;'

		    $.ajax({
		        url: queryURL,
		        method: "GET"
		    }).done(function(response) {
		        //create variables for latitude and longitude of user input
		        var userLat = response.results[0].geometry.location.lat;
		        var userLng = response.results[0].geometry.location.lng; 
		        var position = {lat: userLat, lng:userLng };
		     	 var marker = new google.maps.Marker({
		          position: position,
		          map: map
		        });
		     	map.setCenter(marker.getPosition());
		        });
	};// end of initMap
	$(".modal").fadeIn();
	$(".modal_main").show();

	$(".colse").click(function() {
		$(".modal").fadeOut();
		$(".modal_main").fadeOut();
	});//end of click
	initMap();
	//$("#map").addClass("mapClass");
});// end of on click
