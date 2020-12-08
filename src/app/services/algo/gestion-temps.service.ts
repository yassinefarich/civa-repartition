import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Store} from '../data/store.service';
import {StorageDataTypeKeys} from '../../model/Models';

export interface ParametresGestionDuTemps {
  nombreDeCrowders: number;
  nombreDePivots: number;
  nombreDePropositionsParPivots: number;
  nombreDeNotationParProposition: number;

  tempsDePropositonDeQuest: number;
  tempsDePropositonDeRep: number;
  tempsDeNotationDeQue: number;
  tempsDeNotationDeRep: number;

  nbrDeSessionsParSemaine: number;
  dureeDeSession: number;
}

export interface RepartitionTempsResultat {
  tempsTotalPourPropositionsDeQuest: number;
  tempsTotalPourPropositionsDeRep: number;
  tempsTotalPourNotationDeQuest: number;
  tempsTotalPourNotationDeRep: number;
  tempsTotal: number;

  nombreDeSemainesNecessaires: number;
  nombreDeSessionsNecessaire: number;
  nombreDheurs : number;

  parametres: ParametresGestionDuTemps
}

@Injectable({
  providedIn: 'root'
})
export class GestionTempsService {

  constructor(private store: Store) {
  }

  calculerTemps(parametres: ParametresGestionDuTemps): void {

    let nombreDePropositionsDeQuestionTotal = parametres.nombreDePivots * parametres.nombreDePropositionsParPivots;
    let nombreDePropositionsDeReponsesTotal = parametres.nombreDePivots * parametres.nombreDePropositionsParPivots;

    let tempsTotalPourPropositionsDeQuest = nombreDePropositionsDeQuestionTotal * parametres.tempsDePropositonDeQuest;
    let tempsTotalPourPropositionsDeRep = nombreDePropositionsDeReponsesTotal * parametres.tempsDePropositonDeRep;

    let nombreDeNotationDeQuestionsTotal = (nombreDePropositionsDeQuestionTotal + parametres.nombreDePivots) * parametres.nombreDeNotationParProposition;
    let nombreDeNotationDeReponsesTotal = (nombreDePropositionsDeReponsesTotal + parametres.nombreDePivots) * parametres.nombreDeNotationParProposition;

    let tempsTotalPourNotationDeQuest = nombreDeNotationDeQuestionsTotal * parametres.tempsDeNotationDeQue;
    let tempsTotalPourNotationDeRep = nombreDeNotationDeReponsesTotal * parametres.tempsDeNotationDeRep;

    let tempsTotal: number = tempsTotalPourPropositionsDeQuest + tempsTotalPourPropositionsDeRep + tempsTotalPourNotationDeQuest + tempsTotalPourNotationDeRep;

    let nombreDheursDeCrowdingParSession = parametres.dureeDeSession * parametres.nombreDeCrowders;

    let nombreDeSessions = Math.floor(tempsTotal / nombreDheursDeCrowdingParSession);

    let nombreDeSemainesNecessaires = Math.floor(nombreDeSessions / parametres.nbrDeSessionsParSemaine);
    let nombreDeSessionsRestants = nombreDeSessions % parametres.nbrDeSessionsParSemaine
    let nombreDeHeursRestants = Math.ceil((tempsTotal % nombreDheursDeCrowdingParSession) / parametres.nombreDeCrowders);


    let result = {
      tempsTotalPourPropositionsDeQuest,
      tempsTotalPourPropositionsDeRep,
      tempsTotalPourNotationDeQuest,
      tempsTotalPourNotationDeRep,
      tempsTotal,
      nombreDeSemainesNecessaires : nombreDeSemainesNecessaires,
      nombreDeSessionsNecessaire: nombreDeSessionsRestants,
      nombreDheurs : nombreDeHeursRestants,
      parametres
    } as RepartitionTempsResultat;

    console.log(result)

    this.store.setData(StorageDataTypeKeys.GESTION_DU_TEMPS, [result])
  }

}
