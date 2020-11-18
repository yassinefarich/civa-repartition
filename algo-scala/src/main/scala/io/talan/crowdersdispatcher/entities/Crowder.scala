package io.talan.crowdersdispatcher.entities

class Crowder(val name: String,
              var pivotsDeNotation: List[Pivot] = List(),
              var pivotsProposition: List[Pivot] = List()) {
  override def toString = s"Name : $name, pivots : $pivotsDeNotation"
}
