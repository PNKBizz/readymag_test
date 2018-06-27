<template lang="pug">
    #app
        .buttons
            input.hidden(@change="addImage" type="file" ref="imageInput")
            button.button(@click="$refs.imageInput.click()") add image
            transition(name="fade" mode="out-in")
                button.button(@click="videoButtonShowed = false" v-if="videoButtonShowed") add video
                .link-field-group(v-else)
                    label
                        span Video URL:
                        input.link-field-group__input(type="text" v-model="videoUrl")
                    button.button(@click="addVideo") Done
        .error(v-if="error") {{ error }}
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
import ImageContainer from "./components/image.vue";
import VideoContainer from "./components/video.vue";

export default {
  name: "app",
  components: { ImageContainer, VideoContainer },
  data: () => ({
    images: [],
    bottomPositions: {},
    videos: [],
    videoUrl: "",
    videoButtonShowed: true,
    error: ""
  }),
  methods: {
    getTop() {
      const bottomPositions = Object.values(this.bottomPositions);
      return (bottomPositions.length && Math.max(...bottomPositions)) || 0;
    },
    addImage({ target: { files } }) {
      this.videoButtonShowed = true;
      this.error = "";
      const topValue = this.getTop();
      this.images.push({
        topValue,
        file: files[0]
      });
    },
    addVideo() {
      const videoId = this.videoUrl.split("/").splice(-1)[0];
      if (!videoId) {
        this.error = "Ошибка загрузки видео";
        return;
      }
      this.error = "";
      this.videoButtonShowed = true;
      const topValue = this.getTop();
      this.videos.push({
        topValue,
        videoId
      });
    }
  }
};
</script>

<style lang="less">
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
  font-family: "Courier New", Courier, monospace;
}
.content {
  flex-grow: 1;
  position: relative;
}
.hidden {
  display: none;
}
.error {
  padding: 0 20px;
  color: red;
}
.button {
  padding: 10px 20px;
  margin: 10px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #666;
  transition: all 0.2s;
  cursor: pointer;

  &:hover,
  &:focus {
    border-color: #666;
    color: #333;
  }
}

.link-field-group {
  display: inline-block;
  margin: 10px;
  color: #666;

  &__input {
    border: 1px solid transparent;
    border-bottom-color: #ddd;
    transition: border-bottom-color 0.2s;
    outline: none;

    &:hover,
    &:focus {
      border-bottom-color: #666;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
