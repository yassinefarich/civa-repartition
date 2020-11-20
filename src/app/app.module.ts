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
import {GroupsTableComponent} from './components/groups-table/groups-table.component';
import {CrowdersTableComponent} from './components/crowders-table/crowders-table.component';
import {TooltipModule} from 'primeng/tooltip';
import {DonneesComponent} from './components/working-sheets/donnees/donnees.component';
import {GroupsComponent} from './components/working-sheets/groups/groups.component';
import {WorkingSheetComponent} from './components/working-sheets/working-sheet/working-sheet.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectorComponent,
    ParametresComponent,
    GroupsTableComponent,
    CrowdersTableComponent,
    DonneesComponent,
    GroupsComponent,
    WorkingSheetComponent
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
