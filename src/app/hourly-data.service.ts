import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {GooglePlacesService} from './google-places.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HourlyDataService {

  private day: number;
  private dayLabels = [
    'Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday',
    'Friday',
    'Saturday'
  ];

  constructor(){
    this.day = (new Date()).getDay();
  }

  extractHourlyData(googlePlaceData: any): any[] {
    const periods = googlePlaceData.opening_hours && googlePlaceData.opening_hours.periods;
    console.log('periods', periods)
    const data: any[] = [];
    for (let i = 0; i < 7; i++){
      data.push({hasData: false});
    }
    if (periods === undefined) return data;
    periods.forEach( period => {
      const newData = {hasData: true, isToday: false, hourlyValueLabels:[], label: '', hourlyValues:[]};
      const day = period.open.day;
      if (this.day === day) newData.isToday = true;
      newData.label = this.dayLabels[day];
      const open = Math.floor(Number.parseInt(period.open.time)/100.0);
      const close = Math.floor(Number.parseInt(period.close.time)/100.0);
      const totalHours = close - open;
      const maxVal = 35;
      const getRandInt = () => { return Math.floor(Math.random() * maxVal);};
      for (let i = 0; i < totalHours; i++){
        newData.hourlyValueLabels.push(open + i);
        newData.hourlyValues.push(getRandInt());
      }
      data[day] = newData;
    });
    return data;
  }
  
}
