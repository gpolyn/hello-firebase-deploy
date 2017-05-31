import {Component} from '@angular/core';
import { WindowRefService } from '../services/window/window-ref.service';

const filterCss = '.business-filter-icon { padding: 4px; margin: 8px; margin-right:18px; color:white; background-color: #f44336}';
const mapCss = '.map-marker { padding: 0px; margin: 8px; margin-right: 18px; background-color: #D3D3D3 }';
const githubCss = '.github-link { padding: 4px; margin: 4px 6px; margin-left: 4px}';
const githubLinkCss = '.github-link-btn { font-size: initial; font-weight: initial}';

@Component({
  templateUrl: 'choose-place-type-dialog.component.html',
  styles: [mapCss, githubCss, filterCss, githubLinkCss]
})
export class ChoosePlaceTypeDialogComponent {

  readonly iconUrl: string;
  readonly github: string;
  readonly githubTxt: string;
  readonly nativeWindow: any;
  readonly GITHUB_SRC_URL = 'https://github.com/gpolyn/hello-firebase-deploy';

  constructor(private winRef: WindowRefService){
    this.nativeWindow = winRef.nativeWindow;
    this.iconUrl = '../../assets/red.png';
    this.github = '../../assets/GitHub-Mark-32px.png';
    this.githubTxt = '../../assets/GitHub_Logo.png';
  }

  openWindowOnSource() {
    this.nativeWindow.open(this.GITHUB_SRC_URL);
  }

}
