package io.talan.crowdersdispatcher

import io.talan.crowdersdispatcher.entities.{Crowder, Pivot}

case class Parametres(crowders: List[Crowder],
                      pivots: List[Pivot],
                      propositionParQuest: Int,
                      notationsParProposition: Int)
