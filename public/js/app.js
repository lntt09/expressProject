const mongoose = require('mongoose');
const Venue = require('../../models/venues')

console.log("Hello there up and running")

const bar = function myFunction(vid) {
    str = vid
    const res = str.substr(17, 11);
    console.log(res)
    return res

  }
//bar("https://youtu.be/3Jz18kXCLwg")


///GEOLOCATION....still attempting to retrieve data from MongoDB
var geocoder;
var map;
// var streetAddress = Venue.streetAddress;
// var city = Venue.city;
// var state = Venue.state;
// var zipcode = Venue.zipcode;
// var address = Venue.venues.streetAddress + ' ' + venues.city + ', '+ venues.state + ' ' + venues.zipcode;

// var address = ${'req.params.streetAddress'} + req.params.city + req.params.state
var address = "Atlanta, GA";



function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var myOptions = {
    zoom: 8,
    center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  if (geocoder) {
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);
          console.log("message");

          var infowindow = new google.maps.InfoWindow({
            content: '<b>' + address + '</b>',
            size: new google.maps.Size(150, 50)
          });

          var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: address
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });

        } else {
          alert("No results found");
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
 // google.maps.event.addDomListener(window, 'load', initialize);
}



module.exports= bar;
module.exports = map;
module.exports = geocoder;