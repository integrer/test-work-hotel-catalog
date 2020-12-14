package com.nbibik.hotelcatalog.controllers

import com.nbibik.hotelcatalog.dao.HotelRepository
import com.nbibik.hotelcatalog.entity.Hotel
import com.nbibik.hotelcatalog.service.HotelListService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HotelController {
    @Autowired
    lateinit var hotelListService: HotelListService

    // TODO: Add request params
    @GetMapping("/hotels")
    fun hotels(): Iterable<Hotel> = hotelListService.getList()
}
