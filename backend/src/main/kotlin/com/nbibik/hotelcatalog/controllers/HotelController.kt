package com.nbibik.hotelcatalog.controllers

import com.nbibik.hotelcatalog.dao.HotelRepository
import com.nbibik.hotelcatalog.entity.Hotel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HotelController {
    @Autowired
    lateinit var hotelRepository: HotelRepository

    @GetMapping("/hotels")
    fun hotels(): Iterable<Hotel> = hotelRepository.findAll()
}
