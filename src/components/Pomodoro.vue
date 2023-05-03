<template>
  <div class="vuemodoro light">
    <div id="vuemodoro-timer">
      <span id="vuemodoro-counter">{{currentTime}}</span>
    </div>

    <div id="vuemodoro-buttons">
      <button
        id="vuemodoro-start"
        class="btn"
        :disabled="isStartDisabled"
        @click="runCountup"
      >
        {{startLabel}}
      </button>

      <button
        id="vuemodoro-pause"
        class="btn"
        :disabled="isPauseDisabled"
        @click="pauseCountup"
      >
        {{pauseLabel}}
      </button>

      <button
        id="vuemodoro-reset"
        class="btn"
        :disabled="isResetDisabled"
        @click="resetCountup"
      >
        {{resetLabel}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PomodoroTimer } from "./timer";

export default defineComponent({
 
  name:"Pomodoro",
  data() {
    return {
      hour: this.hours,
      min: this.minutes,
      secs: this.seconds,
      timerId: 0,
      audio: null,
      running: false,
      paused: false,
      stopped: true,
      mute: this.muted
    }
  },
  props: {
    hours: {
      type: Number,
      validator:(value: number):boolean => {
        return value >= 0 && value <= 23;
      },
      default: ():number=> 0
    },
    minutes: {
      type: Number,
      validator:(value: any):boolean => {
        return value >= 0 && value <= 60;
      },
      default: 0
    },
    seconds: {
      type: Number,
      validator:(value: any):boolean => {
        return value >= 0 && value <= 59;
      },
      default: 0
    },
    startLabel: {
      type: String,
      default: "Start"
    },
    pauseLabel: {
      type: String,
      default: "Pause"
    },
    resetLabel: {
      type: String,
      default: "Reset"
    },
    muted: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    currentTime (): any {
      let hours = this.hour < 10 ? "0" + this.hour : this.hour
      let minutes = this.min < 10 ? "0" + this.min : this.min;
      let seconds = this.secs < 10 ? "0" + this.secs : this.secs;
      return `${hours}:${minutes}:${seconds}`;
    },
    isStartDisabled (): any {
      return this.running;
    },
    isPauseDisabled (): any {
      return this.stopped || this.paused;
    },
    isResetDisabled (): any {
      return false;
    }
  },

  methods: {
    run () {
      this.running = true;
      this.paused = false;
      this.stopped = false;
    },

    pause () {
      this.running = false;
      this.paused = true;
      this.stopped = false;
    },

    stop () {
      this.running = false;
      this.paused = false;
      this.stopped = true;
    },

    runCountup () {
      if (this.stopped === true) {
        this.hour = this.hours;
        this.min = this.minutes;
        this.secs = this.seconds;
      }

      this.timerId = PomodoroTimer.startCountup(
        this.hour,
        this.min,
        this.secs,
        this.updateComponentTime
      );
      this.run();
    },

    updateComponentTime (seconds: any) {
      let time = PomodoroTimer.remainingTime(seconds);
      this.hour = Number(time.hh);
      this.min = Number(time.mm);
      this.secs = Number(time.ss);
      if (time.running === false) {
        this.stop();
      }
    },

    pauseCountup () {
      PomodoroTimer.pauseCountup(this.timerId);
      this.pause();
    },

    resetCountup () {
      PomodoroTimer.stopCountup(this.timerId);
      this.hour = this.hours;
      this.min = this.minutes;
      this.secs = this.seconds;
      this.stop();
    }
  }
});
</script>

<style scoped>
.vuemodoro {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 400px;
  margin: 0.5rem auto;
  border: 0.25rem solid #ccc;
  text-align: center;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

.vuemodoro .btn {
  text-align: center;
  cursor: pointer;
  margin: 4px 2px;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.6rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  margin-left: 5px;
  vertical-align: middle;
  font-weight: 600;
}

.vuemodoro #vuemodoro-label,
.vuemodoro #vuemodoro-timer {
  margin-bottom: 1rem;
  margin-right: 3.6rem;
}

.vuemodoro #vuemodoro-label {
  font-size: 1.5rem;
}

.vuemodoro #vuemodoro-timer {
  font-size: 1.5rem;
  font-weight: 400;
}

/*Light theme*/
.vuemodoro.light {
  color: #676766;
  border: 0.25rem solid #fefef500;
  border-radius: 0.25rem;
}

.vuemodoro.light .btn {
  color: #fefef5;
}

.vuemodoro.light #vuemodoro-label {
  color: #57749b;
  border-bottom: 1px solid #57749b;
}

.vuemodoro.light #vuemodoro-start {
  background-color: #4a8f8f;
  border-color: #4a8f8f; /*#7adcc9;*/
}

.vuemodoro.light #vuemodoro-pause {
  background-color: #c99e00;
  border-color: #c99e00; /*#c17ec8;*/
}

.vuemodoro.light #vuemodoro-reset {
  background-color: #c4626c;
  border-color: #c4626c;
}
.vuemodoro.light #vuemodoro-start:disabled,
.vuemodoro.light #vuemodoro-pause:disabled,
.vuemodoro.light #vuemodoro-reset:disabled {
  background: #707070;
  border-color: #707070;
  cursor: not-allowed;
  color: #999999;
}
/*End of Light theme*/
</style>