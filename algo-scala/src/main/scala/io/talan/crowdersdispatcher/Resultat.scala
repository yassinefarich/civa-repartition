package io.talan.crowdersdispatcher

case class Resultat(nbrDeGroups: Int = 0,
                    nbrDePerParGroup: Int = 0,
                    nombreDePivParGroupe: Int = 0,
                    nbrDeNotationParCrowder : Int = 0,
                   ) {
  override def toString: String =
    s"""
       |  nbrDeGroups = ${nbrDeGroups}
       |  nbrDePerParGroup = ${nbrDePerParGroup}
       |  nombreDePivParGroupe = ${nombreDePivParGroupe}
       |""".stripMargin
}
