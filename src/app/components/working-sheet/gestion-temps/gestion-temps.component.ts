import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-temps',
  templateUrl: './gestion-temps.component.html',
  styleUrls: ['./gestion-temps.component.scss']
})
export class GestionTempsComponent implements OnInit {

  data: any;
  constructor() {
    this.data = {
      labels: ['Proposition de questions','Proposition de réponses','Notations de questions','Notations de réponses'],
      datasets: [
        {
          data: [300, 50, 100,60],
          backgroundColor: [
            "#087e14",
            "#36A2EB",
            "#FFCE56",
            "#ec0aa2"
          ],
          hoverBackgroundColor: [
            "#087e14",
            "#36A2EB",
            "#FFCE56",
            "#ec0aa2"
          ]
        }]
    };

  }

  ngOnInit(): void {
  }

}
