package com.nbibik.hotelcatalog.dao

import com.nbibik.hotelcatalog.entity.Hotel
import com.nbibik.hotelcatalog.entity.QHotel
import org.springframework.stereotype.Repository

@Repository
interface HotelRepository : BaseRepository<Hotel, QHotel, Int>