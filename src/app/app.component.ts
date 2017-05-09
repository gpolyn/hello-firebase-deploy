import { Component } from '@angular/core';
import {MdIconRegistry, MdDialog, MdDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
    isDarkTheme = false;
    users = [
    {
      name: 'Lia Lugo',
      avatar: 'svg-11',
      details: 'I love cheese, ...',
      isAdmin: true,
      isCool: false
    },
    {
      name: 'George Duke',
      avatar: 'svg-12',
      details: 'Zombie ipsum ...',
      isAdmin: false,
      isCool: true
    }
  ];

  selectedUser = this.users[0];

	constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
  }

  private openAdminDialog() {
		this.dialog.open(DialogComponent).afterClosed()
		.filter(result => !!result)
		.subscribe(user => {
			this.users.push(user);
			this.selectedUser = user;
		});
  }


}
