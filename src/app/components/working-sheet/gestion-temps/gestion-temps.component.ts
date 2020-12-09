import {Component, OnInit} from '@angular/core';
import {RepartitionTempsResultat} from '../../../services/algo/gestion-temps.service';
import {ImportExportService} from '../../../services/io/import-export.service';
import {Store} from '../../../services/data/store.service';
import {StorageDataTypeKeys} from '../../../model/Models';

@Component({
  selector: 'app-gestion-temps',
  templateUrl: './gestion-temps.component.html',
  styleUrls: ['./gestion-temps.component.scss']
})
export class GestionTempsComponent implements OnInit {


  resultat: RepartitionTempsResultat = null;

  data: any = null;

  constructor(private store: Store,
              private importExportService: ImportExportService) {
  }

  ngOnInit(): void {

    this.store.gestionDeTemps
      .subscribe(resultat => {
        if (resultat[0] !== undefined) {
          this.setResultat(resultat);
        } else {
          this.resultat = null;
          this.data = {};
        }
      });

    this.store.refreshDataFromStorage();
  }

  private setResultat(resultat: RepartitionTempsResultat[]) {
    this.resultat = resultat[0];

    this.data = {
      labels: ['Proposition de questions', 'Proposition de réponses', 'Notations de questions', 'Notations de réponses'],
      datasets: [
        {
          data: [this.resultat.tempsTotalPourPropositionsDeQuest, this.resultat.tempsTotalPourPropositionsDeRep,
            this.resultat.tempsTotalPourNotationDeQuest, this.resultat.tempsTotalPourNotationDeRep],
          backgroundColor: [
            '#003f5c',
            '#58508d',
            '#bc5090',
            '#ff6361',
          ],
          hoverBackgroundColor: [
            '#003f5c',
            '#58508d',
            '#bc5090',
            '#ff6361'
          ]
        }]
    };
  }

  tempsPourTousLesCrowders(tempsTotalPourPropositionsDeQuest: number): number {
    return this.round(tempsTotalPourPropositionsDeQuest / this.resultat.parametres.nombreDeCrowders);
  }

  exporterResultatJson() {
    this.importExportService
      .exportJsonFile(`gestion_du_temps_${new Date()}.json`, JSON.stringify(this.resultat, null, 2));
  }

  calculerTempsTotal(): number {
    return this.round(this.resultat.tempsTotalPourNotationDeRep + this.resultat.tempsTotalPourNotationDeQuest
      + this.resultat.tempsTotalPourPropositionsDeRep + this.resultat.tempsTotalPourPropositionsDeQuest);
  }

  round(valeur: number): number {
    return Math.round(valeur * 100) / 100;
  }
}

