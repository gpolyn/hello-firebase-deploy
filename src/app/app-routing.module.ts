import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizationComponent } from './visualizations/visualization.component';
import { BarChartDemoComponent } from './visualizations/bar-chart-demo.component';

import { ChoiceComponent } from './choice/choice.component';

/*
import { CanDeactivateGuard }       from './can-deactivate-guard.service';
import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
*/

const appRoutes: Routes = [
  { path: 'choice', component: ChoiceComponent },
  { path: 'swipe', component: VisualizationComponent },
  { path: 'bar-chart', component: BarChartDemoComponent },
	{ path: '',
    redirectTo: '/choice',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { preloadingStrategy: SelectivePreloadingStrategy }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    /*
    CanDeactivateGuard,
    SelectivePreloadingStrategy
    */
  ]
})
export class AppRoutingModule { }
