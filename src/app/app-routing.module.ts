import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SomeComponent } from './components/some.component';
import { AnotherComponent } from './components/test-component/another.component';
import { VisualizationComponent } from './visualizations/visualization.component';
import { BarChartDemoComponent } from './visualizations/bar-chart-demo.component';

import { ChoiceComponent } from './choice/choice.component';
import { PlaceTypeResolverService } from './services';

/*
import { CanDeactivateGuard }       from './can-deactivate-guard.service';
import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
*/

const appRoutes: Routes = [
  { path: 'choice', component: ChoiceComponent },
  { path: 'chart-that-swipes', component: BarChartDemoComponent },
  { path: 'another', component: AnotherComponent },
  { path: 'washington-dc',
    children: [
      {
        path: ':place-type',
        component: SomeComponent,
        resolve: {
          whatevs: PlaceTypeResolverService
        }
        /*
        children: [
          {
            path: ':place-type/:id',
            component: BarChartDemoComponent
          },
          {
            path: ':place-type',
            component: ChoiceComponent
          }
        ]
        */
      }
    ]
  },
  { path: 'swipe', component: VisualizationComponent },
  { path: 'bar-chart', component: BarChartDemoComponent },
	{ path: '',
    redirectTo: '/bar-chart',
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
