package io.talan.crowdersdispatcher.algo

import io.talan.crowdersdispatcher.Parametres
import io.talan.crowdersdispatcher.entities.Groupe

class NotationGroups(private val parametres: Parametres)
  extends DispatchingGroupe(parametres, parametres.notationsParProposition) {
  override def groups(): List[Groupe] = {
    val crowdersParGroups = distribuerGroupsCrowders()
    distribuerQuestionCrowder(crowdersParGroups)
      .map(g => g._1.setPropositionPivots(g._2))
  }
}
