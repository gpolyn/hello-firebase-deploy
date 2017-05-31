import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BogusComponent } from './components';
import { AnotherComponent } from './components/test-component/another.component';

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
  { path: 'types',
    children: [
      {
        path: ':place-type',
        component: BogusComponent,
        resolve: {
          whatevs: PlaceTypeResolverService
        }
      }
    ]
  }
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
