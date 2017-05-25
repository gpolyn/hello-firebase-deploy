import { Component, ViewChild } from '@angular/core';

import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  //moduleId: module.id + '',
  selector: 'swipe',
  templateUrl: 'swipe.component.html',
  styleUrls: ['swipe.component.css']
})
export class SwipeComponent {
  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  public type: string = 'component';

	public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
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

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  onIndexChange(index: number) {
    console.log('Swiper index: ' + index);
		this.currentBarChartData = [this.barChartData[index]];
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }


}
