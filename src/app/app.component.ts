import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import {MdIconRegistry, MdDialog, MdDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';
import { MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
declare var google: any;

@Component({
  selector: 'app-root',
	providers: [GoogleMapsAPIWrapper],
  templateUrl: './app.component2.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild('agmMap') ag: any;
  latLngBounds: any;
  lat: number = 51.678418;
  lng: number = 7.809007;
  isDarkTheme = false;
	markers: any[] = [];

	constructor(iconRegistry: MdIconRegistry,
							sanitizer: DomSanitizer, 
							private dialog: MdDialog, 
							private gmapsApi: GoogleMapsAPIWrapper,
							private mapsAPILoader: MapsAPILoader) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
  }

  ngAfterViewInit() {
  }

  private openAdminDialog() {
		this.dialog.open(DialogComponent).afterClosed()
  }

  clickedMarker($event: MouseEvent) {
    console.log('clicked marker', $event)
  }

	mapClicked($event: MouseEvent) {
		console.log('click', $event);
		/*
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
		*/
  }

	ngOnInit(): void {

		const thiz = this;

    this.mapsAPILoader.load().then(() => {
  
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log({lat: pos.lat, lng: pos.lng});
          /*
          thiz.latLngBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(55.38942944437183, -2.7379201682812226),
            new google.maps.LatLng(54.69726685890506, -1.2456105979687226)
          );
          */

					var bounds = new google.maps.LatLngBounds();

          thiz.lat = pos.lat;
          thiz.lng = pos.lng;
          const container2 = document.createElement('div');
          const service = new google.maps.places.PlacesService(container2);
          const request = {
            location: new google.maps.LatLng(thiz.lat, thiz.lng),
						rankBy: google.maps.places.RankBy.DISTANCE,
            types: ['store']
          };
          service.nearbySearch(request, (results, status, pagination) => { 
            if (status === 'OK'){
              console.log('pagination',pagination);
              results.forEach( result => {
								console.log('result', result);

								bounds.extend(result.geometry.location);
								console.log(bounds.toJSON());

                service.getDetails({placeId: result.place_id}, (place, status) => {
                  if (status == google.maps.places.PlacesServiceStatus.OK) {
										console.log(place);
									}
                }); 

                thiz.markers.push({lat: result.geometry.location.lat,
                                   lng: result.geometry.location.lng
                });
              });
            } else {
              console.log('something wrong with places request!')
            }
          });

          thiz.markers.push({lat: pos.lat, lng: pos.lng, draggable: false});
        }, function() {
        });
      } else {
        console.log('Browser doesnt support Geolocation');
      }
    })

  }


}
