import { Component, ViewChild, OnInit } from '@angular/core';
import { EstablishmentsService } from '../../establishments.service';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'swipe',
  templateUrl: 'swipe.component.html',
  styleUrls: ['swipe.component.css']
})
export class SwipeComponent implements OnInit {

  constructor(private establishmentsSvc: EstablishmentsService){}

	currentSelectedDayDigit: number = 0;
	dayLabel = 'Monday';
  private dayLabels = [
    'Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday',
    'Friday',
    'Saturday'
  ];

	public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
		scales: {
				yAxes: [{
						ticks: {
								callback: function(value, index, values) {
										return value + '%';
								}
						}
				}]
		},
		layout: {
				padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
				}
		}
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [65, 59, 8, 81, 6, 55, 40], label: 'Series C'},
    {data: [65, 59, 80, 81, 56, 5, 4], label: 'Series D'}
  ];

	currentBarChartData = [this.barChartData[0]];

  public config: SwiperConfigInterface = {
    scrollbar: null,
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbarHide: false,
    keyboardControl: true,
    mousewheelControl: true,
    scrollbarDraggable: true,
    scrollbarSnapOnRelease: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    //nextButton: '.swiper-button-next',
    //prevButton: '.swiper-button-prev'
  };

  @ViewChild(SwiperComponent) swiperView: SwiperComponent;
  private hourlyData$: any;

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  ngOnInit(){
    this.establishmentsSvc.getCurrentSelection().subscribe( est => {
      this.hourlyData$ = est.hourlyData;
      const newData = this.hourlyData$.map(this.convertData.bind(this));
      this.barChartData = newData;
    });
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  onIndexChange(index: number) {
    console.log('Swiper index: ' + index);
    this.currentSelectedDayDigit = index;
		this.currentBarChartData = [this.barChartData[index]];
		this.dayLabel = this.dayLabels[index];
  }

  private convertData(dailyData: any){
    const data = {
      hasData: dailyData.hasData, 
      data: dailyData.hourlyValues, 
      label: dailyData.label, 
      labels: dailyData.hourlyValueLabels, 
      visible: dailyData.isToday
    };

    if (dailyData.isToday && dailyData.hasData) {
      this.barChartLabels = dailyData.hourlyValueLabels;
      this.currentBarChartData = [data];
    }
    return data;
  }
 
}
