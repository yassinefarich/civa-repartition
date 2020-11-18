package io.talan.crowdersdispatcher.algo

import java.util.logging.Logger

import io.talan.crowdersdispatcher.Parametres
import io.talan.crowdersdispatcher.entities.{Groupe, Pivot}

import scala.math.Integral.Implicits.infixIntegralOps

abstract class DispatchingGroupe(parametres: Parametres, divisor: Int) {

  val LOGGER: Logger = Logger.getLogger(this.getClass.getName)

  def groups(): List[Groupe];

  protected def distribuerGroupsCrowders(): List[Groupe] = {

    val nombreDeGroups = parametres.crowders.size / divisor
    val (nbrDeCrowderParGroupe, nombreDeCrowdersRestant) = parametres.crowders.size /% nombreDeGroups

    LOGGER.info(s"Nombre de groups $nombreDeGroups")
    LOGGER.info(s"Nombre de crowders par un groupe $nbrDeCrowderParGroupe, nombre des crowders horsGroups $nombreDeCrowdersRestant")

    val crowdersDiv = parametres.crowders.splitAt(parametres.crowders.size - nombreDeCrowdersRestant)
    crowdersDiv._1.grouped(nbrDeCrowderParGroupe)
      .zipAll(crowdersDiv._2.map(Some(_)), List(), None)
      .map(v => if (v._2.nonEmpty) v._1.:+(v._2.get) else v._1)
      .zipWithIndex
      .map(v => new Groupe(name = s"Groupe${v._2}", crowders = v._1))
      .toList
  }

  protected def distribuerQuestionCrowder(groups: List[Groupe]): List[(Groupe, List[Pivot])] = {

    val (nombreDePivotParGroupe, nombreDePivotRestant) = parametres.pivots.size /% groups.size
    LOGGER.info(s"Nombre de pivots par group $nombreDePivotParGroupe")
    LOGGER.info(s"Nombre des pivots horsGroups $nombreDePivotRestant")

    val pivotsDiv = parametres.pivots.splitAt(parametres.pivots.size - nombreDePivotRestant)

    pivotsDiv._1.grouped(nombreDePivotParGroupe)
      .zipAll(pivotsDiv._2.map(Some(_)), List(), None)
      .map(v => if (v._2.nonEmpty) v._1.:+(v._2.get) else v._1)
      .zip(groups)
      .map(_.swap)
      .toList
  }
}
