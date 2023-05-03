<template>
    <div>
        <a class="u-link-white" href="#" @click="toggleTimer">
            {{ time }}
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
      return {
          time: 0,
          isRunning: false,
          interval: undefined as any
      }
  },
  methods: {
      toggleTimer() {
          if (this.isRunning) {
              clearInterval(this.interval);
              console.log('timer stops');
          } else {
              this.interval = setInterval(this.incrementTime, 10);
              console.log('timer starts');
          }
          this.isRunning = !this.isRunning;
      },
      incrementTime() {
          this.time = parseInt(this.time.toString()) + 1;
      },
  }
  })
</script>