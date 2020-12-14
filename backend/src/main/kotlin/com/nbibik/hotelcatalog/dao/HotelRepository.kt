package com.nbibik.hotelcatalog.dao

import com.nbibik.hotelcatalog.entity.Hotel
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface HotelRepository : CrudRepository<Hotel, Int>