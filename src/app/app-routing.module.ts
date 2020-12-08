import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepartitionsComponent} from './components/working-sheet/repartitions/repartitions.component';
import {DonneesComponent} from './components/working-sheet/donnees/donnees.component';
import {GestionTempsComponent} from './components/working-sheet/gestion-temps/gestion-temps.component';

export const appRouteList: Routes = [
  {
    path: 'repartitions',
    component: RepartitionsComponent
  },
  {
    path: 'donnees',
    component: DonneesComponent
  },
  {
    path: 'gestionTemps',
    component: GestionTempsComponent
  },
  {
    path: '**',
    redirectTo: 'donnees'
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRouteList, { useHash: true })
  ]
})
export class AppRoutingModule {
}
