package io.talan.crowdersdispatcher.entities

class Groupe(val name: String,
             var propositionPivots: List[Pivot] = List(),
             var evaluationPivots: List[Pivot] = List(),
             val crowders: List[Crowder] = List()) {

  def setPropositionPivots(pivots: List[Pivot]): Groupe = {
    this.propositionPivots = pivots
    this.crowders.foreach(c => c.pivotsProposition = pivots)
    this;
  }

  def setEvaluationPivots(pivots: List[Pivot]): Groupe = {
    this.evaluationPivots = pivots
    this.crowders.foreach(c => c.pivotsDeNotation = pivots)
    this;
  }

  override def toString: String =
    s"""Name : ${name}
       |Crowders : ${crowders.map(_.name).mkString(",")}
       |""".stripMargin
}
