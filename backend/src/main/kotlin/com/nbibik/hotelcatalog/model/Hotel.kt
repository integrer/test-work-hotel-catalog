package com.nbibik.hotelcatalog.model

import com.nbibik.hotelcatalog.entity.Hotel as HotelEntity

data class Hotel(
  val name: String,
  val country: String,
  val address: String,
  val stars: Byte,
  val type: String,
  val description: String,
  val services: Array<String>,
  val minPrice: Float,
  val rating: Float,
  val reviewsAmount: Short,
  val lastReview: String? = null,
) {
  companion object {
    // TODO: Replace it with mapper
    fun from(hotelEntity: HotelEntity) = Hotel(
      hotelEntity.name,
      hotelEntity.country,
      hotelEntity.address,
      hotelEntity.stars,
      hotelEntity.type,
      hotelEntity.description,
      hotelEntity.services.split(',').toTypedArray(),
      hotelEntity.minPrice,
      hotelEntity.rating,
      hotelEntity.reviewsAmount,
      hotelEntity.lastReview,
    )
  }

  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (javaClass != other?.javaClass) return false

    other as Hotel

    if (name != other.name) return false
    if (country != other.country) return false
    if (address != other.address) return false
    if (stars != other.stars) return false
    if (type != other.type) return false
    if (description != other.description) return false
    if (!services.contentEquals(other.services)) return false
    if (minPrice != other.minPrice) return false
    if (rating != other.rating) return false
    if (reviewsAmount != other.reviewsAmount) return false
    if (lastReview != other.lastReview) return false

    return true
  }

  override fun hashCode(): Int {
    var result = name.hashCode()
    result = 31 * result + country.hashCode()
    result = 31 * result + address.hashCode()
    result = 31 * result + stars
    result = 31 * result + type.hashCode()
    result = 31 * result + description.hashCode()
    result = 31 * result + services.contentHashCode()
    result = 31 * result + minPrice.hashCode()
    result = 31 * result + rating.hashCode()
    result = 31 * result + reviewsAmount
    result = 31 * result + (lastReview?.hashCode() ?: 0)
    return result
  }
}
