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
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import 'hammerjs';

import { AppComponent } from './app.component';
import { SomeComponent } from './components/some.component';
import { PlaceDetailComponent } from './components/place-detail.component';
import { DialogComponent } from './dialog/dialog.component';
//import { ChoiceComponent } from './choice/choice.component';
import { ChoiceModule } from './choice/choice.module';
import { VisualizationComponent } from './visualizations/visualization.component';
import { BarChartDemoComponent } from './visualizations/bar-chart-demo.component';
import { EstablishmentsService } from './establishments.service';
import { GeoLocationService } from './geolocation.service';
import { GooglePlacesService } from './google-places.service';
import { HourlyDataService } from './hourly-data.service';
import { GooglePlacesRadarSearchService } from './google-places-radar-search.service';
import { GooglePlacesNearbySearchService } from './google-places-nearby-search.service';
import { SelectedPlaceTypeService } from './selected-place-type.service';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}


@NgModule({
  declarations: [
  AppComponent,
  DialogComponent,
  PlaceDetailComponent,
  VisualizationComponent,
  SomeComponent,
  BarChartDemoComponent
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
		AgmCoreModule.forRoot({
      apiKey: environment.google_maps_api_key,
      libraries: ['places']
    }),
    AppRoutingModule,
  ],
	providers: [ { 
									provide: HAMMER_GESTURE_CONFIG, 
									useClass: MyHammerConfig 
                  }, 
                  GooglePlacesService, 
                  SelectedPlaceTypeService,
                  GooglePlacesRadarSearchService,  
                  GooglePlacesNearbySearchService,  
                  HourlyDataService,
                  GeoLocationService,
                  EstablishmentsService],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
