<template>
  <div>
    <canvas 
      ref="game" 
      width="640" 
      height="480"
      style="border: 1px solid black;"
      >
      </canvas>
      <div>
        <button @click="createRect">CreateRect</button>
      </div>
    <div>
      <button @click="move('right')">Right</button>
      <button @click="move('left')">Left</button>
      <button @click="move('up')">Up</button>
      <button @click="move('down')">Down</button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "DrawBoard",
  data() {
    return {
      socket: {},
      context: {},
      position: {
        x: 0,
        y: 0,
      },
    };
  },

  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.socket.on("position", (data) => {
      this.position = data;
    });
  },

  methods: {
    createRect(){
      let p = this.position;
      console.log(p);
      this.context.beginPath();
      this.context.rect(p.x,p.y, 20, 150, 100);
      this.context.stroke();
    },
    move(direction) {
      this.socket.emit("move", direction);
    },
  },
};
</script>

<style scoped>

</style>
