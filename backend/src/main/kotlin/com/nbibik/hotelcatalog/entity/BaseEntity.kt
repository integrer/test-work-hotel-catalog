package com.nbibik.hotelcatalog.entity

import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@MappedSuperclass
abstract class BaseEntity {
    @get:Id
    @get:GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int = 0
}