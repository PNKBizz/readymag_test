<template lang="pug">
  #app
    .buttons
      input(@change="addImage" type="file")
      button(@click="addVideo") видео
    .content
      image-container(
        v-for="(img, i) in images"
        :key="`image${i}`"
        :item-id="`image${i}`"
        :top-value="img.topValue"
        :file="img.file"
        lock-ratio
        @drop="bottomPositions[$event.id] = $event.bottom"
      )
      video-container(
        v-for="(video, i) in videos"
        :key="`video${i}`"
        :item-id="`video${i}`"
        :top-value="video.topValue"
        :video-id="video.videoId"
        @drop="bottomPositions[$event.id] = $event.bottom"
      )
</template>

<script>
import ImageContainer from './components/image.vue'
import VideoContainer from './components/video.vue'

export default {
  name: 'app',
  components: { ImageContainer, VideoContainer },
  data: () => ({ images: [], bottomPositions: {}, videos: [] }),
  methods: {
    getTop() {
      const bottomPositions = Object.values(this.bottomPositions)
      return (bottomPositions.length && Math.max(...bottomPositions)) || 0
    },
    addImage({ target: { files } }) {
      const topValue = this.getTop()
      this.images.push({
        topValue,
        file: files[0]
      })
    },
    addVideo() {
      const topValue = this.getTop()
      this.videos.push({
        topValue,
        videoId: '-mNs8AswGdE'
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
}
#app {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.content {
  flex-grow: 1;
  position: relative;
}
</style>
