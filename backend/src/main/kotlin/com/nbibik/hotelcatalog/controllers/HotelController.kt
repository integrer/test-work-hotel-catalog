package com.nbibik.hotelcatalog.controllers

import com.nbibik.hotelcatalog.entity.Hotel
import com.nbibik.hotelcatalog.service.HotelListService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class HotelController {
    @Autowired
    lateinit var hotelListService: HotelListService

    @GetMapping("/hotels")
    fun hotels(
        @RequestParam(value = "country") country: String?,
        @RequestParam(value = "types") types: Array<String>?,
        @RequestParam(value = "stars") stars: Array<Byte>?,
        @RequestParam(value = "minReviews") minReviews: Int?,
        @RequestParam(value = "maxPrice") maxPrice: Float?,
        @RequestParam(value = "page") page: Int?,
    ) = hotelListService.getList(
        HotelListService.Query(country, types?.asIterable(), stars?.asIterable(), minReviews, maxPrice),
        HotelListService.PageConfig.of(page)
    )
}
