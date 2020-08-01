<script>
import TreeSelect from "@riophae/vue-treeselect";

const MAX_PRICE = 5000;
const TYPES = ["Отель", "Апартаменты"];

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
    MAX_PRICE,
    TYPES: TYPES.map(v => ({ id: v, label: v })),
    starKinds: [
      { label: "1 звезда", id: 1 },
      { label: "2 звезды", id: 2 },
      { label: "3 звезды", id: 3 },
      { label: "4 звезды", id: 4 },
      { label: "5 звезд",  id: 5 },
    ],
  }),
  methods: {
    commitValue(prop, v) {
      this.$emit("input", Object.assign({},
        this.value,
        { [prop]: v }));
    },
  },
}

/** @typedef Query
 *  @property {string?} country Selected country
 *  @property {string?} type Selected type
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
    type: undefined,
    stars: [],
    reviewsMin: 0,
    priceMax: Math.ceil(MAX_PRICE / 2),
  };
}

</script>

<template>
  <div>
    <label class="form-label">Страна</label>
    <tree-select
      :value="value.country"
      :options="countries"
      placeholder="Выберите страну..."
      @input="commitValue('country', $event)"
    />

    <label class="form-label">Тип</label>
    <tree-select
      :value="value.type"
      :options="TYPES"
      :searchable="false"
      placeholder="Выберите тип..."
      @input="commitValue('type', $event)"
    />

    <label class="form-label">Звёзды</label>
    <tree-select
      :value="value.stars"
      :options="starKinds"
      :searchable="false"
      :multiple="true"
      placeholder="Выберите звёздность..."
      @input="commitValue('stars', $event)"
    />
    
    <label class="form-label">Количество отзывов от</label>
    <input
      :value="value.reviewsMin"
      class="form-control"
      min="0"
      type="number"
      @input="commitValue('reviewsMin', +$event.target.value)"
    >

    <label class="form-label">Цена до</label>
    <div class="row">
      <div class="col-2">
        0
      </div>
      <div class="col">
        <input
          v-model.number="value.priceMax"
          type="range"
          class="form-control-range"
          :max="MAX_PRICE"
          @input="commitValue('priceMax', +$event.target.value)"
        >
      </div>
      <div class="col-2">
        {{ MAX_PRICE }}
      </div>
    </div>
    <div class="row">
      <span class="border rounded col-auto mx-auto">{{ value.priceMax }}</span>
    </div>
  </div>
</template>
