<script>
import TreeSelect from '@riophae/vue-treeselect';

const MAX_PRICE = 5000;
const TYPES = ['Отель', 'Апартаменты'];

const priceMaxSetup = Object.freeze({
  type: 'range',
  max: MAX_PRICE,
  step: 200,
});

const reviewsMinSetup = Object.freeze({
  type: 'number',
  min: 0,
  step: 5,
});

export default {
  components: { TreeSelect },
  props: {
    value: {
      type: Object,
      required: true,
    },
    countries: {
      type: Array,
      default: Array,
    },
  },
  data: () => ({
    priceMaxSetup,
    reviewsMinSetup,
    MAX_PRICE,
    TYPES: TYPES.map(v => ({ id: v, label: v })),
    starKinds: [
      { label: '1 звезда', id: 1 },
      { label: '2 звезды', id: 2 },
      { label: '3 звезды', id: 3 },
      { label: '4 звезды', id: 4 },
      { label: '5 звезд', id: 5 },
    ],
  }),
  methods: {
    commitValue(prop, v) {
      this.$emit('input', { ...this.value, ...{ [prop]: v } });
    },
  },
};

/** @typedef Query
 *  @property {string?} country Selected country
 *  @property {string[]} types Selected types
 *  @property {number[]} stars Selected stars
 *  @property {number} reviewsMin Minimum reviews
 *  @property {number} priceMax Maximum price
 */

/**
 * Creates new empty query instance
 *
 * @returns {Query} New empty query instance
 */
export function emptyQuery() {
  return {
    country: undefined,
    types: [],
    stars: [],
    reviewsMin: 0,
    priceMax: Math.ceil(MAX_PRICE / 2),
  };
}
</script>

<template>
  <div>
    <div class="form-group">
      <label class="form-label">Страна</label>
      <tree-select
        :value="value.country"
        :options="countries"
        placeholder="Выберите страну..."
        @input="commitValue('country', $event)"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Типы</label>
      <tree-select
        :value="value.types"
        :options="TYPES"
        :searchable="false"
        :multiple="true"
        placeholder="Выберите тип(ы)..."
        @input="commitValue('types', $event)"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Звёзды</label>
      <tree-select
        :value="value.stars"
        :options="starKinds"
        :searchable="false"
        :multiple="true"
        placeholder="Выберите звёздность..."
        @input="commitValue('stars', $event)"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Количество отзывов от</label>
      <input
        :value="value.reviewsMin"
        v-bind="reviewsMinSetup"
        class="form-control"
        @input="commitValue('reviewsMin', +$event.target.value)"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Цена до</label>
      <div class="row">
        <div class="col-2">0</div>
        <div class="col">
          <input
            :value="value.priceMax"
            v-bind="priceMaxSetup"
            class="form-control-range"
            @input="commitValue('priceMax', +$event.target.value)"
          />
        </div>
        <div class="col-2">
          {{ MAX_PRICE }}
        </div>
      </div>
      <div class="row">
        <span class="border rounded col-auto mx-auto">{{ value.priceMax }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '~@riophae/vue-treeselect/dist/vue-treeselect.css';
</style>
