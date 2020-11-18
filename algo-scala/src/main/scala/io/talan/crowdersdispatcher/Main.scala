package io.talan.crowdersdispatcher

import io.talan.crowdersdispatcher.algo.{EvaluationGroups, NotationGroups}
import io.talan.crowdersdispatcher.commons.CsvWriter
import io.talan.crowdersdispatcher.entities.Groupe

object Main {

  def main(args: Array[String]): Unit = {

    val input = Parametres(
      crowders = DataGenerator.generateCrowders(123),
      pivots = DataGenerator.generatePivots(33),
      propositionParQuest = 20,
      notationsParProposition = 30
    )

    val evaluationGroups: List[Groupe] = new EvaluationGroups(input).groups
    CsvWriter.propositionGroupeToCSV("PropositionGroups.csv", evaluationGroups)

    val notationGroups: List[Groupe] = new NotationGroups(input).groups
    CsvWriter.notationGroupesToCSV("NotationGroups.csv", notationGroups)
  }

}
