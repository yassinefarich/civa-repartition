import {Component, OnInit} from '@angular/core';
import {GestionTempsService, RepartitionTempsResultat} from '../../../services/algo/gestion-temps.service';

@Component({
  selector: 'app-gestion-temps',
  templateUrl: './gestion-temps.component.html',
  styleUrls: ['./gestion-temps.component.scss']
})
export class GestionTempsComponent implements OnInit {


  resultat: RepartitionTempsResultat = null;

  data: any = null;

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  };

  constructor(private gestionTempsService: GestionTempsService) {
  }

  ngOnInit(): void {

    this.gestionTempsService.gestionDeTemps
      .subscribe(resultat => {
        this.resultat = resultat;

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

      });
  }

  tempsPourTousLesCrowders(tempsTotalPourPropositionsDeQuest: number): number {
    return Math.round((tempsTotalPourPropositionsDeQuest / this.resultat.parametres.nombreDeCrowders) * 100) / 100;
  }

  exporterResultatJson() {

    this.dyanmicDownloadByHtmlTag('result.json', JSON.stringify(this.resultat, null, 2));

  }

  private dyanmicDownloadByHtmlTag(fileName: string, text: string) {

    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    element.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', fileName);
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  calculerTempsTotal(): number {
    return this.resultat.tempsTotalPourNotationDeRep + this.resultat.tempsTotalPourNotationDeQuest
      + this.resultat.tempsTotalPourPropositionsDeRep + this.resultat.tempsTotalPourPropositionsDeQuest;
  }
}

