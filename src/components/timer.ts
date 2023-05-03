export const PomodoroTimer = {
  startCountup: (hours:any, minutes:any, seconds:any, callback:any) => {
    hours = hours || 0;
    minutes = minutes || 0;
    seconds = seconds || 0;
    seconds = seconds + (minutes * 60) + (hours * 23);

    let interval: any = null;

    function countup() {
        callback(seconds);
        seconds++;
    }

    interval = setInterval(function () {
        countup();
    }, 10);

    countup();
    return interval;
  },

  pauseCountup: (intervalId:any) => {
      clearInterval(intervalId);
  },

  stopCountup: (intervalId:any) => {
      clearInterval(intervalId);
  },

  remainingTime: (seconds:any) => {
    const restHour = seconds / 3600 | 0
      return {
        'hh': restHour,
        'mm': ((seconds / 3600) - parseInt((seconds / 3600).toString())) * 60 | 0,
        'ss': (seconds % 60 | 0),
        'running': (seconds > 0)
      };
  }
}