import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, BrowserXhr } from '@angular/http';
import {MaterialModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {environment} from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import {INIT_CONFIG, APP_CONFIG} from './config';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SwipeComponent } from './components/swipe/swipe.component';

import 'hammerjs';

import { AppComponent } from './app.component';
import { SomeComponent } from './components/some.component';
import { AnotherComponent } from './components/test-component/another.component';
import { PlaceTypesMenuComponent } from './components/place-types-menu.component';
import { PlaceTypesSelectComponent } from './components/place-types-select.component';
import { PlaceDetailComponent } from './components/place-detail.component';
import { DialogComponent } from './components';
//import { ChoiceComponent } from './choice/choice.component';
import { ChoiceModule } from './choice/choice.module';
import { VisualizationComponent } from './visualizations/visualization.component';
import { MapParametersService, 
         StorageService,
         PlaceDetailsResolverService,
         SelectedPlaceTypeService,
         WindowRefService, 
         RandomTypeRedirectionService,
         GeolocationService,
         PlaceTypeResolverService } from './services';
import { GooglePlacesService } from './google-places.service';
import { HourlyDataService } from './hourly-data.service';
import { GooglePlacesNearbySearchService } from './services';
import { GooglePlacesRadarSearchService } from './services';
import { MapComponent } from './components/map/map.component';
import { EstablishmentsService } from './establishments.service';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { PlaceComponent } from './components/place/place.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  centeredSlides: true,
  keyboardControl: true
};

@NgModule({
  declarations: [
  AppComponent,
  DialogComponent,
  PlaceDetailComponent,
  VisualizationComponent,
  SomeComponent,
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
    ChoiceModule,
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
