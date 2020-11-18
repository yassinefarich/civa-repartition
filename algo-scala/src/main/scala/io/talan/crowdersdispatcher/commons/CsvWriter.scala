package io.talan.crowdersdispatcher.commons

import java.io.{BufferedWriter, File, FileWriter}

import io.talan.crowdersdispatcher.entities.Groupe


object CsvWriter {

  private val CSV_DELIM = ","

  def propositionGroupeToCSV(fileName: String, groups: List[Groupe]): Unit = {

    val groupsHeaders = groups.map(_.name).mkString(CSV_DELIM) + "\n"
    val maxNumberOfCrowder = groups.map(_.crowders.size).max
    val groupsData = (0 until maxNumberOfCrowder) // Attention Excption index out of bound
      .map(i => groups
        .filter(g => g.crowders.size > i)
        .map(_.crowders(i)).map(_.name).mkString(CSV_DELIM)).mkString("\n")

    val crowderPivEvaHeaders = "Crowder" + CSV_DELIM + "Pivots de proposition" + "\n"
    val pivotsEvalByCrowder = groups.flatMap(_.crowders)
      .map(crowder => crowder.name + CSV_DELIM + crowder.pivotsDeNotation.mkString(CSV_DELIM))
      .mkString("\n")

    val fullData = new StringBuilder()
      .append(groupsHeaders)
      .append(groupsData)
      .append("\n\n")
      .append(crowderPivEvaHeaders)
      .append(pivotsEvalByCrowder)
      .toString

    writeCSV(fileName, fullData)
  }

  def notationGroupesToCSV(fileName: String, groups: List[Groupe]): Unit = {

    val groupsHeaders = groups.map(_.name).mkString(CSV_DELIM) + "\n"
    val maxNumberOfCrowder = groups.map(_.crowders.size).max
    val groupsData = (0 until maxNumberOfCrowder) // Attention Excption index out of bound
      .map(i => groups
        .filter(g => g.crowders.size > i)
        .map(_.crowders(i)).map(_.name).mkString(CSV_DELIM)).mkString("\n")

    val crowderPivNotaHeaders = "Crowder" + CSV_DELIM + "Pivots de notation" + "\n"
    val pivotsNotaByCrowder = groups.flatMap(_.crowders)
      .map(crowder => crowder.name + CSV_DELIM + crowder.pivotsProposition.mkString(CSV_DELIM))
      .mkString("\n")

    val fullData = new StringBuilder()
      .append(groupsHeaders)
      .append(groupsData)
      .append("\n\n")
      .append(crowderPivNotaHeaders)
      .append(pivotsNotaByCrowder)
      .toString

    writeCSV(fileName, fullData)
  }

  private def writeCSV(fileName: String, data: String): Unit = {
    val file = new File(fileName)
    val bw = new BufferedWriter(new FileWriter(file))
    bw.write(data)
    bw.close()
  }
}
