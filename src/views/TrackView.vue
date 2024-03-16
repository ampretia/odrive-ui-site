<script>
import Konva from "konva";
const width = window.innerWidth;
const height = window.innerHeight;
import { useDriveStore } from '../stores/drive'
import { mapState, mapActions } from "pinia";
import { DrawTrack } from "./layout";



export default {
  data() {
    return {
      configKonva: {
        width,
        height
      }
      ,
      loading:false
    };
  },
  methods: {
    something() {
      var r = new Konva.Rect({
        width: 100,
        height: 100,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 2,
      });
      this.layer.add(r)
    },
    ...mapActions(useDriveStore, ['scanTrack']),
  },

  computed: {
    ...mapState(useDriveStore, ['layout'])
  },
  mounted() {
    this.stage = this.$refs.stage.getNode();
    this.layer = this.$refs.layer.getNode();
  },
  watch: {
    layout(newLayout) {
      let dt = new DrawTrack(this.layer, newLayout);
      dt.draw()
    }
  }

};

</script>
<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <p class="button is-primary" @click="scanTrack">Scan...</p>
      </div>
      <div class="level-item">
        <p class="button is-primary" @click="something">something</p>
      </div>
  
    
      <progress v-show="loading" class="level-item progress is-small is-normal" max="100"></progress>
      

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



