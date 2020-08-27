<template>
  <div class="filters-wrapper">
    <div :class="'my-btn filter' + focusBtnClass[0]" @click="updateBtn(0, 'all', 'updateFilter')">Tous</div>
    <div :class="'my-btn filter' + focusBtnClass[1]" @click="updateBtn(1, 'files', 'updateFilter')">Mes fichiers</div>
    <div :class="'my-btn filter' + focusBtnClass[2]" @click="updateBtn(2, 'favorites', 'updateFilter')">Favoris</div>
  </div>
</template>

<script lang="ts">
import BtnFocus from "~/mixins/btnFocus"
import { Component, Vue, mixins } from 'nuxt-property-decorator'
@Component
export default class Filters extends mixins(BtnFocus) {
  public focusBtnClass: string[] = [' btn-focus', '', '', ''];
}
</script>

<style lang="less">
  @import '~/assets/css/devices.less';

  @keyframes filter-click {
    from { background-color: @dark-background; }
    to { background-color: @focus-background; }
  }

  .filters-wrapper {
    text-align: center;
    width: 100%;
    display: table;
    vertical-align: middle;
    color: @neon-blue;
  }

  .filter {
    min-width: 33% !important;
    width: 33% !important;
    max-width: 33% !important;
    display: block;
    flex-wrap: wrap;
  }

  .filters-wrapper .filter {
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    display: table-cell;
    text-align: center;
    color: @neon-blue;
  }
</style>