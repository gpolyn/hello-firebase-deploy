import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {environment} from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';

import 'hammerjs';

import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { ChoiceComponent } from './choice/choice.component';

@NgModule({
  declarations: [
  AppComponent,
  DialogComponent,
  ChoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
		AgmCoreModule.forRoot({
      apiKey: environment.google_maps_api_key,
      libraries: ['places']
    }),
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
