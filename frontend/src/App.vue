<script>
import ListComponents, { emptyQuery } from './components/HotelList';

import debounce from 'lodash/debounce';
import partial from 'lodash/partial';

/** @typedef RawQuery
 *  @property {string | undefined} country Selected country
 *  @property {string[]} types Selected types
 *  @property {number} stars Selected stars
 *  @property {number} reviewsMin Minimum reviews
 *  @property {number} priceMax Maximum price
 */

/** @typedef {RawQuery} PreparedQuery
 *  @property {Set<string>} types Selected types
 *  @property {Set<number>} stars Selected stars
 */

/**
 * @param {RawQuery} query input query
 * @returns {PreparedQuery} Prepared query
 */
function prepareQuery(query) {
  return {
    ...query,
    types: new Set(query.types),
    stars: new Set(query.stars),
  };
}

/**
 * Checks if hotel satisfies specified query
 *
 * @param {PreparedQuery} query prepared query object
 * @param {*} hotel hotel object to check
 * @returns {boolean} true if hotel satisfies the query or false otherwise.
 */
function isSatisfies(query, hotel) {
  return (
    (query.country === undefined || hotel.country === query.country) &&
    (query.types.size === 0 || query.types.has(hotel.type)) &&
    (query.stars.size === 0 || query.stars.has(hotel.stars)) &&
    hotel.reviews_amount >= query.reviewsMin &&
    hotel.min_price <= query.priceMax
  );
}

const FILTER_DELAY = 500;

export default {
  components: { ...ListComponents },
  data: () => ({
    list: [],
    isLoading: true,

    filteredList: [],
    query: emptyQuery(),

    countries: [],
  }),
  watch: {
    query() {
      this.debouncedFilterList();
    },
  },
  mounted() {
    this.loadData();

    this.debouncedFilterList = debounce(this.filterList, FILTER_DELAY);
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      try {
        const { hotels } = await import('./data/hotels.json');
        this.list = hotels;
        this.countries = [...new Set(hotels.map(h => h.country))].map(v => ({ id: v, label: v }));
        this.filterList();
      } finally {
        this.isLoading = false;
      }
    },
    async resetQuery() {
      this.query = emptyQuery();
      await this.$nextTick(); // Wait while watcher reacts
      this.debouncedFilterList.flush();
    },
    filterByQuery() {
      return this.list.filter(partial(isSatisfies, prepareQuery(this.query)));
    },
    filterList() {
      this.filteredList = this.filterByQuery();
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-4 mt-3">
        <button class="btn btn-primary w-100" @click="resetQuery">Очистить фильтры</button>
        <HotelFilter v-model="query" :countries="countries" />
      </div>
      <div class="col-12 col-md mt-3">
        <HotelList :hotels="filteredList" :is-loading="isLoading" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap/scss/bootstrap-reboot.scss';
</style>
