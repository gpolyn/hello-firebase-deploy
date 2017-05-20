import { Component } from '@angular/core';
import { EstablishmentsService } from '../establishments.service';

@Component({
  selector: 'bar-chart-demo',
	host: {class: 'myClass'},
  styleUrls: ['./visualization.component.css'],
  //templateUrl: './bar-chart-demo.html'
  templateUrl: './place-info.html'
})
export class BarChartDemoComponent {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  public currentDay: string = '';
  private currentSelectedDayDigit: number;
  public barChartData: any[] = [];
  private dayLabels = [
    'Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday',
    'Friday',
    'Saturday'
  ];

  public currentBarChartData = [this.barChartData[0]];
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  private currentSelection$: any;
  currentPlaceName: string = '';
  rating: string = '';

  constructor(private establishmentsSvc: EstablishmentsService){
    this.currentSelectedDayDigit = (new Date()).getDay();
    establishmentsSvc.getCurrentSelection().subscribe( est => {

      this.currentSelection$ = est.hourlyData;
      console.log(est);
      this.currentPlaceName = est.name;
      this.rating = est.rating;

      if (this.currentSelection$ !== undefined){
        console.log('selection', this.currentSelection$);
        const newData = this.currentSelection$.map( data => this.convertData(data) );
        this.barChartData.length = 0;
        this.barChartData = newData;
        this.currentDay = this.barChartData[this.currentSelectedDayDigit].label;
        /*
        if (this.barChartData[this.currentSelectedDayDigit].hasData){
          this.barChartData = newData;
        } 
        */
        
        console.log('new data', this.barChartData);
      }

    });
  }

  selectionMade(): boolean {
    if (this.currentSelection$ !== undefined) {
      return true;
    }
    return false;
  }

  private convertData(dailyData: any){
    const data = {hasData: dailyData.hasData, data: dailyData.hourlyValues, label: dailyData.label, labels: dailyData.hourlyValueLabels, visible: dailyData.isToday};
    if (dailyData.isToday && dailyData.hasData) {
      this.barChartLabels = dailyData.hourlyValueLabels;
      this.currentBarChartData = [data];
    }
    return data;
  }


  swipe(currentIndex: number, action: string = this.SWIPE_ACTION.RIGHT) {
    console.log('currentIndex', currentIndex, action);
    if (currentIndex > this.barChartData.length || currentIndex < 0) return;

    let nextIndex = 0;
    
    // next
    if (action === this.SWIPE_ACTION.LEFT) {
        const isLast = currentIndex === this.barChartData.length - 1;
        nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // previous
    if (action === this.SWIPE_ACTION.RIGHT) {
        const isFirst = currentIndex === 0;
        nextIndex = isFirst ? this.barChartData.length - 1 : currentIndex - 1;
    }

    // toggle avatar visibility
    this.barChartData.forEach((x, i) => x.visible = (i === nextIndex));
    this.currentBarChartData = [this.barChartData[nextIndex]];
    this.currentSelectedDayDigit = nextIndex;
    this.currentDay = this.dayLabels[nextIndex];
    // console.log('current data', this.currentBarChartData);
  }

  private showVisibleData() {
  }

  // events
  public chartClicked(e:any):void {
  //console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
