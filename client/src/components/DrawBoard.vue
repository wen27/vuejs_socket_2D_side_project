<template>
  <div>
    <canvas ref="drawboard" width="640" height="480"></canvas>
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
    this.context = this.$refs.drawboard.getContext("2d");
    this.socket.on("position", (data) => {
      this.position = data;
      this.context.clearRect(
        0,
        0,
        this.$refs.drawboard.width,
        this.$refs.drawboard.height
      );
      this.context.fillRect(this.position.x, this.position.y, 20, 20);
    });
  },

  methods: {
    move(direction) {
      this.socket.emit("move", direction);
    },
  },
};
</script>

<style scoped>
canvas {
  width: 640px;
  height: ;
  border: 1px solid black;
}
</style>
