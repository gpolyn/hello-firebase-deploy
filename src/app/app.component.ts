import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import {MdIconRegistry, MdDialog, MdDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';
import { MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import {EstablishmentsService} from './establishments.service';
declare var google: any;

@Component({
  selector: 'app-root',
	providers: [GoogleMapsAPIWrapper, EstablishmentsService],
  templateUrl: './app.component.html',
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
              private establishmentsSvc: EstablishmentsService,  
							private gmapsApi: GoogleMapsAPIWrapper,
							private mapsAPILoader: MapsAPILoader) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
    establishmentsSvc.getCurrentSelection().subscribe( selection => {
      console.log('current selection', selection);
    })
  }

  ngAfterViewInit() {
  }

  private openAdminDialog() {
		this.dialog.open(DialogComponent).afterClosed()
  }

  clickedMarker($event: any) {
    console.log('clicked marker', $event)
    this.establishmentsSvc.setCurrentSelection({place_id: $event});
  }

	mapClicked($event: MouseEvent) {
		console.log('click', $event);
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
          const srch = new Promise((resolve, reject) => {
            service.nearbySearch(request, (results, status, pagination) => { 

              if (status === 'OK'){

                const promises = [];

                results.forEach( result => {

                  bounds.extend(result.geometry.location);
                  thiz.markers.push({place_id: result.place_id, lat: result.geometry.location.lat(), lng: result.geometry.location.lng() });

                }); // forEach

								resolve(thiz.markers);

              } else {
								reject;
              }
            });

          });

					srch.then((data) => {
            console.log('markers', thiz.markers);
						thiz.latLngBounds = bounds;
            thiz.markers.push({lat: pos.lat, lng: pos.lng, draggable: false});
          });

          //thiz.markers.push({lat: pos.lat, lng: pos.lng, draggable: false});

        }, function() {
        });
      } else {
        console.log('Browser doesnt support Geolocation');
      }
    })

  }


}
