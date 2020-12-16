package com.nbibik.hotelcatalog.service

import com.nbibik.hotelcatalog.dao.HotelRepository
import com.nbibik.hotelcatalog.entity.Hotel
import com.nbibik.hotelcatalog.entity.QHotel
import com.nbibik.hotelcatalog.model.PagedList
import com.querydsl.core.types.dsl.BooleanExpression
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class HotelListService {
    @Autowired
    lateinit var repository: HotelRepository

    fun getList(query: Query = Query.default, pageConfig: PageConfig = PageConfig.default): PagedList<Hotel> {
        val pageRequest = PageRequest.of(pageConfig.page, pageConfig.pageSize)
        val page = getPredicateOf(query)?.let { repository.findAll(it, pageRequest) } ?: repository.findAll(pageRequest)
        return PagedList(page.totalPages, pageConfig.page, page.toList())
    }

    companion object {
        private fun getPredicateOf(query: Query): BooleanExpression? {
            val (country, types, stars, minReviews, maxPrice) = query
            return sequenceOf(
                country?.let(QHotel.hotel.country::equalsIgnoreCase),
                types?.takeIf { it.any() }?.toSet()?.let(QHotel.hotel.type::`in`),
                stars?.takeIf { it.any() }?.toSet()?.let(QHotel.hotel.stars::`in`),
                minReviews?.let(QHotel.hotel.reviewsAmount::goe),
                maxPrice?.let(QHotel.hotel.minPrice::loe),
            ).filterNotNull().reduceOrNull { acc, cur -> acc.and(cur) }
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