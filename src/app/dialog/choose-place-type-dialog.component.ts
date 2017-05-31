import {Component} from '@angular/core';

const filterCss = '.business-filter-icon { padding: 4px; margin: 8px; margin-right:10px; color:white; background-color: #f44336}';
const mapCss = '.map-marker { padding: 0px; margin: 8px; margin-right: 10px; background-color: #D3D3D3 }';
const githubCss = '.github-link { padding: 4px; margin: 4px 6px; margin-left: 4px}';

@Component({
  templateUrl: 'choose-place-type-dialog.component.html',
  styles: [mapCss, githubCss, filterCss]
})
export class ChoosePlaceTypeDialogComponent {

  readonly iconUrl: string;
  readonly github: string;
  readonly githubTxt: string;

  constructor(){
    this.iconUrl = '../../assets/red.png';
    this.github = '../../assets/GitHub-Mark-32px.png';
    this.githubTxt = '../../assets/GitHub_Logo.png';
  }

}
