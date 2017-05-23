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

        var marker = new google.maps.Marker({
          position: {lat: 42.346779, lng: -71.093696},
          map: map,
          title: 'First Marker!'
        });

        var neighbors = [
          {
            name: 'Wang Dudu',
            location: '1404 Commonwealth'
          }
        ]

        var geocoder = new google.maps.Geocoder();

        var bounds = new google.maps.LatLngBounds();
        bounds.extend(map.getCenter());
        map.fitBounds(bounds);

        geocoder.geocode(
            { address: neighbors[0].location,
              componentRestrictions: {locality: 'Boston'}
            }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  title: 'First Marker!'
                });

                bounds.extend(results[0].geometry.location);
                map.fitBounds(bounds);

              } else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
              }
            }
        );
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