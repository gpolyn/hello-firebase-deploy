import { Component } from '@angular/core';
import { EstablishmentsService } from '../establishments.service';

@Component({
  selector: 'bar-chart-demo',
	host: {class: 'myClass'},
  styleUrls: ['./visualization.component.css'],
  templateUrl: './bar-chart-demo.html'
})
export class BarChartDemoComponent {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', visible: true},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', visible: false},
    {data: [18, 41, 80, 69, 80, 47, 50], label: 'Series C', visible: false}
  ];

  public currentBarChartData = [this.barChartData[0]];
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  private currentSelection$: any;

  constructor(private establishmentsSvc: EstablishmentsService){
    establishmentsSvc.getCurrentSelection().subscribe( est => {

      this.currentSelection$ = est.hourlyData;

      if (this.currentSelection$ !== undefined){
        console.log('selection', this.currentSelection$);
        const newData = this.currentSelection$.map( data => this.convertData(data) );
        this.barChartData.length = 0;
        this.barChartData = newData;
        console.log('new data', this.barChartData);
      }

    });
  }

  private convertData(dailyData: any){
    const data = {data: dailyData.hourlyValues, label: dailyData.label, labels: dailyData.hourlyValueLabels, visible: dailyData.isToday};
    if (dailyData.isToday) {
      this.barChartLabels = dailyData.hourlyValueLabels;
      this.currentBarChartData = [data];
    }
    return data;
  }


  swipe(currentIndex: number, action: string = this.SWIPE_ACTION.RIGHT) {
    if (currentIndex > this.barChartData.length || currentIndex < 0) return;

    let nextIndex = 0;
    
    // next
    if (action === this.SWIPE_ACTION.RIGHT) {
        const isLast = currentIndex === this.barChartData.length - 1;
        nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // previous
    if (action === this.SWIPE_ACTION.LEFT) {
        const isFirst = currentIndex === 0;
        nextIndex = isFirst ? this.barChartData.length - 1 : currentIndex - 1;
    }

    // toggle avatar visibility
    this.barChartData.forEach((x, i) => x.visible = (i === nextIndex));
    this.currentBarChartData = [this.barChartData[nextIndex]];
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
