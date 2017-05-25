import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'star-rating',
  template: `
    <span>
      <md-icon *ngFor='let star of wholeStars'>star</md-icon>
      <md-icon *ngIf='halfStar'>star_half</md-icon>
    </span>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent implements OnInit {

  @Input() 
  set rating(rat: number){
    const decimal = rat % 1;  
    this.halfStar = decimal > 0;
    this.wholeStars = new Array(Math.floor(rat));
  }

  private wholeStars: any[];
  private halfStar: boolean;

  ngOnInit() { }

}
