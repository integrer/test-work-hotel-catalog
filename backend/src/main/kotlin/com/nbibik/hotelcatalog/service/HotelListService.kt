package com.nbibik.hotelcatalog.service

import com.nbibik.hotelcatalog.dao.HotelRepository
import com.nbibik.hotelcatalog.entity.Hotel
import com.nbibik.hotelcatalog.entity.QHotel
import com.querydsl.core.types.dsl.BooleanExpression
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class HotelListService {
    @Autowired
    lateinit var repository: HotelRepository

    fun getList(query: Query = Query.default, pageConfig: PageConfig = PageConfig.default): List<Hotel> {
        val pageRequest = PageRequest.of(pageConfig.page, pageConfig.pageSize)
        return (getPredicateOf(query)?.let { repository.findAll(it, pageRequest) }
            ?: repository.findAll(pageRequest)).toList()
    }

    companion object {
        private fun getPredicateOf(query: Query): BooleanExpression? {
            val predicates = mutableListOf<BooleanExpression>()
            val (country, types, stars, minReviews, maxPrice) = query
            if (country != null) predicates.add(QHotel.hotel.country.equalsIgnoreCase(country))
            if (types != null && types.any()) predicates.add(QHotel.hotel.type.`in`(types.toSet()))
            if (stars != null && stars.any()) predicates.add(QHotel.hotel.stars.`in`(stars.toSet()))
            if (minReviews != null) predicates.add(QHotel.hotel.reviewsAmount.goe(minReviews))
            if (maxPrice != null) predicates.add(QHotel.hotel.minPrice.loe(maxPrice))
            return predicates.reduceOrNull { acc, cur -> acc.and(cur) }
        }
    }

    data class Query(
        val country: String? = null,
        val types: Iterable<String>? = null,
        val stars: Iterable<Byte>? = null,
        val minReviews: Int? = null,
        val maxPrice: Float? = null,
    ) {
        companion object {
            val default = Query()
        }
    }

    data class PageConfig(val page: Int = 0, val pageSize: Int = PAGE_SIZE) {
        companion object {
            private const val PAGE_SIZE = 3
            val default = PageConfig()

            fun of(page: Int? = null, pageSize: Int? = null) = PageConfig(page ?: 0, pageSize ?: PAGE_SIZE)
        }
    }
}