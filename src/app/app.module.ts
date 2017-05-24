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
import { PlaceDetailComponent } from './components/place-detail.component';
import { DialogComponent } from './dialog/dialog.component';
import { ChoosePlaceTypeDialogComponent } from './dialog/choose-place-type-dialog.component';
//import { ChoiceComponent } from './choice/choice.component';
import { ChoiceModule } from './choice/choice.module';
import { VisualizationComponent } from './visualizations/visualization.component';
import { BarChartDemoComponent } from './visualizations/bar-chart-demo.component';
import { MapParametersService, 
         PlaceDetailsResolverService,
         PlaceTypeResolverService } from './services';
import { GeoLocationService } from './geolocation.service';
import { GooglePlacesService } from './google-places.service';
import { HourlyDataService } from './hourly-data.service';
import { GooglePlacesRadarSearchService } from './google-places-radar-search.service';
import { GooglePlacesNearbySearchService } from './google-places-nearby-search.service';
import { SelectedPlaceTypeService } from './selected-place-type.service';
import { MapComponent } from './components/map/map.component';
import { EstablishmentsService } from './establishments.service';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { PlaceComponent } from './components/place/place.component';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true,
  keyboardControl: true
};

@NgModule({
  declarations: [
  AppComponent,
  DialogComponent,
  ChoosePlaceTypeDialogComponent,
  PlaceDetailComponent,
  VisualizationComponent,
  SomeComponent,
  AnotherComponent,
  PlaceTypesMenuComponent,
  SwipeComponent,
  BarChartDemoComponent,
  MapComponent,
  PlaceDetailsComponent,
  PlaceComponent
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
                MapParametersService,
                PlaceTypeResolverService,
                PlaceDetailsResolverService,
                SelectedPlaceTypeService,
                GooglePlacesRadarSearchService,  
                GooglePlacesNearbySearchService,  
                HourlyDataService,
                GeoLocationService,
                EstablishmentsService,
                ],
  entryComponents: [DialogComponent, ChoosePlaceTypeDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
