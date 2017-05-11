import { Component, OnInit } from '@angular/core';
import {MdIconRegistry, MdDialog, MdDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component2.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  isDarkTheme = false;
	markers: any[] = [];

	constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
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

		// Try HTML5 geolocation.
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function(position) {
				const pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				console.log({lat: pos.lat, lng: pos.lng});
				thiz.lat = pos.lat;
				thiz.lng = pos.lng;
				thiz.markers.push({lat: pos.lat, lng: pos.lng, draggable: false});

				/*
				infoWindow.setPosition(pos);
				infoWindow.setContent('Location found.');
				infoWindow.open(map);
				map.setCenter(pos);
				*/
			}, function() {
			});
		} else {
			console.log('Browser doesnt support Geolocation');
		}
  }


}
