<template lang="pug">
    container(
        v-bind="$attrs"
        v-on="$listeners"
    ): img.container__image(:src="imgUrl")
</template>

<script>
import Container from './container.vue'

export default {
    components: { Container },
    props: {
        file: {
            type: File,
            required: true
        }
    },
    data: () => ({ imgUrl: '' }),
    mounted() {
        const reader = new FileReader();
        reader.onload = e => {
            this.imgUrl = e.target.result;
        }
        reader.readAsDataURL(this.file);
    }
}
</script>

<style lang="less" scoped>
    .container__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style> 


