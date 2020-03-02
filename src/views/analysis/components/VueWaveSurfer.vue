<template>
  <div class="audio-container">
    <div class="play-panel">
      <span class="playButton" :class="{active: showPause}" @click="playPause" /></div>
    <div id="waveform" class="audio-wave" />
    <div class="audio-time">
      <span>
        {{ currentTime }}/{{ getDuration }}
      </span>
    </div>
  </div>

</template>

<script>
import WaveSurfer from 'wavesurfer.js'
// import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor'
// import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions'

export default {
  name: 'VueWaveSurfer',
  components: { },
  props: {
    src: {
      default: '',
      type: String,
      require: true
    }
  },
  data: () => ({
    wavesurfer: null,
    currentTime: '0:00',
    timeInterval: null,
    volume: 100,
    playing: false,
    showPause: false,
    combinedPlay: true,
    muted: false
  }),
  computed: {
    getDuration() {
      if (this.wavesurfer) {
        return this.timeDisplay(this.wavesurfer.getDuration())
      } else {
        return null
      }
    },
    getPlaybackRate() {
      if (this.wavesurfer) {
        return this.wavesurfer.getPlaybackRate()
      } else {
        return null
      }
    },
    getVolume() {
      if (this.wavesurfer) {
        return this.wavesurfer.getVolume()
      } else {
        return null
      }
    },
    getMute() {
      if (this.wavesurfer) {
        return this.wavesurfer.getMute()
      } else {
        return false
      }
    }
  },
  watch: {
    audio(newValue, oldValue) {
      this.wavesurfer.load(newValue)
    }
  },
  async mounted() {
    if (!this.wavesurfer) this.createWaveSurfer()
  },
  beforeDestroy() {
    this.wavesurfer.destroy()
  },
  methods: {
    createWaveSurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        cursorColor: '#4353FF',
        barHeight: '2',
        barWidth: '2',
        barRadius: 3,
        cursorWidth: 1,
        barGap: '0.5',
        height: '50'
        // fillParent: this.fillParent,
        // loopSelection: this.loopSelection,
        // interact: this.interact,
      })

      this.wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3')
    },

    play() {
      this.timeInterval = setInterval(() => {
        this.currentTime = this.timeDisplay(this.wavesurfer.getCurrentTime())
      }, 1000)
      this.wavesurfer.play()
      this.showPause = true
    },
    playPause() {
      this.playing = this.wavesurfer.isPlaying()
      if (this.playing) {
        this.pause()
        this.showPause = false
      } else {
        this.play()
      }
      this.playing = this.wavesurfer.isPlaying()
    },
    pause() {
      this.wavesurfer.pause()
    },
    timeDisplay(time) {
      // Hours, minutes and seconds
      const hrs = Math.floor(time / 3600)
      const mins = Math.floor((time % 3600) / 60)
      const secs = Math.floor(time % 60)
      // Output like "1:01" or "4:03:59" or "123:03:59"
      let output = ''
      if (hrs > 0) {
        output += '' + hrs + ':' + (mins < 10 ? '0' : '')
      }
      output += '' + mins + ':' + (secs < 10 ? '0' : '')
      output += '' + secs
      return output
    },
    stop() {
      this.wavesurfer.stop()
      this.timeInterval = null
      this.currentTime = this.timeDisplay(0)
    },
    mute() {
      this.muted = this.getMute
      this.wavesurfer.setMute(!this.muted)
      this.muted = this.getMute
    },
    setVolume() {
      const floatValue = this.volume / 100
      this.wavesurfer.setVolume(Number.parseFloat(floatValue.toFixed(2)))
    }
  }
}
</script>

<style lang="scss" scoped>
$background:#f9f9f9;
$foreground:#F56C6C;

$foreground-light:#F56C6C;

$size:13px;
$ratio:1.2;

$transition-time:0.3s;

.playButton {
  display:block;
  width: 0;
	height: 0;
	border-top: $size solid transparent;
	border-bottom: $size solid transparent;
	border-left: ($size*$ratio) solid $foreground;
  padding:10 10 10 10;
  position:relative;
  z-index:1;
  transition: all $transition-time;
  -webkit-transition: all $transition-time;
  -moz-transition: all $transition-time;

  &:before {
    content:'';
    position:absolute;
    top:($size*-1.5);
    left:($size*-2.3);
    bottom:($size*-1.5);
    right:($size*-0.7);
    border-radius:50%;
    border: ($size*0.2) solid $foreground;
    z-index:2;
    transition: all $transition-time;
    -webkit-transition: all $transition-time;
    -moz-transition: all $transition-time;
  }
  &:after {
    content:'';
    opacity:0;
    transition: opacity ($transition-time * 2);
    -webkit-transition: opacity ($transition-time * 2);
    -moz-transition: opacity ($transition-time * 2);
  }

  &:hover, &:focus {
    &:before {
       transform: scale(1.1);
       -webkit-transform: scale(1.1);
       -moz-transform: scale(1.1);
    }
  }

  &.active {
	border-color:transparent;
    &:after {
      content:'';
      opacity:1;
      width:($size);
      height:($size*1.6);
      background:$foreground;
      position:absolute;
      right: ($size*0.3);
      top: ($size*-0.8);
      border-left:($size*0.4) solid $foreground;
      border-right:($size*0.4) solid $foreground;
      box-shadow:inset ($size*0.6) 0 0 0 $background;
    }
  }
}

.audio-container {
    display:flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    //padding: 0 3%;
    border: solid #393e46 1px;
    border-color: rgba(57, 62, 70, 0.05);
    border-radius: 15px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .audio-wave{
    width:100%;
    margin-left:30px;
    color: rgb(85, 33, 33);
  }
  .play-panel{
     margin-left:30px;
     margin-top:12px;
  }
  .audio-time{
    margin-top:18px;
    margin-right:10px;
    white-space: nowrap;
  }

}
</style>
