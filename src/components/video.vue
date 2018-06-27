<template lang="pug">
    container(
        v-bind="$attrs"
        v-on="$listeners"
    ): .youtube-player(:id="playerId")
</template>

<script>
import Container from './container.vue'
import { functionDeclaration } from 'babel-types';

export default {
    components: { Container },
    props: {
        videoId: {
            type: String,
            required: true
        }
    },
    data() {
        return { playerId: `youtube-player-${this.$bus.counter}` }
    },
    mounted() {
        const setClass = function() {
            document.getElementById(this.playerId).setAttribute("style", "width: 100%; height: 100%;");
        }.bind(this)

        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            new YT.Player(this.playerId, {
                height: '200',
                width: '200',
                videoId: this.videoId,
                events: {
                    'onReady': setClass 
                }
            });
        }
        let player;
        window.onYouTubeIframeAPIReady = function() {
            player = new YT.Player(this.playerId, {
                height: '200',
                width: '200',
                videoId: this.videoId,
                events: {
                    'onReady': setClass 
                }
            });
        }.bind(this)

        this.$bus.counter++
    }
}
</script>
