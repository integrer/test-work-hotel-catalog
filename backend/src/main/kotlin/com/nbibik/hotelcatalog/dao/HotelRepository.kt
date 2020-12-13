package com.nbibik.hotelcatalog.dao

import com.nbibik.hotelcatalog.model.Hotel
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface HotelRepository : CrudRepository<Hotel, Int>