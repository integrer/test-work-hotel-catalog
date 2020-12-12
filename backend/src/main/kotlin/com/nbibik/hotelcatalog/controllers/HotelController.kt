package com.nbibik.hotelcatalog.controllers

import com.nbibik.hotelcatalog.model.Hotel
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HotelController {
    @GetMapping("/hotels")
    fun hotels(): List<Hotel> = listOf(Hotel("Ritz", 4.5f), Hotel("Inturist", 3f))
}
