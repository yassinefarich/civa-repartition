import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupsComponent} from './components/working-sheets/groups/groups.component';
import {DonneesComponent} from './components/working-sheets/donnees/donnees.component';

export const appRouteList: Routes = [
  {
    path: 'groups',
    component: GroupsComponent
  },
  {
    path: 'donnees',
    component: DonneesComponent
  },
  {
    path: '**',
    redirectTo: 'groups'
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
