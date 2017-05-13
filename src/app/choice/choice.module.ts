import { NgModule }       from '@angular/core';

import { ChoiceComponent }  from './choice.component';

import { ChoiceRoutingModule } from './choice-routing.module';

@NgModule({
  imports: [
  ChoiceRoutingModule,
  ],
  declarations: [
    ChoiceComponent
  ],
  providers: []
})
export class ChoiceModule {}
