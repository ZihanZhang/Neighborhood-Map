import React, {Component} from 'react';

export default class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showcontact: true,
        map: null,
        markers: []
      }
    }

    componentWillReceiveProps(nextProps) {
      // if (this.state.showcontact) {
      //   if (!nextProps.showcontact) {
      //     this.setState({
      //       showcontact: false
      //     })
      //   }
      // }
      // else {
      //   if (nextProps.showcontact) {
      //     this.setState({
      //       showcontact: true
      //     })
      //   }
      // }
      if (nextProps.showcontact) {
        this.setState({
          showcontact: true
        })
      }
      else {
        this.setState({
          showcontact: false
        })
      };
    }

    componentDidUpdate() {
        var map = this.state.map;
        var showcontact = this.state.showcontact;
        var markers = this.state.markers;

        if (!showcontact) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null)
          }
        }
        else if (markers.length == 0){
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

            var geocoder = new google.maps.Geocoder();

            var infowindow = new google.maps.InfoWindow();

            var info = this.props.neighbors[0].name + ' ' + this.props.neighbors[0].location;

            var bounds = new google.maps.LatLngBounds();
            bounds.extend(this.state.map.getCenter());
            map.fitBounds(bounds);

            var marker = null

            geocoder.geocode(
                { address: this.props.neighbors[0].location,
                  componentRestrictions: {locality: 'Boston'}
                }, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    marker = new google.maps.Marker({
                      position: results[0].geometry.location,
                      map: map,
                      title: info
                    });

                    marker.addListener('click', function() {
                      populateInfoWindow(marker, infowindow);
                    });

                    markers.push(marker)

                    bounds.extend(results[0].geometry.location);
                    map.fitBounds(bounds);

                  } else {
                    window.alert('We could not find that location - try entering a more' +
                        ' specific place.');
                  }
                }
            );
            
            markers.push(homemarker)


            this.setState({
              markers: markers
            })
        }
        else {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map)
          }
        }


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

//should put all map initialization in this method. define a variable map and did all other stuff.
//Finally set the state and the map will be open
    componentDidMount() {
        // var map;
        // map = new google.maps.Map( this.refs.map, {
        //     center: {lat: this.props.lat, lng: this.props.lng},
        //     zoom: 15
        // });
        this.setState({
          map: new google.maps.Map( this.refs.map, {
            center: {lat: this.props.lat, lng: this.props.lng},
            zoom: 15
          }),
          function(){console.log("ssdfs")}
        })
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