<script setup>
// import Konva from "konva";
import { useDriveStore } from '../stores/drive'
import { DrawTrack } from "./layout";
import { onMounted, reactive, getCurrentInstance, watch } from "vue";
import { storeToRefs } from 'pinia'

import { TURN, VALUES, TRACK } from './constants.js'

const store = useDriveStore()
let { layout, carEvents } = storeToRefs(store)

const configKonva = reactive({
  width: window.innerWidth,
  height: window.innerHeight
})

let layer;
let dt;

import Konva from "konva";

function drawCar(car, x, y){

  let width = VALUES.roadWidth * VALUES.scale * 0.25
  let length = width * 2

  var rect3 = new Konva.Rect({
        x,
        y,
        width: width,
        height: length,
        offsetX: width/2,
        offsetY: length/2,
        fill: car.colour,
        cornerRadius: [10,10,0,0],
        strokeWidth: 5,
        stoke: 'black',
        shadowBlur: 2,
        shadowColor: "white"
      });
      layer.add(rect3);

}

onMounted(() => {
  // this doesn't quite seem right - the advertised 
  // const refname = ref(null)
  // doesn't seem to work
  layer = getCurrentInstance().ctx.$refs.layer.getNode()

})

// watch for the laytout to redraw the track
watch(layout, (newLayout) => {
  dt = new DrawTrack(layer, newLayout,true);
  dt.draw()
})

watch(carEvents,(event)=>{
  // get the event, get the lid, and map position
  // draw car shape
})


function freeDrive(){
   drawCar({colour:'blue'},500,400);
}

</script>

<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <p class="button is-primary" @click="store.scanTrack">Scan...</p>
      </div>

      <div class="level-item">
        <p class="button is-primary" @click="freeDrive">Free Drive...</p>
      </div>

      <div class="level-item">
        <p class="button is-primary" @click="store.moveStart">Move to start...</p>
      </div>

      <div class="level-item">
        <p class="button is-warning" @click="store.wander">Wander...</p>
      </div>

      <!-- <progress v-show="loading" class="level-item progress is-small is-normal" max="100"></progress> -->

    </div>
  </div>

  <div class="section">
    <div class="track has-background-success-dark">
      <v-stage ref="stage" :config="configKonva">
        <v-layer ref="layer">
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>



