<script>
import ListComponents, { emptyQuery } from "./components/HotelList";
import data from "./data/hotels.json";

import _ from "lodash";

/** @typedef PreparedQuery
 *  @property {string | null} country Selected country
 *  @property {string | null} type Selected type
 *  @property {Set<number>} stars Selected stars
 *  @property {number | null} reviewsMin Minimum reviews
 *  @property {number} priceMax Maximum price
 */

/**
 * Checks if hotel satisfies specified query
 * 
 * @param {PreparedQuery} query prepared query object
 * @param {*} hotel hotel object to check
 * @returns {boolean} true if hotel satisfies the query or false otherwise.
 */
function isSatisfies(query, hotel) {
  return ((query.country === undefined || hotel.country === query.country)
    && (query.type === undefined || hotel.type === query.type)
    && (query.stars.size == 0 || query.stars.has(hotel.stars))
    && hotel.reviews_amount >= query.reviewsMin
    && hotel.min_price <= query.priceMax);
}

export default {
  components: { ...ListComponents },
  data: () => ({
    list: [],

    filteredList: [],
    preventFilterOnce: false,
    query: emptyQuery(),

    countries: [],
  }),
  watch: {
    query() {
      if (!this.preventFilterOnce)
        this.debouncedFilterList();
      else this.preventFilterOnce = false;
    },
  },
  mounted() {
    this.list = data.hotels;
    
    const countrySet = new Set(data.hotels.map(h => h.country));
    this.countries = [...countrySet].map(v => ({ id: v, label: v }));

    this.debouncedFilterList = _.debounce(this.filterList, 500);
    this.filterList();
  },
  methods: {
    resetQuery() {
      this.preventFilterOnce = true;
      this.query = emptyQuery();
      this.filteredList();
    },
    prepareQuery() {
      return Object.assign({}, this.query,
        { stars: new Set(this.query.stars) });
    },
    filterByQuery() {
      return this.list.filter(
        _.partial(isSatisfies, this.prepareQuery()));
    },
    filterList() {
      this.filteredList = this.filterByQuery();
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-12 col-md-4">
        <button
          class="btn btn-primary w-100"
          @click="resetQuery"
        >
          Очистить фильтры
        </button>
        <hotel-filter
          :value="query"
          :countries="countries"
          @input="query = $event"
        />
      </div>
      <div class="col-12 col-md">
        <hotel-list :hotels="filteredList" />        
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap/scss/bootstrap-reboot.scss";

@import "~@riophae/vue-treeselect/dist/vue-treeselect.css"
</style>
