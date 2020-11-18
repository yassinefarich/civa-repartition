import {BrowserModule} from '@angular/platform-browser';

import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FileSelectorComponent} from './components/file-selector/file-selector.component';
import {ParametresComponent} from './components/parametres/parametres.component';
import {WorkingSheetComponent} from './components/working-sheet/working-sheet.component';
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
import { CrowdersTableComponent } from './components/crowders-table/crowders-table.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectorComponent,
    ParametresComponent,
    WorkingSheetComponent,
    WorkingSheetComponent,
    GroupsTableComponent,
    CrowdersTableComponent
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
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
