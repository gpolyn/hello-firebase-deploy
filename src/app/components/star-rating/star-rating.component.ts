import { Input, Component, ChangeDetectionStrategy } from '@angular/core';

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
export class StarRatingComponent {

  @Input() 
  set rating(rat: number){
    if (rat === undefined) return;
    const decimal = rat % 1;  
    this.halfStar = decimal > 0;
    this.wholeStars = new Array(Math.floor(rat));
  }

  private wholeStars: any[];
  private halfStar: boolean;

}
