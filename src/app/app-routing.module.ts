import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SomeComponent } from './components/some.component';
import { AnotherComponent } from './components/test-component/another.component';
import { VisualizationComponent } from './visualizations/visualization.component';

import { PlaceComponent } from './components/place/place.component';
import { RandomTypeRedirectionService, 
         PlaceTypeResolverService, 
         PlaceDetailsResolverService } from './services';

const appRoutes: Routes = [
  { path: 'another', component: AnotherComponent },
  { path: '', 
    canActivate: [RandomTypeRedirectionService],
    children: []
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
      }
    ]
  },
  { path: 'swipe', component: VisualizationComponent },
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
