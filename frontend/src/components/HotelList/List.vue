<script>
import Pagination from 'vuejs-paginate';

const ITEMS_PER_PAGE = 3;

export default {
  components: { Pagination },
  props: {
    hotels: {
      type: Array,
      required: true,
    },
  },
  data() {
    const itemKinds = ['page', 'prev', 'next'];
    const paginationClasses = itemKinds.reduce(
      (acc, cur) => {
        acc[`${cur}Class`] = 'page-item';
        acc[`${cur}LinkClass`] = 'page-link';
        return acc;
      },
      { containerClass: 'pagination' },
    );
    return {
      page: 1,
      ITEMS_PER_PAGE,
      paginationClasses,
    };
  },
  computed: {
    currentChunk() {
      const begin = (this.page - 1) * this.ITEMS_PER_PAGE;
      return this.hotels.slice(begin, begin + this.ITEMS_PER_PAGE);
    },
    pagesTotal() {
      return Math.ceil(this.hotels.length / this.ITEMS_PER_PAGE);
    },
  },
  watch: {
    hotels() {
      this.checkPageNumber();
    },
  },
  methods: {
    checkPageNumber() {
      if (this.page > this.pagesTotal) {
        this.page = this.pagesTotal;
      }
      if (this.page < 1) {
        this.page = 1;
      }
    },
  },
};
</script>

<template>
  <div>
    <div v-if="hotels.length !== 0">
      <table class="table table-responsive-sm">
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hotel of currentChunk" :key="hotel.name">
            <td>{{ hotel.name }}</td>
            <td>
              <div class="row">
                <div class="col">
                  {{ hotel.description }}
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary" type="button">Забронировать</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination
        v-if="pagesTotal > 1"
        v-model="page"
        :page-count="pagesTotal"
        :page-range="ITEMS_PER_PAGE"
        :margin-pages="2"
        prev-text="<<"
        next-text=">>"
        v-bind="paginationClasses"
      />
    </div>
    <div v-else class="border rounded text-center bg-light py-3 w-100">Записей не найдено</div>
  </div>
</template>
