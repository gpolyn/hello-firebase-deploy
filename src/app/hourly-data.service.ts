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
      if (!( period.open && period.open.time ) || !( period.close && period.close.time )) return;
      const open = Math.floor(Number.parseInt(period.open.time)/100.0);
      const close = Math.floor(Number.parseInt(period.close.time)/100.0);
      const totalHours = close - open;
      const maxVal = 35;
      const getRandInt = () => { return Math.floor(Math.random() * maxVal);};
      for (let i = 0; i < totalHours; i++){
        newData.hourlyValueLabels.push(open + i);
        newData.hourlyValues.push(getRandInt());
      }
			newData.hourlyValueLabels = this.convertHourLabels(newData.hourlyValueLabels);
      data[day] = newData;
    });
    return data;
  }

  private convertHourLabels(hourLabels: number[]): string[] {
		const len = hourLabels.length;
   	const converted = new Array(len); 
		converted[0] = this.formatTime(hourLabels[0], true);
		for ( let i = 1; i < len - 1; i++) {
			converted[i] = this.formatTime(hourLabels[i]);
		}
		converted[len - 1] = this.formatTime(hourLabels[len - 1], true);
    return converted;
  }

  private formatTime(hour24: number, addMeridian: boolean = false) {

    let h = hour24 % 12;
    if (h === 0) h = 12;
		if (h == 12) addMeridian = true;
		let hStr = '' + h;

		if (addMeridian) {
			hStr = hStr + (hour24 < 12 ? 'am' : 'pm');
		} 

		return hStr;
	}
  
}
