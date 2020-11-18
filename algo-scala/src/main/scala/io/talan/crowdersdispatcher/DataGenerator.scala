package io.talan.crowdersdispatcher

import io.talan.crowdersdispatcher.entities.{Crowder, Pivot}


object DataGenerator {

  def generateCrowders(size: Int = 120): List[Crowder] =
    (0 until size).toList.map(
      v => new Crowder(name = s"crowder${v}@mail.com")
    )

  def generatePivots(size: Int = 30): List[Pivot] =
    (0 until size).toList.map(
      v => new Pivot(question = s"Question ${v}")
    )
}
