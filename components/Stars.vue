<template>
  <div class="stars-wrapper">
    <div v-for="idx in 5" :key="idx" class="star">
      <img v-if="idx <= level" src="../assets/fill-star.svg" alt="Star" :width="scale" />
      <img v-else src="../assets/empty-star.svg" alt=""  :width="scale" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class Stars extends Vue {
  @Prop() level!: number
  @Prop() scale!: number
}
</script>

<style>
  .stars-wrapper { padding: 0 !important; }
  .star { display: inline; padding: 0 !important; }
</style>