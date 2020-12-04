import {BrowserModule} from '@angular/platform-browser';

import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FileSelectorComponent} from './components/file-selector/file-selector.component';
import {ParametresComponent} from './components/parametres/parametres.component';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RippleModule} from 'primeng/ripple';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ChartModule} from 'primeng/chart';
import {TooltipModule} from 'primeng/tooltip';
import {TableDeCrowdersComponent} from './components/working-sheets/table-de-crowders/table-de-crowders.component';
import {DonneesComponent} from './components/working-sheets/donnees/donnees.component';
import {RepartitionsComponent} from './components/working-sheets/repartitions/repartitions.component';
import {WorkingSheetComponent} from './components/working-sheets/working-sheet/working-sheet.component';
import {AppRoutingModule} from './app-routing.module';
import {TableDePivots} from './components/working-sheets/table-de-pivots/table-de-pivots.component';
import {RecapitulatifComponent} from './components/working-sheets/summary/recapitulatif.component';
import {GestionTempsComponent} from './components/working-sheet/gestion-temps/gestion-temps.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectorComponent,
    ParametresComponent,
    TableDeCrowdersComponent,
    DonneesComponent,
    RepartitionsComponent,
    WorkingSheetComponent,
    TableDePivots,
    RecapitulatifComponent,
    GestionTempsComponent
  ],
  imports: [
    BrowserModule,
    TabViewModule,
    ButtonModule,
    BrowserAnimationsModule,
    RippleModule,
    PanelModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    ToastModule,
    TableModule,
    TooltipModule,
    DialogModule,
    AppRoutingModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
