<template>
    <div
        ref="surface"
        class="draggableSurface"
        @mousedown.stop.prevent="onDragStart"
        />
        
        
    <!--    @mousemove.stop.prevent="onMouseMove"
        @mouseup.stop.prevent="mouseUp"
        @mouseleave.stop.prevent="moveSubscribe = false" /> -->
</template>

<style lang="scss" scoped>
.draggableSurface {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'DraggableComponent',

    data: () => ({
        moveSubscribe: false,
    }),

    methods: {
        onDragStart () {
            this.moveSubscribe = true;
            window.addEventListener('mousemove', this.onMouseMove);
            window.addEventListener('mouseup', this.onMouseUp);
        },

        onMouseMove (event: any) {
            if (!this.moveSubscribe) return;

            const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

            const target = this.$refs.surface! as HTMLElement;
            const boundingBox = target.getBoundingClientRect();

            const percentX = clamp((event.clientX - boundingBox.left) / target.clientWidth, 0, 1);
            const percentY = clamp((event.clientY - boundingBox.top) / target.clientHeight, 0, 1);
            
            this.$emit('newLocation', { x: event.clientX, y: event.clientY, percentX, percentY });
        },

        onMouseUp (event: any) {
            this.onMouseMove(event);
            this.moveSubscribe = false;
        }
    }
});
</script>
