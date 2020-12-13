package com.nbibik.hotelcatalog.model

import javax.persistence.*
import kotlin.properties.Delegates

@Entity
@Table(name = "hotels")
class Hotel {
    @get:Id
    @get:GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int = 0

    @get:Column(nullable = false)
    lateinit var name: String

    @get:Column(nullable = false)
    lateinit var country: String

    @get:Column(nullable = false)
    lateinit var address: String

    @get:Column(nullable = false)
    var stars by Delegates.notNull<Byte>()

    @get:Column(nullable = false)
    lateinit var type: String

    @get:Column(nullable = false)
    lateinit var description: String

    @get:Column(nullable = false)
    lateinit var services: String

    @get:Column(nullable = false)
    var minPrice by Delegates.notNull<Float>()

    @get:Column(nullable = false)
    var rating by Delegates.notNull<Float>()

    @get:Column(nullable = false)
    var reviewsAmount by Delegates.notNull<Short>()

    @get:Column(nullable = true)
    var lastReview: String? = null
}
