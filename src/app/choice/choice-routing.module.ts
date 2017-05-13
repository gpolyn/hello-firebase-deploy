import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChoiceComponent }    from './choice.component';

const choiceRoutes: Routes = [
  { path: 'choice',  component: ChoiceComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(choiceRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChoiceRoutingModule { }
