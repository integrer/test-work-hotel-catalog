<script>
export default {
  props: {
    hotels: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="hotel of hotels"
          :key="hotel.name"
        >
          <td>{{ hotel.name }}</td>
          <td>
            <div class="row">
              <div class="col">
                {{ hotel.description }}
              </div>
              <div class="col-auto">
                <button
                  class="btn btn-primary"
                  type="button"
                >
                  Забронировать
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
