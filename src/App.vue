<script>
import * as ListComponents from "./components/HotelList";

export default {
  components: Object.assign({}, ListComponents),
  data: () => ({
    list: [],
    filteredList: [],
  }),
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-4">
        <filter></filter>
      </div>
      <div class="col-12 col-md">
        <list :hotels="filteredList"></list>        
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap/scss/bootstrap-reboot.scss";
</style>
