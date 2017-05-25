import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SomeComponent } from './components/some.component';
import { AnotherComponent } from './components/test-component/another.component';
import { VisualizationComponent } from './visualizations/visualization.component';
import { BarChartDemoComponent } from './visualizations/bar-chart-demo.component';

import { ChoiceComponent } from './choice/choice.component';
import { PlaceComponent } from './components/place/place.component';
import { RandomTypeRedirectionService, 
         PlaceTypeResolverService, 
         PlaceDetailsResolverService } from './services';

const appRoutes: Routes = [
  { path: 'choice', component: ChoiceComponent },
  { path: 'chart-that-swipes', component: BarChartDemoComponent },
  { path: 'another', component: AnotherComponent },
  { path: '', 
    component: ChoiceComponent,
    canActivate: [RandomTypeRedirectionService]
  },
  { path: 'places',
    children: [
      {
        path: ':place-id',
        component: PlaceComponent,
        resolve: {
          whatevs: PlaceDetailsResolverService
        }
      }
    ]
  },
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
