import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, BrowserXhr } from '@angular/http';
import { MaterialModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ChartsModule } from 'ng2-charts';
import 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  centeredSlides: true,
  keyboardControl: true
};

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}


import { environment} from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { INIT_CONFIG, APP_CONFIG} from './config';

import { AppComponent } from './app.component';
import {BogusComponent,
        AnotherComponent,
        SwipeComponent, 
        MapComponent,
        PlaceDetailsComponent,
        PlaceComponent,
        StarRatingComponent,
        PlaceTypesMenuComponent,
        PlaceTypesSelectComponent,
        DialogComponent } from './components';

import { MapParametersService, 
         StorageService,
         PlaceDetailsResolverService,
         SelectedPlaceTypeService,
         WindowRefService, 
         GooglePlacesNearbySearchService,
         GooglePlacesRadarSearchService, 
         RandomTypeRedirectionService,
         GeolocationService,
         PlaceTypeResolverService } from './services';
import { GooglePlacesService } from './google-places.service';
import { HourlyDataService } from './hourly-data.service';
import { EstablishmentsService } from './establishments.service';


@NgModule({
  declarations: [
  AppComponent,
  DialogComponent,
  BogusComponent,
  AnotherComponent,
  PlaceTypesMenuComponent,
  PlaceTypesSelectComponent,
  SwipeComponent,
  MapComponent,
  PlaceDetailsComponent,
  PlaceComponent,
  StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule,
		JsonpModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
		SwiperModule.forRoot(SWIPER_CONFIG),
		AgmCoreModule.forRoot({
      apiKey: environment.google_maps_api_key,
      libraries: ['places']
    }),
    AppRoutingModule,
  ],
	providers: [ { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }, 
               { provide: APP_CONFIG, useValue: INIT_CONFIG },
                GooglePlacesService, 
                WindowRefService,
                MapParametersService,
                PlaceTypeResolverService,
                RandomTypeRedirectionService,
                PlaceDetailsResolverService,
                StorageService,
                SelectedPlaceTypeService,
                GooglePlacesNearbySearchService,  
                GooglePlacesRadarSearchService,  
                HourlyDataService,
                GeolocationService,
                EstablishmentsService,
                ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
