import React, {Component} from 'react';

export default class extends Component {

    shouldComponentUpdata() {
        return false;
    }

    componentDidMount() {
        var map;
        map = new google.maps.Map( this.refs.map, {
            center: {lat: this.props.lat, lng: this.props.lng},
            zoom: 15
        });

        var homemarker = new google.maps.Marker({
          position: {lat: 42.346779, lng: -71.093696},
          map: map,
          title: 'Home'
        });

        var homeinfowindow = new google.maps.InfoWindow({
          content: "Home"
        });

        homemarker.addListener('click', function() {
          populateInfoWindow(homemarker, homeinfowindow);
        })

        // var neighbors = [
        //   {
        //     name: 'Wang Dudu',
        //     location: '1404 Commonwealth'
        //   }
        // ]

        var geocoder = new google.maps.Geocoder();

        var infowindow = new google.maps.InfoWindow();

        var info = this.props.neighbors[0].name + ' ' + this.props.neighbors[0].location;

        var bounds = new google.maps.LatLngBounds();
        bounds.extend(map.getCenter());
        map.fitBounds(bounds);

        geocoder.geocode(
            { address: this.props.neighbors[0].location,
              componentRestrictions: {locality: 'Boston'}
            }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  title: info
                });

                marker.addListener('click', function() {
                  populateInfoWindow(marker, infowindow);
                });

                bounds.extend(results[0].geometry.location);
                map.fitBounds(bounds);

              } else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
              }
            }
        );

        function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
          infowindow.setContent('');
          infowindow.marker = marker;
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
          var streetViewService = new google.maps.StreetViewService();
          var radius = 50;
          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                document.getElementById('pano').style.width = "200px";
                document.getElementById('pano').style.height = "200px";
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 30
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>No Street View Found</div>');
            }
          }

          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

          infowindow.open(map, marker);
        }
      }
    }

  render() {
    return (
      <div id="map" ref="map" style={{
          position: 'absolute',
          bottom: '0px',
          left: '231px',
          right: '0px',
          height: '100%'}}/>
    );
  }
}