import { ref, reactive } from 'vue'

import { defineStore } from 'pinia'
import SkullImg from '@/assets/Skull.jpg'
import GuardianImg from '@/assets/Guardian.jpg'
import NukeImg from '@/assets/Nuke.jpg'
import GroundshockImg from '@/assets/Groundshock.jpg'

const URL = 'ws://192.168.1.102:8765'

function processCarevent(){
  // which car

  // update car object with new position

  // reference layout and exit vector of piece it is on
}

const imgmap = {
  "Skull": SkullImg,
  "Guardian": GuardianImg,
  "Nuke": NukeImg,
  "Groundshock": GroundshockImg
}

export const useDriveStore = defineStore('drive', {
  state: () => ({
    cars: [],
    layout: [],
    cars_loading: false,
    track_loading: false,
    socket: null,
    connected: false
  }),
  actions: {
    scanTrack() {
      this.track_loading = true

      // this.layout = { "track": [{ "lid": 33, "type": "start", "turn": "" }, { "lid": 34, "type": "finish", "turn": "" }, { "lid": 18, "type": "curve", "turn": "" }, { "lid": 17, "type": "curve", "turn": "" }, { "lid": 48, "type": "straight", "turn": "" }, { "lid": 23, "type": "curve", "turn": "" }, { "lid": 17, "type": "curve", "turn": "" }] }
      this.layout = {
        "track":
          [
            // { "lid": 33, "type": "start", "turn": "" },
            // { "lid": 34, "type": "finish", "turn": "" },
            // { "lid": 18, "type": "curve", "turn": "" },
            // { "lid": 17, "type": "curve", "turn": "" },
            { "lid": 48, "type": "start", "turn": "" },
            { "lid": 23, "type": "straight", "turn": "" },
            { "lid": 17, "type": "curve", "turn": "left" },
            { "lid": 17, "type": "curve", "turn": "right" },
            { "lid": 17, "type": "curve", "turn": "right" },
            { "lid": 48, "type": "straight", "turn": "" },
            { "lid": 23, "type": "straight", "turn": "" },
            { "lid": 17, "type": "curve", "turn": "right" },
            { "lid": 23, "type": "straight", "turn": "" },
            { "lid": 17, "type": "curve", "turn": "right" },
            { "lid": 23, "type": "straight", "turn": "" },
            { "lid": 23, "type": "straight", "turn": "" },
            { "lid": 17, "type": "curve", "turn": "left" },
            { "lid": 23, "type": "straight", "turn": "" },
            { "lid": 17, "type": "curve", "turn": "left" },
            { "lid": 17, "type": "curve", "turn": "left" },
            { "lid": 48, "type": "finish", "turn": "" },

          ]
      }

      // this.socket.send(JSON.stringify({ action: 'scantrack' }))
    },
    scanCars() {
      this.cars_loading = true
      this.socket.send(JSON.stringify({ action: 'scancars' }))
    },
    moveStart() {
      this.socket.send(JSON.stringify({ action: "movestart" }))
    },
    wander() {
      this.socket.send(JSON.stringify({ action: "wander" }))
    },
    connect() {
      this.socket = new WebSocket(URL);

      this.socket.onopen = this.handleOpen
      this.socket.onmessage = this.handleMessage
      this.socket.onerror = this.handleError
      this.socket.onclose = this.handleClose

      this.$subscribe((mutation, state) => {
        console.log(`State subscription ${JSON.stringify(state)}`)
      })
    },
    handleOpen() {
      console.log('WebSocket connection established');
      this.connected = true
    },
    handleMessage(event) {
      console.log('Received message:', event.data);
      let data = JSON.parse(event.data)
      if (data.response === 'cars') {
        this.cars = data.cars.map(e => {
          e.img = imgmap[e.name]
          return e
        })
        this.cars_loading = false
      } else if (data.response === 'layout') {
        this.layout = data.layout
        this.track_loading = false
      } else if (data.response === 'carevent') {
        // process car event and update the state
        processCarEvent()
      } else {
        console.log(data)
      }

    },
    handleError(event) {
      console.error('WebSocket error:', event);
      this.connected = false
    },
    handleClose(event) {
      this.connected = false
      console.log('WebSocket connection closed:', event);
    },
  },
  getters: {

  }

})
