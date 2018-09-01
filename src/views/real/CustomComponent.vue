<template>
    <div
        class="container"
        :style="{
            top: `${component.location.y}px`,
            left: `${component.location.x}px`,
            width: `${component.size.w}px`,
            height: `${component.size.h}px`
    }"
    >
        <div
          v-if="component.type === 1"
          :style="component.style"
        >
            {{component.content}}
        </div>
        <img
            v-if="component.type === 2"
            :style="component.style"
            :src="component.url"
        />
        <a
            v-if="component.type === 3"
            :style="component.style"
            :href="component.appLink"
        >
            {{component.content}}
        </a>
        <video
            v-if="component.type === 5"
            :style="component.style"
            :src="component.source"
            controls="controls"
        />
        <audio
            v-if="component.type === 6"
            :style="component.style"
            :src="component.source"
            controls="controls"
        />
    </div>
</template>

<script>
export default {
  props: ['component'],
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
}
</style>

