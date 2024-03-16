<script setup>

import { useDriveStore } from '@/stores/drive'

const store = useDriveStore()

</script>

<template>
  <div class="container">

    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="button is-primary" @click="store.scanCars()">Scan...</p>
        </div>
        <progress v-show="store.cars_loading" class="level-item progress is-small is-normal" max="100">15%</progress>
      </div>

    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent" v-for="(c, index) in store.cars" :key="index">
        <div class="card tile is-child ">
          <div class="card-image">
            <figure class="image is-64by64">
              <img :src="c.img" />

            </figure>
          </div>
          <div class="card-header">
            <div class="card-header-title">
              {{ c.name }}
            </div>

          </div>
          <div class="card-content">
            <p>{{ c.address }}</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style></style>

